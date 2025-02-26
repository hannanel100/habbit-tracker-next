import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedDb } from "@/utils/supabase/db-client";

// GET /api/habits/[habitId]/entries - Get entries for a specific habit
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

    // Get query parameters for date range
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate")
      ? new Date(searchParams.get("startDate")!)
      : undefined;
    const endDate = searchParams.get("endDate")
      ? new Date(searchParams.get("endDate")!)
      : undefined;

    // Get habit entries
    const entries = await habits.getHabitEntriesByHabitId(
      habitId,
      user.id,
      startDate,
      endDate
    );

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Error fetching habit entries:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/habits/[habitId]/entries - Create or update a habit entry
export async function POST(
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

    // Validate required fields
    if (!body.date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    // Create or update habit entry
    const entry = await habits.upsertHabitEntry({
      habitId,
      userId: user.id,
      date: new Date(body.date).toISOString(),
      completed: body.completed ?? false,
    });

    return NextResponse.json({ entry });
  } catch (error) {
    console.error("Error creating/updating habit entry:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
