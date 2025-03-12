import { Day } from "./Day";
import { HabitEntry } from "@/db/repositories/habits";

interface MonthProps {
  name: string;
  days: number[];
  monthIndex: number;
  habitId?: number;
  entriesMap: Record<string, HabitEntry>;
}

export const Month = ({ name, days, monthIndex, habitId, entriesMap }: MonthProps) => {
  return (
    <div className="flex flex-col items-center w-fit">
      <h3 className="font-medium mb-2">{name.slice(0, 3).toLowerCase()}</h3>
      <div className="flex flex-col gap-1 items-center">
        {days.map((day) => {
          const entryKey = `${monthIndex}-${day}`;
          const entry = entriesMap[entryKey];
          
          return (
            <Day 
              key={day} 
              date={day} 
              monthIndex={monthIndex}
              habitId={habitId}
              completed={entry?.completed || false}
              entryId={entry?.id}
            />
          );
        })}
      </div>
    </div>
  );
};
