import { Month } from "./Month";

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
}
export const Year = () => {
  const currentYear = new Date().getFullYear();

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
            />
          );
        })}
      </div>
    </div>
  );
};
