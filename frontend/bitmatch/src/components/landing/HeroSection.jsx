import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import groupImg from "../../assets/group_students.png";
import { ArrowRight } from "lucide-react";
import { fadeUp, containerStagger } from "./animations";

export function HeroSection({ user }) {
  return (
    <motion.section
      id="hero-slide"
      className="relative w-full py-24 md:py-48 flex items-center z-0"
      aria-labelledby="hero-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerStagger}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
          <motion.div variants={fadeUp} className="order-1 lg:order-2 flex justify-center">
            <img
              src={groupImg}
              alt="Students collaborating on a project"
              className="rounded-xl object-cover"
              width={400}
              height={400}
            />
          </motion.div>

          <motion.div variants={fadeUp} className="order-2 lg:order-1 flex flex-col justify-center space-y-4">
            <h1 id="hero-heading" className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
              Build Experience and Community Bit by Bit
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Find relevant roles for job experience or choose a project that’s meaningful, impactful and right for you.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">

              <Link to="/sign-up" className="w-full">

                <Button size="lg" className="px-8">
                  Get Started<ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>

            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
