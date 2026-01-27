'use client';

import { useRouter } from 'next/navigation';

import { useCallback, useState } from 'react';

import { Trans, useLingui } from '@lingui/react/macro';
import { Icon } from '@iconify/react';
import { Temporal } from '@js-temporal/polyfill';
import { div as MotionDiv } from 'motion/react-client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import styles from './Temporal.module.scss';

const TemporalExample = () => {
  const router = useRouter();
  const { t, i18n } = useLingui();

  // Convert lingui locale to browser locale format
  const getLocaleString = () => {
    const localeMap: Record<string, string> = {
      ko: 'ko-KR',
      en: 'en-US',
      ja: 'ja-JP',
      'zh-cn': 'zh-CN',
      'zh-tw': 'zh-TW',
    };
    return localeMap[i18n.locale] || 'en-US';
  };

  const TIMEZONES = [
    { id: 'Asia/Seoul', name: t`Seoul`, emoji: '🇰🇷' },
    { id: 'Asia/Tokyo', name: t`Tokyo`, emoji: '🇯🇵' },
    { id: 'America/New_York', name: t`New York`, emoji: '🇺🇸' },
    { id: 'Europe/London', name: t`London`, emoji: '🇬🇧' },
    { id: 'Asia/Shanghai', name: t`Shanghai`, emoji: '🇨🇳' },
    { id: 'Europe/Paris', name: t`Paris`, emoji: '🇫🇷' },
    { id: 'Asia/Dubai', name: t`Dubai`, emoji: '🇦🇪' },
    { id: 'America/Los_Angeles', name: t`LA`, emoji: '🇺🇸' },
    { id: 'Australia/Sydney', name: t`Sydney`, emoji: '🇦🇺' },
    { id: 'UTC', name: 'UTC', emoji: '🌍' },
  ];

  const goHome = useCallback(() => {
    router.push('/');
  }, [router]);

  // Selected timezone for comparison
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Seoul');

  // Project start date
  const [projectStartDate, setProjectStartDate] = useState('2025-01-01');

  // Meeting times
  const [meetingStartTime, setMeetingStartTime] = useState('14:00');
  const [meetingEndTime, setMeetingEndTime] = useState('15:30');

  // Current time
  const now = Temporal.Now.zonedDateTimeISO();
  const nowUTC = Temporal.Now.instant().toZonedDateTimeISO('UTC');

  // Timezone conversions
  const seoulTime = Temporal.Now.instant().toZonedDateTimeISO('Asia/Seoul');
  const newYorkTime = Temporal.Now.instant().toZonedDateTimeISO('America/New_York');
  const londonTime = Temporal.Now.instant().toZonedDateTimeISO('Europe/London');
  const tokyoTime = Temporal.Now.instant().toZonedDateTimeISO('Asia/Tokyo');
  const selectedTime = Temporal.Now.instant().toZonedDateTimeISO(selectedTimezone);

  // Calculations
  const today = Temporal.Now.plainDateISO();
  const nextYear = today.year + 1;
  const newYear = Temporal.PlainDate.from(`${nextYear}-01-01`);
  const daysUntilNewYear = today.until(newYear, { largestUnit: 'day' }).days;

  const projectStart = Temporal.PlainDate.from(projectStartDate);
  const daysSinceStart = projectStart.until(today, { largestUnit: 'day' }).days;

  const meetingStart = Temporal.PlainTime.from(meetingStartTime);
  const meetingEnd = Temporal.PlainTime.from(meetingEndTime);
  const meetingDuration = meetingStart.until(meetingEnd);

  const calculateWorkingDays = (start: Temporal.PlainDate, end: Temporal.PlainDate): number => {
    let current = start;
    let workingDays = 0;
    while (Temporal.PlainDate.compare(current, end) <= 0) {
      const dayOfWeek = current.dayOfWeek;
      if (dayOfWeek !== 6 && dayOfWeek !== 7) {
        workingDays++;
      }
      current = current.add({ days: 1 });
    }
    return workingDays;
  };

  const workingDaysThisMonth = calculateWorkingDays(
    Temporal.PlainDate.from(`${today.year}-${String(today.month).padStart(2, '0')}-01`),
    today
  );

  const formattedDate = now.toPlainDate().toLocaleString(getLocaleString(), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const worldClocks = [
    { name: 'UTC', time: nowUTC, emoji: '🌍' },
    { name: t`Seoul`, time: seoulTime, emoji: '🇰🇷' },
    { name: t`Tokyo`, time: tokyoTime, emoji: '🇯🇵' },
    { name: t`New York`, time: newYorkTime, emoji: '🇺🇸' },
  ];

  const weekdays = [
    t`Mon`,
    t`Tue`,
    t`Wed`,
    t`Thu`,
    t`Fri`,
    t`Sat`,
    t`Sun`,
  ];

  return (
    <MotionDiv
      className={styles['root']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Temporal API</h1>
            <p className="text-muted-foreground">
              <Trans id="temporal.description">
                Modern date/time handling with @js-temporal/polyfill
              </Trans>
            </p>
          </div>
          <Button onClick={goHome} variant="outline">
            <Icon icon="mdi:home" className="mr-2" />
            <Trans id="temporal.goHome">Go Home</Trans>
          </Button>
        </div>
      </header>

      {/* Hero Section - Current Time */}
      <section className="mb-12">
        <Card className="border-2">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Icon icon="mdi:map-marker" className="text-primary" />
                <span className="text-sm font-medium">{Temporal.Now.timeZoneId()}</span>
              </div>

              <div>
                <div className="text-8xl font-bold font-mono tracking-tight mb-4">
                  {now.toPlainTime().toString().slice(0, 5)}
                </div>
                <div className="text-2xl text-muted-foreground mb-2">{formattedDate}</div>
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <span className="text-sm">UTC {now.offset}</span>
                  <span>•</span>
                  <span className="text-sm font-mono">{now.toPlainDate().toString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* World Clocks Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Icon icon="mdi:earth" width={28} height={28} />
          <Trans id="temporal.worldClocks">World Clocks</Trans>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {worldClocks.map((city) => (
            <Card key={city.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{city.emoji}</span>
                    <span className="font-semibold">{city.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {city.time.offset}
                  </Badge>
                </div>
                <div className="text-4xl font-bold font-mono mb-2">
                  {city.time.toPlainTime().toString().slice(0, 5)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {city.time.toPlainDate().toString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Icon icon="mdi:chart-box" width={28} height={28} />
          <Trans id="temporal.quickStats">Quick Stats</Trans>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="mdi:party-popper" width={24} height={24} className="text-primary" />
              </div>
              <div className="text-5xl font-bold mb-2">D-{daysUntilNewYear}</div>
              <p className="text-sm text-muted-foreground">
                <Trans id="temporal.daysUntilNewYear">
                  Days until {nextYear}
                </Trans>
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="mdi:rocket-launch" width={24} height={24} className="text-primary" />
              </div>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold mb-2">
                  {daysSinceStart >= 0 ? `+${daysSinceStart}` : `D${daysSinceStart}`}
                </div>
                <p className="text-sm text-muted-foreground">
                  {daysSinceStart >= 0
                    ? t`Since ${projectStart.toString()}`
                    : t`Until ${projectStart.toString()}`}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">
                  <Trans id="temporal.setDate">Set Date</Trans>
                </label>
                <Input
                  type="date"
                  value={projectStartDate}
                  onChange={(e) => setProjectStartDate(e.target.value)}
                  className="text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="mdi:briefcase" width={24} height={24} className="text-primary" />
              </div>
              <div className="text-5xl font-bold mb-2">{workingDaysThisMonth}</div>
              <p className="text-sm text-muted-foreground">
                <Trans id="temporal.workingDaysThisMonth">Working Days This Month</Trans>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Date Calculations Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Icon icon="mdi:calculator" width={28} height={28} />
          <Trans id="temporal.dateCalculations">Date Calculations</Trans>
        </h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="mdi:timelapse" width={20} height={20} />
              <Trans id="temporal.meetingDuration">Meeting Duration</Trans>
            </CardTitle>
            <CardDescription>
              <Trans id="temporal.meetingDescription">Duration between start and end time</Trans>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  <Trans id="temporal.startTime">Start Time</Trans>
                </label>
                <Input
                  type="time"
                  value={meetingStartTime}
                  onChange={(e) => setMeetingStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  <Trans id="temporal.endTime">End Time</Trans>
                </label>
                <Input
                  type="time"
                  value={meetingEndTime}
                  onChange={(e) => setMeetingEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  <Trans id="temporal.start">Start</Trans>
                </p>
                <div className="flex items-center gap-2 text-2xl font-mono font-bold">
                  <Icon icon="mdi:clock-start" className="text-green-500" />
                  {meetingStart.toString().slice(0, 5)}
                </div>
              </div>

              <Icon
                icon="mdi:arrow-right"
                width={32}
                height={32}
                className="text-muted-foreground hidden md:block"
              />
              <Icon
                icon="mdi:arrow-down"
                width={32}
                height={32}
                className="text-muted-foreground md:hidden"
              />

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  <Trans id="temporal.end">End</Trans>
                </p>
                <div className="flex items-center gap-2 text-2xl font-mono font-bold">
                  <Icon icon="mdi:clock-end" className="text-red-500" />
                  {meetingEnd.toString().slice(0, 5)}
                </div>
              </div>

              <div className="hidden md:block w-px h-16 bg-border" />
              <div className="md:hidden w-16 h-px bg-border" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  <Trans id="temporal.duration">Duration</Trans>
                </p>
                <div className="text-3xl font-bold text-primary">
                  {t`${meetingDuration.hours}h ${meetingDuration.minutes}m`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Date Formats Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Icon icon="mdi:format-text" width={28} height={28} />
          <Trans id="temporal.dateFormats">Date Formats</Trans>
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  <Trans id="temporal.longFormat">Long Format</Trans>
                </p>
                <p className="text-xl font-semibold">{formattedDate}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">ISO 8601</p>
                <p className="text-lg font-mono break-all">{now.toString()}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  <Trans id="temporal.dateOnly">Date Only</Trans>
                </p>
                <p className="text-xl font-mono font-bold">{now.toPlainDate().toString()}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  <Trans id="temporal.timeOnly">Time Only</Trans>
                </p>
                <p className="text-xl font-mono font-bold">
                  {now.toPlainTime().toString().slice(0, 8)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  <Trans id="temporal.yearMonth">Year-Month</Trans>
                </p>
                <p className="text-xl font-mono font-bold">{now.toPlainYearMonth().toString()}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  <Trans id="temporal.monthDay">Month-Day</Trans>
                </p>
                <p className="text-xl font-mono font-bold">{now.toPlainMonthDay().toString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Date Details Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Icon icon="mdi:calendar-today" width={28} height={28} />
          <Trans id="temporal.dateDetails">Date Details</Trans>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <Trans id="temporal.currentDate">Current Date</Trans>
              </CardTitle>
              <CardDescription>
                <Trans id="temporal.todayDetails">Today's Details</Trans>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    <Trans id="temporal.year">Year</Trans>
                  </p>
                  <p className="text-2xl font-bold">{today.year}</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    <Trans id="temporal.month">Month</Trans>
                  </p>
                  <p className="text-2xl font-bold">{today.month}</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    <Trans id="temporal.day">Day</Trans>
                  </p>
                  <p className="text-2xl font-bold">{today.day}</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    <Trans id="temporal.weekday">Weekday</Trans>
                  </p>
                  <p className="text-2xl font-bold">
                    {weekdays[today.dayOfWeek - 1]}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    <Trans id="temporal.dayOfYear">Day of Year</Trans>
                  </p>
                  <p className="text-2xl font-bold">{today.dayOfYear}</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    <Trans id="temporal.weekOfYear">Week</Trans>
                  </p>
                  <p className="text-2xl font-bold">{today.weekOfYear}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Trans id="temporal.timezoneDifference">Timezone Difference</Trans>
              </CardTitle>
              <CardDescription>
                <Trans id="temporal.timezoneDescription">Time difference from selected timezone</Trans>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  <Trans id="temporal.selectTimezone">Select Timezone</Trans>
                </label>
                <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                  <SelectTrigger>
                    <SelectValue placeholder={t`Select timezone`} />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz.id} value={tz.id}>
                        <span className="flex items-center gap-2">
                          <span>{tz.emoji}</span>
                          <span>{tz.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {TIMEZONES.find((tz) => tz.id === selectedTimezone)?.emoji}
                  </span>
                  <span className="font-semibold">
                    {TIMEZONES.find((tz) => tz.id === selectedTimezone)?.name}
                  </span>
                  <Icon icon="mdi:arrow-right" className="mx-2 text-muted-foreground" />
                  <span className="text-2xl">🌍</span>
                  <span className="font-semibold">UTC</span>
                </div>
                <span className="text-xl font-bold font-mono">
                  {selectedTime.offsetNanoseconds / 3600000000000 > 0 ? '+' : ''}
                  {selectedTime.offsetNanoseconds / 3600000000000}h
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {TIMEZONES.find((tz) => tz.id === selectedTimezone)?.emoji}
                  </span>
                  <span className="font-semibold">
                    {TIMEZONES.find((tz) => tz.id === selectedTimezone)?.name}
                  </span>
                  <Icon icon="mdi:arrow-right" className="mx-2 text-muted-foreground" />
                  <span className="text-2xl">🇺🇸</span>
                  <span className="font-semibold">
                    {t`New York`}
                  </span>
                </div>
                <span className="text-xl font-bold font-mono">
                  {(selectedTime.offsetNanoseconds - newYorkTime.offsetNanoseconds) / 3600000000000 >
                  0
                    ? '+'
                    : ''}
                  {(selectedTime.offsetNanoseconds - newYorkTime.offsetNanoseconds) / 3600000000000}h
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MotionDiv>
  );
};

export default TemporalExample;
