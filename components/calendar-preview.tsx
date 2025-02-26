import { CheckCircle, X } from "lucide-react";

export default function CalendarPreview() {
  // Mock data for the calendar preview
  const days = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    completed: Math.random() > 0.3, // Randomly mark some days as completed
  }));

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-border bg-card/50 shadow-xl">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-bold">March 2025</h3>
        <p className="text-muted-foreground">Morning Meditation</p>
      </div>
      
      <div className="grid grid-cols-7 gap-1 p-6">
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
        
        {/* Empty cells for days before the month starts (assuming March 2025 starts on a Saturday) */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square p-2"></div>
        ))}
        
        {/* Calendar days */}
        {days.map((day) => (
          <div 
            key={day.day} 
            className={`aspect-square p-1 flex flex-col items-center justify-center rounded-md transition-colors ${
              day.completed 
                ? "bg-green-500/10 border border-green-500/30" 
                : "hover:bg-card"
            }`}
          >
            <span className="text-sm font-medium">{day.day}</span>
            <div className="mt-1">
              {day.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 border-t border-border bg-card/50">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-muted-foreground">Current streak:</span>
            <span className="ml-2 font-bold">7 days</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Completion rate:</span>
            <span className="ml-2 font-bold">78%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
