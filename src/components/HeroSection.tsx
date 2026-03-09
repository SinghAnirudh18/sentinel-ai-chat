import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

interface HeroSectionProps {
  onAuthOpen: (mode: "signup") => void;
}

const HeroSection = ({ onAuthOpen }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle background only */}
      <div className="absolute inset-0 z-0">
        <ParticleTextEffect words={["SentinelAI", "Moderate", "Educate", "Protect", "Real-Time"]} />
      </div>

      {/* Subtle bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
