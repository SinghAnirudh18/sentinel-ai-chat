import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import LiveDemoSection from "@/components/LiveDemoSection";
import AuthModal from "@/components/AuthModal";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");

  const handleAuthOpen = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAuthOpen={handleAuthOpen} />
      <HeroSection onAuthOpen={handleAuthOpen} />
      <VideoSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LiveDemoSection />
      <FooterSection />
      <AuthModal
        mode={authMode}
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onToggleMode={() => setAuthMode(authMode === "login" ? "signup" : "login")}
      />
    </div>
  );
};

export default Index;
