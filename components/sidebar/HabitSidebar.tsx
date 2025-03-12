"use client";

import { Habit } from "@/db/repositories/habits";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HabitSidebarProps {
  habits: Habit[];
  selectedHabitId?: number;
}

export const HabitSidebar = ({
  habits,
  selectedHabitId,
}: HabitSidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-amber-950/20 p-4 flex flex-col gap-4 border-r border-amber-800/30">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-amber-200">Your Habits</h2>
        <Button
          size="sm"
          variant="ghost"
          className="hover:bg-amber-800/30"
          asChild
        >
          <Link href="/protected/habits/new">
            <Plus className="h-4 w-4 mr-1" />
            <span>New</span>
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href="/protected/calendar"
          className={`flex items-center p-2 rounded-md transition-colors ${
            !selectedHabitId
              ? "bg-amber-800/40 text-amber-100"
              : "hover:bg-amber-800/20 text-amber-200"
          }`}
        >
          <Calendar className="h-4 w-4 mr-2" />
          <span>All Habits</span>
        </Link>

        {habits.map((habit) => (
          <Link
            key={habit.id}
            href={`/protected/calendar/${habit.id}`}
            className={`p-2 rounded-md transition-colors ${
              selectedHabitId === habit.id
                ? "bg-amber-800/40 text-amber-100"
                : "hover:bg-amber-800/20 text-amber-200"
            }`}
          >
            {habit.name}
          </Link>
        ))}
      </div>

      {habits.length === 0 && (
        <div className="text-amber-400/70 text-sm mt-4 text-center">
          No habits yet. Create your first habit to start tracking!
        </div>
      )}
    </div>
  );
};
