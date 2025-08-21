'use client';

import { Temporal } from 'temporal-polyfill';

import { Card } from '@/components/ui/card';

const TemporalTest = () => {
  const nowPlainDateTime = Temporal.Now.plainDateTimeISO();
  const nowZonedDateTime = Temporal.Now.zonedDateTimeISO();
  const nowPlainWithOffset = nowZonedDateTime
    .toInstant()
    .toZonedDateTimeISO(nowZonedDateTime.timeZoneId)
    .toPlainDateTime();
  const plainDateTimeUTC = nowZonedDateTime.toInstant().toZonedDateTimeISO('UTC').toPlainDateTime();
  const duration = plainDateTimeUTC.until(nowPlainDateTime, { largestUnit: 'years' });

  return (
    <Card className={'p-4'}>
      <div className={'grid grid-cols-2 gap-4'}>
        <div className={'text-left'}>TimeZone:</div>
        <div className={'text-right'}>
          {Temporal.Now.zonedDateTimeISO().offset} {Temporal.Now.timeZoneId()}
        </div>
      </div>
      <div className={'grid grid-cols-2 gap-4'}>
        <div className={'text-left'}>Now PlainDateTime :</div>
        <div className={'text-right'}>{nowPlainDateTime.toString()}</div>
      </div>
      <div className={'grid grid-cols-2 gap-4'}>
        <div className={'text-left'}>Now ZonedDateTime :</div>
        <div className={'text-right'}>{nowZonedDateTime.toInstant().toString()}</div>
      </div>
      <div className={'grid grid-cols-2 gap-4'}>
        <div className={'text-left'}>Now Duration to Plain :</div>
        <div className={'text-right'}>
          {duration.years}-{duration.months}-{duration.days} {duration.hours}:{duration.minutes}:
          {duration.seconds}
        </div>
      </div>
      {Temporal.Now.instant().epochMilliseconds}
    </Card>
  );
};

export default TemporalTest;
