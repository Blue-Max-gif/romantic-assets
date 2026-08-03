const NAIROBI_TIME_ZONE = 'Africa/Nairobi';
const BIRTHDAY_MONTH = 7;
const BIRTHDAY_DATE = 5;
const NAIROBI_OFFSET_HOURS = 3;

export type BirthdayCountdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthday: boolean;
};

function getNairobiDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: NAIROBI_TIME_ZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(date);

  return Object.fromEntries(
    parts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)]),
  ) as { year: number; month: number; day: number };
}

function getBirthdayStartUtc(year: number) {
  return Date.UTC(year, BIRTHDAY_MONTH, BIRTHDAY_DATE, -NAIROBI_OFFSET_HOURS);
}

export function getBirthdayCountdown(now = new Date()): BirthdayCountdown {
  const nairobi = getNairobiDateParts(now);
  const isBirthday =
    nairobi.month === BIRTHDAY_MONTH + 1 && nairobi.day === BIRTHDAY_DATE;

  if (isBirthday) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true };
  }

  let target = getBirthdayStartUtc(nairobi.year);
  if (target <= now.getTime()) {
    target = getBirthdayStartUtc(nairobi.year + 1);
  }

  const difference = Math.max(0, target - now.getTime());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
    isBirthday: false,
  };
}

export const birthdayTimeZoneLabel = 'Africa/Nairobi';
