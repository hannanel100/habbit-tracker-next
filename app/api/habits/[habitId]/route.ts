import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedDb } from "@/utils/supabase/db-client";

// GET /api/habits/[habitId] - Get a specific habit
export async function GET(
  request: NextRequest,
  { params }: { params: { habitId: string } }
) {
  try {
    const { user, habits } = await getAuthenticatedDb();

    // Check if user is authenticated
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const habitId = parseInt(params.habitId);

    // Validate habitId
    if (isNaN(habitId)) {
      return NextResponse.json({ error: "Invalid habit ID" }, { status: 400 });
    }

    // Get habit
    const habit = await habits.getHabitById(habitId, user.id);

    if (!habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    // Get streak information
    const streak = await habits.getHabitStreak(habitId, user.id);

    return NextResponse.json({ habit, streak });
  } catch (error) {
    console.error("Error fetching habit:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH /api/habits/[habitId] - Update a specific habit
export async function PATCH(
  request: NextRequest,
  { params }: { params: { habitId: string } }
) {
  try {
    const { user, habits } = await getAuthenticatedDb();

    // Check if user is authenticated
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const habitId = parseInt(params.habitId);

    // Validate habitId
    if (isNaN(habitId)) {
      return NextResponse.json({ error: "Invalid habit ID" }, { status: 400 });
    }

    // Parse request body
    const body = await request.json();

    // Update habit
    const updatedHabit = await habits.updateHabit(habitId, user.id, {
      name: body.name,
    });

    if (!updatedHabit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    return NextResponse.json({ habit: updatedHabit });
  } catch (error) {
    console.error("Error updating habit:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/habits/[habitId] - Archive a specific habit
export async function DELETE(
  request: NextRequest,
  { params }: { params: { habitId: string } }
) {
  try {
    const { user, habits } = await getAuthenticatedDb();

    // Check if user is authenticated
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const habitId = parseInt(params.habitId);

    // Validate habitId
    if (isNaN(habitId)) {
      return NextResponse.json({ error: "Invalid habit ID" }, { status: 400 });
    }

    // Archive habit (soft delete)
    await habits.archiveHabit(habitId, user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error archiving habit:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
