import { Year } from "@/components/calendar/Year";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { HabitSidebar } from "@/components/sidebar/HabitSidebar";
import { habitsRepository } from "@/db/repositories/habits";

interface HabitCalendarPageProps {
  params: {
    habitId: string;
  };
}

export default async function HabitCalendarPage({
  params,
}: HabitCalendarPageProps) {
  const habitId = parseInt(params.habitId);

  if (isNaN(habitId)) {
    return redirect("/protected/calendar");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to sign-in page if user is not authenticated
  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch user's habits
  const habits = await habitsRepository.getHabitsByUserId(user.id);

  // Fetch the specific habit
  const habit = await habitsRepository.getHabitById(habitId, user.id);

  if (!habit) {
    return redirect("/protected/calendar");
  }

  // Fetch habit entries for this habit
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1); // Jan 1st of current year
  const endDate = new Date(currentYear, 11, 31); // Dec 31st of current year

  const habitEntries = await habitsRepository.getHabitEntriesByHabitId(
    habitId,
    user.id,
    startDate,
    endDate
  );

  return (
    <div className="flex-1 w-full flex flex-row">
      <HabitSidebar habits={habits} selectedHabitId={habitId} />

      <div className="flex-1 flex flex-col gap-8 p-6">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-2">{habit.name}</h1>
          <div className="flex items-center gap-4 text-sm text-amber-200/60">
            <div>Created: {new Date(habit.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        <Year habitId={habitId} habitEntries={habitEntries} />
      </div>
    </div>
  );
}
