'use client';

import { MotionValue } from 'motion';
import { motion, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

import { cn } from '@/lib/utils.ts';

export interface AnimatedNumberProps {
  value: number;
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

  let digits = String(value).split('');
  const minusSign = digits[0] === '-' ? '-' : null;
  if (minusSign) digits = digits.slice(1);
  return (
    <div
      style={{ fontSize }}
      className={cn('overflow-hidden flex space-x-1 leading-none', className)}
    >
      {minusSign && <span>-</span>}
      {digits.map((digit, index) => (
        <Digit key={`${index}`} value={Number(digit)} height={height} />
      ))}
    </div>
  );
};

interface DigitProps {
  value: number;
  height: number;
}

const Digit = ({ value, height }: DigitProps) => {
  let valueRoundedToPlace = Math.floor(value);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
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
