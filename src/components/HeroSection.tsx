import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

interface HeroSectionProps {
  onAuthOpen: (mode: "signup") => void;
}

const HeroSection = ({ onAuthOpen }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px] animate-pulse-glow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-8"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-xs text-muted-foreground font-medium">AI-Powered Real-Time Moderation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6"
          >
            Guarding{" "}
            <span className="text-gradient">Conversations</span>
            <br />
            Empowering{" "}
            <span className="text-gradient">Learning</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
          >
            SentinelAI doesn't just block messages — it educates users, detects context, and keeps communities focused on learning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="lg" onClick={() => onAuthOpen("signup")}>
              Start Free <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#demo">Watch Demo</a>
            </Button>
          </motion.div>

          {/* Particle Text Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <ParticleTextEffect words={["SentinelAI", "Moderate", "Educate", "Protect", "Real-Time"]} />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex items-center justify-center gap-8 md:gap-16 mt-8"
          >
            {[
              { icon: Shield, label: "Messages Moderated", value: "2M+" },
              { icon: Zap, label: "Avg Latency", value: "<200ms" },
              { label: "Accuracy", value: "97.2%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
