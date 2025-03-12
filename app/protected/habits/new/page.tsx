"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewHabitPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create habit");
      }

      const data = await response.json();
      router.push(`/protected/calendar/${data.habit.id}`);
    } catch (error) {
      console.error("Error creating habit:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/protected/calendar" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Calendar
          </Link>
        </Button>
      </div>

      <Card className="bg-amber-950/20 border-amber-800/30">
        <CardHeader>
          <CardTitle>Create New Habit</CardTitle>
          <CardDescription>
            Start tracking a new habit to build consistency and achieve your
            goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Habit Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Morning Meditation"
                required
                className="bg-amber-950/30 border-amber-800/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !formData.name.trim()}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-amber-200 border-t-transparent"></div>
                  Creating...
                </>
              ) : (
                "Create Habit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
