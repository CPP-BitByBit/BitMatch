import { useEffect, useState } from "react";
import { teamMembers } from "@/lib/team_data";
import { motion } from "framer-motion";

export default function TeamCard() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    setProfiles(teamMembers);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {profiles.map((member, idx) => (
        <motion.a
          key={member.id}
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group border border-border text-muted-foreground p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <div className="overflow-hidden rounded-xl mb-4">
            <img
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              className="w-full h-64 object-cover group-hover:brightness-90 transition duration-300 ease-in-out rounded-xl"
            />
          </div>
          <h3 className="text-center text-lg font-semibold text-foreground mb-1">
            {member.name}
          </h3>
          <p className="text-center text-sm text-muted-foreground">{member.title}</p>
        </motion.a>
      ))}
    </div>
  );
}
