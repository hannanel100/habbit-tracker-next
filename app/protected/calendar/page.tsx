import { Year } from "@/components/calendar/Year";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function CalendarPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to sign-in page if user is not authenticated
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="w-full grid place-items-center">
        <h1 className="text-3xl font-bold mb-6">Your Habbit Tracker</h1>
      </div>
      <Year />
    </div>
  );
}
