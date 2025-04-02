import React from "react";
import { motion } from "framer-motion";
import { fadeUp, containerStagger } from "./animations";
import {
  Briefcase,
  Users,
  Award,
  BookOpen,
  Search,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: <Briefcase />, title: "Real-world Experience",
    text: "Work on actual projects from companies and non-profits to gain practical experience."
  },
  {
    icon: <Users />, title: "Networking Opportunities",
    text: "Connect with industry professionals, mentors, and like-minded students."
  },
  {
    icon: <Award />, title: "Portfolio Builder",
    text: "Create an impressive portfolio of completed projects to showcase to future employers."
  },
  {
    icon: <BookOpen />, title: "Academic Credit",
    text: "Many projects qualify for course credit or satisfy academic requirements."
  },
  {
    icon: <Search />, title: "Personalized Matching",
    text: "Our algorithm matches you with projects that fit your skills, interests, and goals."
  },
  {
    icon: <ArrowRight />, title: "Career Advancement",
    text: "Gain the skills and experience employers are looking for in today's job market."
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="relative w-full py-16 md:py-24 lg:py-48 z-10"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center space-y-4">
          <h2 id="features-heading" className="text-3xl font-bold sm:text-5xl">
            Why Students Love Bitmatch
          </h2>
          <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl">
            We connect students with real-world projects that help them build skills, expand their portfolio, and prepare for their career.
          </p>
        </div>

        <motion.div
          className="grid max-w-5xl mx-auto gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm"
            >
              {React.cloneElement(feature.icon, {
                className: "h-12 w-12 text-blue-600",
                role: "img",
                "aria-label": feature.title,
              })}
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
