import { Year } from "@/components/calendar/Year";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { HabitSidebar } from "@/components/sidebar/HabitSidebar";
import { habitsRepository } from "@/db/repositories/habits";

export default async function CalendarPage() {
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

  return (
    <div className="flex-1 w-full flex flex-row">
      <HabitSidebar habits={habits} />

      <div className="flex-1 flex flex-col gap-8 p-6">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-6">Your Habit Tracker</h1>
          <p className="text-amber-200/70">
            Select a habit from the sidebar to view its tracking calendar, or
            view all habits at once.
          </p>
        </div>
        <Year />
      </div>
    </div>
  );
}
