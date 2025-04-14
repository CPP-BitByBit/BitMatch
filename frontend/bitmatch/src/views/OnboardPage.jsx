"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import CreateProfile from "@/components/onboarding/CreateProfile";
import Location from "@/components/onboarding/Location";
import Roles from "@/components/onboarding/Roles";
import Interest from "@/components/onboarding/Interest";
import Skills from "@/components/onboarding/Skills";
import StepIndicator from "@/components/onboarding/StepIndicator";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const totalSteps = 5;

  const createProfileRef = useRef();
  const locationRef = useRef();
  const rolesRef = useRef();
  const interestRef = useRef();
  const skillsRef = useRef();

  const navigate = useNavigate();
  const { user } = useUser();
  const checkIfUserOnboarded = async (userId) => {
    try {
      const response = await fetch(
        `${SERVER_HOST}/userauth/onboard/check/${userId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error("Failed to check onboarding status");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      return null;
    }
  };

  useEffect(() => {
    const runCheck = async () => {
      if (!user) return;
      const onboarded = await checkIfUserOnboarded(user.id);

      if (onboarded.message === "User already onboarded") {
        alert("You're already onboarded! Redirecting to home...");
        navigate("/");
      }
    };

    runCheck();
  }, [user, navigate]);

  const stepTitles = [
    "Create your Profile",
    "Location",
    "Roles & Positions",
    "Project Interests",
    "List Skill Sets",
  ];

  const updateStepData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return createProfileRef.current?.validate() ?? false;
      case 2:
        return locationRef.current?.validate() ?? false;
      case 3:
        return rolesRef.current?.validate() ?? false;
      case 4:
        return interestRef.current?.validate() ?? false;
      case 5:
        return skillsRef.current?.validate() ?? false;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        variant: "destructive",
        title: "🚫 Incomplete Step",
        description: "Please complete this step before proceeding.",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const onboarded = await checkIfUserOnboarded(user.id);
    if (onboarded.message === "User not onboarded yet!") {
      try {
        const finalFormData = {
          ...formData,
          auth_id: user.id,
          email: user.primaryEmailAddress.emailAddress,
          username: user.username,
        };
        const res = await fetch(`${SERVER_HOST}/userauth/onboard/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalFormData),
        });
        if (!res.ok) throw new Error("Failed to submit");
        alert("✅ Successfully onboarded, welcome aboard!");
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("❌ Onboarding failed, please try again!");
      }
    } else {
      alert("You have already onboarded, redirecting you to the home page!");
      navigate("/");
    }
  };

  const renderStep = () => {
    const stepProps = { onDataChange: updateStepData, formData };

    switch (currentStep) {
      case 1:
        return <CreateProfile {...stepProps} ref={createProfileRef} />;
      case 2:
        return <Location {...stepProps} ref={locationRef} />;
      case 3:
        return <Roles {...stepProps} ref={rolesRef} />;
      case 4:
        return <Interest {...stepProps} ref={interestRef} />;
      case 5:
        return <Skills {...stepProps} ref={skillsRef} />;
      default:
        return null;
    }
  };

  return (
    <main className="my-16 flex flex-col items-center justify-center min-h-screen">
      <Toaster /> {/* Required for showing toasts */}
      {/* Header */}
      <div className="py-16 w-full bg-black text-white text-center">
        <h1>{stepTitles[currentStep - 1]}</h1>
      </div>
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200">
        <div
          className="h-2 bg-blue-600 transition-all duration-500 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        titles={stepTitles}
      />
      {/* Main Content */}
      <div className="w-full max-w-3xl px-6 py-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Optional JSON debug preview */}
        {/* <pre className="text-xs mt-6 bg-gray-100 p-4 rounded w-full overflow-auto">
          {JSON.stringify(formData, null, 2)}
        </pre> */}
      </div>
      {/* Navigation */}
      <div className="w-full max-w-3xl px-6 mt-8 mb-12 flex justify-between items-center">
        {currentStep > 1 ? (
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="sm"
            className="w-28 text-white bg-black hover:bg-blue-700 hover:text-white"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
        ) : (
          <div className="w-28" />
        )}

        {currentStep < totalSteps ? (
          <Button
            onClick={handleNext}
            size="sm"
            className="w-28 hover:bg-blue-700"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="w-28 bg-green-600 hover:bg-green-700"
            size="sm"
          >
            Submit
          </Button>
        )}
      </div>
    </main>
  );
}
