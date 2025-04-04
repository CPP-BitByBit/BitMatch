import React from "react";
import { motion } from "framer-motion";
import { fadeUp, containerStagger } from "./animations";

const steps = [
  {
    title: "Create Your Profile",
    text: "Sign up and build your profile with your skills, interests, and academic background.",
  },
  {
    title: "Browse Projects",
    text: "Explore available projects or get personalized recommendations based on your profile.",
  },
  {
    title: "Apply and Connect",
    text: "Apply to projects that interest you and connect with project providers to get started.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-black text-white w-full py-16 md:py-24 lg:py-48 z-10"
      aria-labelledby="how-heading"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center space-y-4">
          <h2 id="how-heading" className="text-3xl font-bold sm:text-5xl">How It Works</h2>
          <p className="max-w-[900px] mx-auto text-white/80 md:text-xl">
            Finding and applying for projects is simple and straightforward.
          </p>
        </div>

        <motion.div
          className="grid max-w-5xl mx-auto gap-6 py-12 md:grid-cols-3"
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="flex flex-col items-center space-y-2 border-r border-white/20 pr-8 last:border-none"
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black text-lg font-bold">
                    {idx + 1}
                </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-center md:text-left">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
