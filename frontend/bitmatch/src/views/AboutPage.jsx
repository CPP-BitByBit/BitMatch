import React from "react";
import { motion } from "framer-motion";
import TeamCard from "@/components/about/TeamCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function ContactItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start">
      <Icon className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
      <div>
        <h3 className="font-medium text-foreground">{label}</h3>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="mt-16">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="py-24 w-full bg-black text-white text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            About
          </motion.h1>
        </div>

        {/* Story Section */}
        <motion.div
          className="pt-24 pb-32 px-4 sm:px-6 max-w-4xl mx-auto space-y-6 text-muted-foreground text-lg leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p>
            BitMatch was created by a team of students from Cal Poly Pomona who came together under the name Bit by Bit to solve a common challenge: helping students connect with meaningful project opportunities.
          </p>
          <p>
            Our platform acts as a digital project incubator, where users can post their ideas, specify skills they need, and discover teammates with shared interests. Meanwhile, students looking to contribute can receive intelligent project recommendations based on their profile.
          </p>
          <p>
            Our mission is to foster collaboration, drive innovation, and give students real-world experience in their fields by enabling them to build together.
          </p>
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="bg-white pb-24 px-4 sm:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            The Developers
          </motion.h2>
          <p className="text-muted-foreground text-sm md:text-base mb-12">
            Meet the passionate team behind BitMatch.
          </p>
          <TeamCard />
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="bg-muted py-24 mt-32 px-4 sm:px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Contact Us</h2>
          <p className="text-muted-foreground mb-10 text-center text-sm md:text-base">
            Have questions or want to learn more about our mission? Send us a message—we'd love to hear from you.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first-name" className="text-sm font-medium text-foreground">
                  First name
                </label>
                <Input
                  id="first-name"
                  name="firstName"
                  placeholder="John"
                  className="bg-background text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium text-foreground">
                  Last name
                </label>
                <Input
                  id="last-name"
                  name="lastName"
                  placeholder="Doe"
                  className="bg-background text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                className="bg-background text-foreground focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-foreground">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder="How can we help you?"
                className="bg-background text-foreground focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your project..."
                className="min-h-[150px] bg-background text-foreground focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </motion.section>
    </div>
  );
}
