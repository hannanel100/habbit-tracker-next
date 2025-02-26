import { Day } from "./Day";

interface MonthProps {
  name: string;
  days: number[];
}

export const Month = ({ name, days }: MonthProps) => {
  return (
    <div className="flex flex-col items-center w-fit">
      <h3 className="font-medium mb-2">{name.slice(0, 3).toLowerCase()}</h3>
      <div className="flex flex-col gap-1 items-center">
        {days.map((day) => (
          <Day key={day} date={day} />
        ))}
      </div>
    </div>
  );
};
