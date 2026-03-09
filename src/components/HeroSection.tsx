import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import { Brain, MessageSquareWarning, Shield, Target, Sliders } from "lucide-react";

interface HeroSectionProps {
  onAuthOpen: (mode: "signup") => void;
}

const featureCards = [
  {
    icon: Brain,
    title: "Context-Aware AI",
    subtitle: "Smart Detection",
    items: ["Embedding-based topic analysis", "Cosine similarity matching", "Real-time context understanding"],
  },
  {
    icon: MessageSquareWarning,
    title: "AI Suggestions",
    subtitle: "Guided Moderation",
    items: ["Smart message rewriting", "Topic-relevant guidance", "Non-blocking corrections"],
  },
  {
    icon: Shield,
    title: "Multi-Layer Shield",
    subtitle: "Defense System",
    items: ["Toxicity detection", "Spam filtering", "Off-topic prevention"],
  },
  {
    icon: Target,
    title: "Real-Time Engine",
    subtitle: "Sub-300ms Latency",
    items: ["Pre-send checking", "Instant moderation", "Zero-delay responses"],
  },
  {
    icon: Sliders,
    title: "Adaptive Modes",
    subtitle: "Admin Controls",
    items: ["Strict / Balanced / Relaxed", "Custom sensitivity levels", "Per-channel configuration"],
  },
];

const HeroSection = ({ onAuthOpen }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Side accent lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 pt-32 pb-20">
        {/* Left: Text */}
        <motion.div
          style={{ y: titleY, opacity }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-display text-[14vw] md:text-[10vw] lg:text-[7vw] leading-[0.9] tracking-wider text-foreground uppercase"
          >
            SENTINEL<span className="text-primary">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 text-xs md:text-sm tracking-[0.3em] text-muted-foreground font-body uppercase max-w-xl mx-auto lg:mx-0"
          >
            We are experts in AI-powered real-time chat moderation. We create safe communities that empower learning worldwide.
          </motion.p>

          {/* Number strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex items-center justify-center lg:justify-start gap-3 mt-8"
          >
            {["3", ".", ".", "2", ".", ".", "1", ".", ".", "0", ".", ".", "1", ".", ".", "2", ".", ".", "3"].map((char, i) => (
              <span key={i} className="text-xs text-muted-foreground font-body tracking-widest">
                {char}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Card Swap with UI Layer label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex-1 relative hidden md:block"
          style={{ height: '500px' }}
        >
          {/* UI Layer label */}
          <div className="absolute -top-2 right-0 z-40">
            <span className="font-display text-lg tracking-[0.2em] text-muted-foreground/60 uppercase">
              UI Layer
            </span>
          </div>

          <CardSwap
            cardDistance={50}
            verticalDistance={60}
            delay={5000}
            pauseOnHover={false}
            width={400}
            height={280}
          >
            {featureCards.map((feature, idx) => (
              <Card key={idx}>
                <div className="w-full h-full rounded-xl bg-card border border-border p-5 flex flex-col cursor-pointer select-none">
                  {/* Mock browser bar */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                    <div className="ml-3 flex-1 h-5 rounded bg-muted/60" />
                  </div>

                  {/* Feature content */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm tracking-wider text-foreground uppercase">
                        {feature.title}
                      </h3>
                      <p className="text-[10px] text-muted-foreground font-body tracking-wider uppercase">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-border mb-3" />

                  {/* Feature items */}
                  <div className="flex-1 space-y-2">
                    {feature.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary/60" />
                        <span className="text-xs text-muted-foreground font-body">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom accent bar */}
                  <div className="mt-3 w-full h-1 rounded-full bg-gradient-to-r from-primary/40 to-primary/10" />
                </div>
              </Card>
            ))}
          </CardSwap>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-20 bg-gradient-to-t from-background to-transparent" />

      {/* Bottom bar with time */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-primary/50" />
        </div>
        <LiveClock />
      </motion.div>
    </section>
  );
};

const LiveClock = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour12: false });
  return (
    <span className="text-xs tracking-[0.15em] text-muted-foreground font-body">
      {time}
    </span>
  );
};

export default HeroSection;
