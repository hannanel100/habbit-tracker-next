"use client";

import { Month } from "./Month";
import { useEffect, useState } from "react";
import { HabitEntry } from "@/db/repositories/habits";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const calculateDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

interface YearProps {
  habitId?: number;
  habitEntries?: HabitEntry[];
}

export const Year = ({ habitId, habitEntries = [] }: YearProps) => {
  const currentYear = new Date().getFullYear();
  const [entriesMap, setEntriesMap] = useState<Record<string, HabitEntry>>({});

  // useEffect(() => {
  //   console.log(habitEntries);
  //   // Create a map of entries by date for quick lookup
  //   const map: Record<string, HabitEntry> = {};
  //   habitEntries.forEach((entry) => {
  //     const date = new Date(entry.date);
  //     const key = `${date.getMonth()}-${date.getDate()}`;
  //     map[key] = entry;
  //   });
  //   setEntriesMap(map);
  // }, [habitEntries]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {months.map((month, index) => {
          const daysInMonth = calculateDaysInMonth(currentYear, index);
          return (
            <Month
              key={month}
              name={month}
              days={Array.from({ length: daysInMonth }, (_, i) => i + 1)}
              monthIndex={index}
              habitId={habitId}
              entriesMap={entriesMap}
            />
          );
        })}
      </div>
    </div>
  );
};
