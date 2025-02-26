import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedDb } from '@/utils/supabase/db-client';

// GET /api/habits - Get all habits for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const { user, habits } = await getAuthenticatedDb();
    
    // Check if user is authenticated
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get all habits for the user
    const userHabits = await habits.getHabitsByUserId(user.id);
    
    return NextResponse.json({ habits: userHabits });
  } catch (error) {
    console.error('Error fetching habits:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/habits - Create a new habit for the authenticated user
export async function POST(request: NextRequest) {
  try {
    const { user, habits } = await getAuthenticatedDb();
    
    // Check if user is authenticated
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: 'Habit name is required' }, { status: 400 });
    }
    
    // Create new habit
    const newHabit = await habits.createHabit({
      name: body.name,
      description: body.description || null,
      userId: user.id,
      isArchived: false
    });
    
    return NextResponse.json({ habit: newHabit }, { status: 201 });
  } catch (error) {
    console.error('Error creating habit:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
