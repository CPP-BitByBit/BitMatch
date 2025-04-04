import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function OnboardPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    interests: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can send this data to Supabase, Clerk user metadata, or your backend here
    console.log("Onboarding data submitted:", formData);

    // Redirect to dashboard or home
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Work in Progress!</h1>
        <p className="text-muted-foreground text-center">
          This is just a placeholder for the onboarding process. Nothing works right now.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="role">What role are you interested in?</Label>
            <Input
              id="role"
              name="role"
              placeholder="e.g. Frontend Developer"
              value={formData.role}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">What are your project interests?</Label>
            <Input
              id="interests"
              name="interests"
              placeholder="e.g. AI, Web Design, Open Source"
              value={formData.interests}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Tell us a little about yourself</Label>
            <Textarea
              id="bio"
              name="bio"
              rows="4"
              placeholder="Your background, goals, or anything you'd like to share..."
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full">
            Finish Onboarding
          </Button>
        </form>
      </div>
    </div>
  );
}
