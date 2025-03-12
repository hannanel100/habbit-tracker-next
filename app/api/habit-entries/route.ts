import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { habitsRepository } from "@/db/repositories/habits";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Parse request body
    const { habitId, date, completed } = await request.json();
    
    if (!habitId || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Verify the habit belongs to the user
    const habit = await habitsRepository.getHabitById(habitId, user.id);
    if (!habit) {
      return NextResponse.json(
        { error: "Habit not found" },
        { status: 404 }
      );
    }
    
    // Create or update the habit entry
    const entry = await habitsRepository.upsertHabitEntry({
      habitId,
      userId: user.id,
      date: new Date(date).toISOString(),
      completed: completed || false,
    });
    
    return NextResponse.json({ entry });
  } catch (error) {
    console.error("Error updating habit entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
