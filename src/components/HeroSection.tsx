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
            delay={3000}
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

      {/* Floating App Icons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="relative z-10 w-full px-6 md:px-12 pb-32"
      >
        <div className="container mx-auto flex items-center justify-center gap-6 md:gap-12 flex-wrap">
          {/* Instagram */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
            className="w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig)" strokeWidth="2"/>
              <circle cx="12" cy="12" r="5" stroke="url(#ig)" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="#E1306C"/>
              <defs><linearGradient id="ig" x1="2" y1="22" x2="22" y2="2"><stop stopColor="#F58529"/><stop offset="0.5" stopColor="#DD2A7B"/><stop offset="1" stopColor="#8134AF"/></linearGradient></defs>
            </svg>
          </motion.div>

          {/* Telegram */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.3 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="none">
              <path d="M22 2L11 13" stroke="#229ED9" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="#229ED9"/>
            </svg>
          </motion.div>

          {/* Discord */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.6 }}
            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-card border border-border shadow-xl flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12" fill="#5865F2">
              <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.369a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z"/>
            </svg>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.9 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.div>

          {/* Messenger */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
            className="w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9" fill="#0084FF">
              <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.906 1.453 5.497 3.727 7.191V22l3.405-1.868A11.28 11.28 0 0012 20.487c5.523 0 10-4.145 10-9.244C22 6.145 17.523 2 12 2zm1.07 12.449l-2.545-2.714-4.97 2.714 5.467-5.8 2.609 2.714 4.906-2.714-5.467 5.8z"/>
            </svg>
          </motion.div>
        </div>
      </motion.div>

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
