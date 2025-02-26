import { and, eq, sql, asc, desc } from "drizzle-orm";
import { db } from "../index";
import { habits, habitEntries } from "../schema/habits";

export type Habit = typeof habits.$inferSelect;
export type NewHabit = typeof habits.$inferInsert;

export type HabitEntry = typeof habitEntries.$inferSelect;
export type NewHabitEntry = typeof habitEntries.$inferInsert;

export const habitsRepository = {
  // Get all habits for a user
  async getHabitsByUserId(userId: string): Promise<Habit[]> {
    return db
      .select()
      .from(habits)
      .where(and(eq(habits.userId, userId), eq(habits.isArchived, false)))
      .orderBy(desc(habits.createdAt));
  },

  // Get a single habit by ID
  async getHabitById(id: number, userId: string): Promise<Habit | undefined> {
    const results = await db
      .select()
      .from(habits)
      .where(and(eq(habits.id, id), eq(habits.userId, userId)))
      .limit(1);

    return results[0];
  },

  // Create a new habit
  async createHabit(habit: NewHabit): Promise<Habit> {
    const result = await db.insert(habits).values(habit).returning();

    return result[0];
  },

  // Update a habit
  async updateHabit(
    id: number,
    userId: string,
    habit: Partial<NewHabit>
  ): Promise<Habit | undefined> {
    const result = await db
      .update(habits)
      .set({
        ...habit,
        updatedAt: new Date(),
      })
      .where(and(eq(habits.id, id), eq(habits.userId, userId)))
      .returning();

    return result[0];
  },

  // Archive a habit (soft delete)
  async archiveHabit(id: number, userId: string): Promise<boolean> {
    const result = await db
      .update(habits)
      .set({
        isArchived: true,
        updatedAt: new Date(),
      })
      .where(and(eq(habits.id, id), eq(habits.userId, userId)));

    return true;
  },

  // Get habit entries for a specific habit
  async getHabitEntriesByHabitId(
    habitId: number,
    userId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<HabitEntry[]> {
    // Build conditions array
    const conditions = [
      eq(habitEntries.habitId, habitId),
      eq(habitEntries.userId, userId),
    ];

    // Add date range conditions if provided
    if (startDate) {
      conditions.push(sql`${habitEntries.date} >= ${startDate}`);
    }

    if (endDate) {
      conditions.push(sql`${habitEntries.date} <= ${endDate}`);
    }

    // Execute query with all conditions
    return db
      .select()
      .from(habitEntries)
      .where(and(...conditions))
      .orderBy(asc(habitEntries.date));
  },

  // Create or update a habit entry
  async upsertHabitEntry(entry: NewHabitEntry): Promise<HabitEntry> {
    // Validate required fields
    if (!entry.date) {
      throw new Error("Date is required");
    }
    if (!entry.habitId) {
      throw new Error("Habit ID is required");
    }
    if (!entry.userId) {
      throw new Error("User ID is required");
    }

    // Check if entry already exists for this date and habit
    const existingEntries = await db
      .select()
      .from(habitEntries)
      .where(
        and(
          eq(habitEntries.habitId, entry.habitId),
          eq(habitEntries.userId, entry.userId),
          eq(habitEntries.date, entry.date)
        )
      )
      .limit(1);

    if (existingEntries.length > 0) {
      // Update existing entry
      const result = await db
        .update(habitEntries)
        .set({
          ...entry,
          updatedAt: new Date(),
        })
        .where(eq(habitEntries.id, existingEntries[0].id))
        .returning();

      return result[0];
    } else {
      // Create new entry
      const result = await db.insert(habitEntries).values(entry).returning();

      return result[0];
    }
  },

  // Get habit streak (consecutive completed days)
  async getHabitStreak(habitId: number, userId: string): Promise<number> {
    // This is a simplified version - in a real app, you might want to optimize this
    const entries = await db
      .select()
      .from(habitEntries)
      .where(
        and(
          eq(habitEntries.habitId, habitId),
          eq(habitEntries.userId, userId),
          eq(habitEntries.completed, true)
        )
      )
      .orderBy(desc(habitEntries.date));

    if (entries.length === 0) return 0;

    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentDate = new Date(entries[0].date);
    currentDate.setHours(0, 0, 0, 0);

    // If the most recent entry is not today or yesterday, streak is broken
    const dayDiff = Math.floor(
      (today.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (dayDiff > 1) return 0;

    // Count consecutive days
    for (let i = 1; i < entries.length; i++) {
      const prevDate = new Date(entries[i - 1].date);
      prevDate.setHours(0, 0, 0, 0);

      const currDate = new Date(entries[i].date);
      currDate.setHours(0, 0, 0, 0);

      const diffTime = prevDate.getTime() - currDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  },
};
