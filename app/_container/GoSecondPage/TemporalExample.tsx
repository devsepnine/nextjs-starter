'use client';

import { Temporal } from '@js-temporal/polyfill';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TemporalExample = () => {
  // Current date and time examples
  const nowPlainDateTime = Temporal.Now.plainDateTimeISO();
  const nowZonedDateTime = Temporal.Now.zonedDateTimeISO();
  const plainDateTimeUTC = nowZonedDateTime.toInstant().toZonedDateTimeISO('UTC').toPlainDateTime();
  const duration = plainDateTimeUTC.until(nowPlainDateTime, { largestUnit: 'years' });

  // Date manipulation examples
  const tomorrow = nowPlainDateTime.add({ days: 1 });
  const nextWeek = nowPlainDateTime.add({ weeks: 1 });
  const lastMonth = nowPlainDateTime.subtract({ months: 1 });

  // Duration examples
  const workingHours = Temporal.Duration.from({ hours: 8, minutes: 30 });
  const vacation = Temporal.Duration.from({ days: 7 });

  return (
    <Card className={'w-full h-full'}>
      <CardHeader>
        <CardTitle>Temporal API Examples</CardTitle>
        <CardDescription>@js-temporal/polyfill 사용 예제</CardDescription>
      </CardHeader>
      <CardContent className={'space-y-4'}>
        {/* Current Time Section */}
        <div>
          <h3 className={'text-sm font-semibold mb-2'}>현재 시간</h3>
          <div className={'space-y-1 text-sm'}>
            <div className={'grid grid-cols-[140px_1fr] gap-2'}>
              <span className={'text-muted-foreground'}>TimeZone:</span>
              <span>
                {nowZonedDateTime.offset} {Temporal.Now.timeZoneId()}
              </span>
            </div>
            <div className={'grid grid-cols-[140px_1fr] gap-2'}>
              <span className={'text-muted-foreground'}>PlainDateTime:</span>
              <span className={'font-mono text-xs'}>{nowPlainDateTime.toString()}</span>
            </div>
            <div className={'grid grid-cols-[140px_1fr] gap-2'}>
              <span className={'text-muted-foreground'}>ZonedDateTime:</span>
              <span className={'font-mono text-xs'}>{nowZonedDateTime.toInstant().toString()}</span>
            </div>
            <div className={'grid grid-cols-[140px_1fr] gap-2'}>
              <span className={'text-muted-foreground'}>Epoch (ms):</span>
              <span className={'font-mono text-xs'}>
                {Temporal.Now.instant().epochMilliseconds}
              </span>
            </div>
          </div>
        </div>

        <div className={'border-t'} />

        {/* Date Manipulation Section */}
        <div>
          <h3 className={'text-sm font-semibold mb-2'}>날짜 계산</h3>
          <div className={'space-y-1 text-sm'}>
            <div className={'grid grid-cols-[140px_1fr] gap-2'}>
              <span className={'text-muted-foreground'}>내일:</span>
              <span className={'font-mono text-xs'}>{tomorrow.toString()}</span>
            </div>
            <div className={'grid grid-cols-[140px_1fr] gap-2'}>
              <span className={'text-muted-foreground'}>다음 주:</span>
              <span className={'font-mono text-xs'}>{nextWeek.toString()}</span>
            </div>
            <div className={'grid grid-cols-[140px_1fr] gap-2'}>
              <span className={'text-muted-foreground'}>지난 달:</span>
              <span className={'font-mono text-xs'}>{lastMonth.toString()}</span>
            </div>
          </div>
        </div>

        <div className={'border-t'} />

        {/* Duration Section */}
        <div>
          <h3 className={'text-sm font-semibold mb-2'}>Duration (기간)</h3>
          <div className={'space-y-1 text-sm'}>
            <div className={'grid grid-cols-[140px_1fr] gap-2'}>
              <span className={'text-muted-foreground'}>근무 시간:</span>
              <span className={'font-mono text-xs'}>{workingHours.toString()}</span>
            </div>
            <div className={'grid grid-cols-[140px_1fr] gap-2'}>
              <span className={'text-muted-foreground'}>휴가 기간:</span>
              <span className={'font-mono text-xs'}>{vacation.toString()}</span>
            </div>
            <div className={'grid grid-cols-[140px_1fr] gap-2'}>
              <span className={'text-muted-foreground'}>UTC 차이:</span>
              <span className={'font-mono text-xs'}>
                {duration.years}y {duration.months}m {duration.days}d {duration.hours}h{' '}
                {duration.minutes}m {duration.seconds}s
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemporalExample;
