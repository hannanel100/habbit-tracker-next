import Link from "next/link";
import { Button } from "./ui/button";
import { CheckCircle, Calendar, TrendingUp } from "lucide-react";

export default function LandingHero() {
  return (
    <div className="flex flex-col gap-12 items-center py-16 px-4 md:px-6 max-w-6xl mx-auto">
      {/* Hero Header */}
      <div className="flex flex-col gap-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Track Your Habits.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Build Your Future.
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A simple, elegant way to track your daily habits. Check a box each day. Stay consistent. See your progress.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <Button asChild size="lg" className="px-8">
            <Link href="/sign-up">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="px-8">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>

      {/* Placeholder Image */}
      <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-border bg-card/50 shadow-xl">
        <div className="aspect-video relative bg-gradient-to-br from-background to-muted p-8 flex flex-col items-center justify-center">
          <div className="absolute inset-0 opacity-10 bg-grid-white-900/[0.2]" />
          <Calendar className="w-16 h-16 mb-4 text-primary" />
          <h3 className="text-2xl font-bold mb-2">Your Habit Calendar</h3>
          <p className="text-center text-muted-foreground max-w-md">
            Visualize your progress with our elegant calendar view
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
        <FeatureCard 
          icon={<CheckCircle className="w-10 h-10 text-green-500" />}
          title="Simple Tracking"
          description="Just check a box each day you complete your habit. No complicated metrics or data entry."
        />
        <FeatureCard 
          icon={<Calendar className="w-10 h-10 text-blue-500" />}
          title="Visual Calendar"
          description="See your progress at a glance with our beautiful calendar view. Track multiple habits easily."
        />
        <FeatureCard 
          icon={<TrendingUp className="w-10 h-10 text-purple-500" />}
          title="Build Consistency"
          description="Visualize your streaks and build momentum. Stay motivated with your growing chain of success."
        />
      </div>

      {/* Testimonial/Quote */}
      <div className="w-full max-w-3xl mx-auto bg-card/50 rounded-lg p-8 border border-border mt-8">
        <blockquote className="text-xl italic text-center">
          "The habit of persistence is the habit of victory."
        </blockquote>
        <p className="text-right mt-4 text-muted-foreground">— Herbert Kaufman</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
