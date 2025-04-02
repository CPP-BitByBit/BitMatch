import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";

import { HeroSection } from "../components/Landing/HeroSection";
import { HowItWorks } from "../components/Landing/HowItWorks";
import { Features } from "../components/Landing/Features";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Show development modal once per session for signed-in users
  useEffect(() => {
    if (user && !sessionStorage.getItem("seenDevelopmentModal")) {
      setShowModal(true);
      sessionStorage.setItem("seenDevelopmentModal", "true");
    }
  }, [user]);

  return (
    <main>
      {/* Landing Page Sections */}
      <HeroSection user={user} />
      <HowItWorks />
      <Features />

      {/* Development Notice Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}

// Extracted Modal for clarity
function Modal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        className="bg-white rounded-lg p-6 shadow-lg max-w-md text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <h3 id="modal-title" className="text-lg font-bold mb-2">🚧 Heads up!</h3>
        <p className="text-gray-600 text-sm">
          This site is still in development. Features and data may change.
        </p>
        <Button className="mt-4 bg-blue-600 text-white" onClick={onClose}>
          Got it!
        </Button>
      </motion.div>
    </div>
  );
}
