// API client for client-side API calls

// Types
export interface Habit {
  id: number;
  name: string;
  description: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}

export interface HabitEntry {
  id: number;
  habitId: number;
  userId: string;
  date: string;
  completed: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HabitWithStreak extends Habit {
  streak: number;
}

// API functions
export const api = {
  // Habits
  async getHabits(): Promise<Habit[]> {
    const response = await fetch('/api/habits');
    if (!response.ok) {
      throw new Error('Failed to fetch habits');
    }
    const data = await response.json();
    return data.habits;
  },

  async getHabit(habitId: number): Promise<HabitWithStreak> {
    const response = await fetch(`/api/habits/${habitId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch habit');
    }
    const data = await response.json();
    return {
      ...data.habit,
      streak: data.streak
    };
  },

  async createHabit(habit: { name: string; description?: string }): Promise<Habit> {
    const response = await fetch('/api/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(habit),
    });
    if (!response.ok) {
      throw new Error('Failed to create habit');
    }
    const data = await response.json();
    return data.habit;
  },

  async updateHabit(habitId: number, habit: { name?: string; description?: string }): Promise<Habit> {
    const response = await fetch(`/api/habits/${habitId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(habit),
    });
    if (!response.ok) {
      throw new Error('Failed to update habit');
    }
    const data = await response.json();
    return data.habit;
  },

  async archiveHabit(habitId: number): Promise<void> {
    const response = await fetch(`/api/habits/${habitId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to archive habit');
    }
  },

  // Habit Entries
  async getHabitEntries(habitId: number, startDate?: Date, endDate?: Date): Promise<HabitEntry[]> {
    let url = `/api/habits/${habitId}/entries`;
    const params = new URLSearchParams();
    
    if (startDate) {
      params.append('startDate', startDate.toISOString());
    }
    
    if (endDate) {
      params.append('endDate', endDate.toISOString());
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch habit entries');
    }
    const data = await response.json();
    return data.entries;
  },

  async updateHabitEntry(habitId: number, entry: { 
    date: Date; 
    completed: boolean; 
    notes?: string 
  }): Promise<HabitEntry> {
    const response = await fetch(`/api/habits/${habitId}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...entry,
        date: entry.date.toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to update habit entry');
    }
    const data = await response.json();
    return data.entry;
  },
};
