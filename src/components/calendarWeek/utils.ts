import { type WeekDayType } from "./types";

export const DAYS: WeekDayType[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

// ✅ Get the first day of the current week (Monday)
export function getFirstDayOfWeek(date: Date = new Date()): Date {
  // 👇️ clone date object, so we don't mutate it
  const dateCopy = new Date(date.toISOString());

  const day = dateCopy.getDay(); // 👉️ get day of week
  // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
  const diff = dateCopy.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(dateCopy.setDate(diff));
}

export function getWeekDate(mondayDate: Date, dayString: WeekDayType) {
  const key = DAYS.indexOf(dayString);
  const tDate = new Date(mondayDate);
  tDate.setDate(tDate.getDate() + key);

  return tDate;
}

export function getLastDayOfWeek(mondayDate: Date): Date {
  return getWeekDate(mondayDate, "Sun");
}

export function getCalendarDayFormat(date: Date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
