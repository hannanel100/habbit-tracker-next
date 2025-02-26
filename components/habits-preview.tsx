import { CheckCircle } from "lucide-react";

export default function HabitsPreview() {
  // Mock data for habits
  const habits = [
    { 
      name: "Morning Meditation", 
      streak: 12,
      lastWeek: [true, true, true, false, true, true, true]
    },
    { 
      name: "Read 30 Minutes", 
      streak: 8,
      lastWeek: [true, true, false, true, true, false, true]
    },
    { 
      name: "Exercise", 
      streak: 5,
      lastWeek: [false, true, true, true, false, true, true]
    },
    { 
      name: "Drink Water", 
      streak: 15,
      lastWeek: [true, true, true, true, true, true, true]
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-border bg-card/50 shadow-xl">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-bold">Your Habits</h3>
        <p className="text-muted-foreground">Track multiple habits with ease</p>
      </div>
      
      <div className="divide-y divide-border">
        {habits.map((habit, index) => (
          <div key={index} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-10 rounded-full ${getStreakColor(habit.streak)}`}></div>
              <div>
                <h4 className="font-medium">{habit.name}</h4>
                <p className="text-sm text-muted-foreground">{habit.streak} day streak</p>
              </div>
            </div>
            
            <div className="flex gap-1">
              {habit.lastWeek.map((completed, i) => (
                <div 
                  key={i} 
                  className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    completed 
                      ? "bg-green-500/10 border border-green-500/30" 
                      : "bg-muted/30 border border-border"
                  }`}
                >
                  {completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 border-t border-border bg-card/50">
        <div className="text-sm text-muted-foreground text-center">
          Simple, elegant habit tracking for your daily routines
        </div>
      </div>
    </div>
  );
}

// Helper function to get color based on streak length
function getStreakColor(streak: number): string {
  if (streak >= 10) return "bg-green-500";
  if (streak >= 5) return "bg-blue-500";
  return "bg-purple-500";
}
