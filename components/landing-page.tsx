import LandingHero from "./landing-hero";
import CalendarPreview from "./calendar-preview";
import HabitsPreview from "./habits-preview";
import { Button } from "./ui/button";
import Link from "next/link";
import { CheckCircle, Calendar, TrendingUp, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <LandingHero />
      
      {/* Calendar Preview Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-background/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Daily Check-ins</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your habits with a simple checkbox for each day. No complicated metrics or data entry.
            </p>
          </div>
          
          <CalendarPreview />
          
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="px-8 group">
              <Link href="/sign-up">
                Start Tracking Now 
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Multiple Habits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Track Multiple Habits</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Keep track of all your important habits in one place. Build consistency across your life.
            </p>
          </div>
          
          <HabitsPreview />
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to build lasting habits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Habits</h3>
              <p className="text-muted-foreground">
                Define the habits you want to build. Start small with just one or two important habits.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Check In Daily</h3>
              <p className="text-muted-foreground">
                Each day, simply mark whether you completed your habit. Just a single click to track your progress.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Build Consistency</h3>
              <p className="text-muted-foreground">
                Watch your streaks grow. Visualize your progress and stay motivated to keep your chain unbroken.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Better Habits?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of others who are transforming their lives one habit at a time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link href="/sign-up">Get Started for Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
