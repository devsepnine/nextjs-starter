'use client';

import { MotionValue } from 'motion';
import { motion, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils.ts';

export interface AnimatedNumberProps {
  value: string;
  fontSize?: number;
  padding?: number;
  className?: string;
}

export const AnimatedNumber = ({
  value,
  className,
  fontSize = 24,
  padding = 2,
}: AnimatedNumberProps) => {
  const height = fontSize + padding;

  if (!value) {
    return <Digit value={0} height={height} />;
  }

  const regex = /^-?(\d+\.?\d*|\.\d+)$/;
  if (!regex.test(value)) {
    console.warn('Invalid value for AnimatedNumber:', value);
    return <Digit value={0} height={height} />;
  }

  let digits = String(value).split('');
  const minusSign = digits[0] === '-' ? '-' : null;
  if (minusSign) digits = digits.slice(1);
  if (digits.length === 0 || !value) {
    return <Digit value={0} height={height} />;
  }
  return (
    <div
      style={{ fontSize }}
      className={cn('overflow-hidden flex space-x-0.5 leading-none', className)}
    >
      {minusSign && <span>-</span>}
      {digits.map((digit, index) => {
        return digit === '.' ? (
          <span key={`${index}-dot`} style={{ height }}>
            .
          </span>
        ) : (
          <Digit key={`${index}-n`} value={Number(digit)} height={height} />
        );
      })}
    </div>
  );
};

interface DigitProps {
  value: number;
  height: number;
}

const Digit = ({ value, height }: DigitProps) => {
  const previousValue = useRef<number | null>(null);
  let animatedValue = useSpring(0);

  useEffect(() => {
    if (previousValue.current !== value) {
      animatedValue.set(value);
      previousValue.current = value;
    }
  }, [value, animatedValue]);

  return (
    <div style={{ height }} className="overflow-hidden relative w-[1ch] tabular-nums">
      {[...Array(10).keys()].map((i) => (
        <MotionNumber key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
};

interface NumberProps {
  mv: MotionValue;
  number: number;
  height: number;
}

const MotionNumber = ({ mv, number, height }: NumberProps) => {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {number}
    </motion.span>
  );
};
