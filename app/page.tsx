import LandingPage from "@/components/landing-page";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  // Check if user is logged in
  if (hasEnvVars) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Redirect to calendar if user is logged in
    if (user) {
      return redirect("/protected/calendar");
    }
  }

  return <LandingPage />;
}
