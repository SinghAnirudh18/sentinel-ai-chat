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
    title: "Instant Engine",
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

/* ── icon data ── */
const appIcons = [
  {
    name: "Microsoft Teams",
    color: "#6264A7",
    size: "w-16 h-16 md:w-22 md:h-22 lg:w-24 lg:h-24",
    iconSize: "w-8 h-8 md:w-11 md:h-11 lg:w-12 lg:h-12",
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-11 md:h-11 lg:w-12 lg:h-12" fill="#6264A7">
        <path d="M19.19 8.77a2.49 2.49 0 100-4.98 2.49 2.49 0 000 4.98zM22.65 10.07h-5.34a1.34 1.34 0 00-1.34 1.34v4.67a3.34 3.34 0 003.01 3.32 3.34 3.34 0 003.67-3.32v-4.67a1.34 1.34 0 00-1-1.34zM13.57 8.07a3.07 3.07 0 100-6.14 3.07 3.07 0 000 6.14zM16.8 9.37H9.92a1.34 1.34 0 00-1.35 1.34v5.67a4.1 4.1 0 003.66 4.06 4.1 4.1 0 004.56-4.06V10.7a1.34 1.34 0 00-1-1.34z"/>
        <path d="M8.57 10.7v5.67c0 .36.05.71.13 1.05A3.57 3.57 0 015 14.08v-4a1.34 1.34 0 011.34-1.35h2.64a2.64 2.64 0 00-.41 1.97z" opacity=".6"/>
      </svg>
    ),
  },
  {
    name: "Telegram",
    color: "#229ED9",
    size: "w-18 h-18 md:w-24 md:h-24 lg:w-28 lg:h-28",
    iconSize: "w-9 h-9 md:w-12 md:h-12 lg:w-14 lg:h-14",
    svg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-12 md:h-12 lg:w-14 lg:h-14" fill="none">
        <path d="M22 2L11 13" stroke="#229ED9" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="#229ED9"/>
      </svg>
    ),
  },
  {
    name: "Discord",
    color: "#5865F2",
    size: "w-22 h-22 md:w-28 md:h-28 lg:w-32 lg:h-32",
    iconSize: "w-11 h-11 md:w-14 md:h-14 lg:w-16 lg:h-16",
    svg: (
      <svg viewBox="0 0 24 24" className="w-11 h-11 md:w-14 md:h-14 lg:w-16 lg:h-16" fill="#5865F2">
        <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.369a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
  {
    name: "Signal",
    color: "#3A76F0",
    size: "w-18 h-18 md:w-24 md:h-24 lg:w-28 lg:h-28",
    iconSize: "w-9 h-9 md:w-12 md:h-12 lg:w-14 lg:h-14",
    svg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-12 md:h-12 lg:w-14 lg:h-14" fill="#3A76F0">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.16-1.26A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 3.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9.5 8.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM8.5 13c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-3.5 2.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
      </svg>
    ),
  },
  {
    name: "Messenger",
    color: "#0084FF",
    size: "w-16 h-16 md:w-22 md:h-22 lg:w-24 lg:h-24",
    iconSize: "w-8 h-8 md:w-11 md:h-11 lg:w-12 lg:h-12",
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-11 md:h-11 lg:w-12 lg:h-12" fill="#0084FF">
        <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.906 1.453 5.497 3.727 7.191V22l3.405-1.868A11.28 11.28 0 0012 20.487c5.523 0 10-4.145 10-9.244C22 6.145 17.523 2 12 2zm1.07 12.449l-2.545-2.714-4.97 2.714 5.467-5.8 2.609 2.714 4.906-2.714-5.467 5.8z"/>
      </svg>
    ),
  },
];

/* Spread positions for each icon (percentage offsets from center) */
const spreadPositions = [
  { x: "-42%", y: "0%" },
  { x: "-20%", y: "-8%" },
  { x: "0%", y: "0%" },
  { x: "20%", y: "-8%" },
  { x: "42%", y: "0%" },
];

const HeroSection = ({ onAuthOpen }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Text parallax */
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const stripY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const stripOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  /* Icons: scroll-driven spread */
  const { scrollYProgress: iconScrollProgress } = useScroll({
    target: iconsRef,
    offset: ["start end", "center center"],
  });

  /* 0 = clustered, 1 = fully spread */
  const spread = useTransform(iconScrollProgress, [0, 1], [0, 1]);
  const iconGroupOpacity = useTransform(iconScrollProgress, [0, 0.3], [0.6, 1]);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-[200vh] flex flex-col overflow-hidden">
      {/* Side accent lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 pt-32 pb-20">
        {/* Left: Text with layered parallax */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            style={{ y: titleY, opacity: titleOpacity }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1], delay: 0.3 }}
            className="font-display text-[14vw] md:text-[10vw] lg:text-[7vw] leading-[0.9] tracking-wider text-foreground uppercase"
          >
            SENTINEL<span className="text-primary">AI</span>
          </motion.h1>

          <motion.p
            style={{ y: subtitleY, opacity: subtitleOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0, 1], delay: 0.8 }}
            className="mt-8 text-xs md:text-sm tracking-[0.3em] text-muted-foreground font-body uppercase max-w-xl mx-auto lg:mx-0"
          >
            We are experts in AI-powered real-time chat moderation. We create safe communities that empower learning worldwide.
          </motion.p>

          {/* Number strip */}
          <motion.div
            style={{ y: stripY, opacity: stripOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center lg:justify-start gap-3 mt-8"
          >
            {["3", ".", ".", "2", ".", ".", "1", ".", ".", "0", ".", ".", "1", ".", ".", "2", ".", ".", "3"].map((char, i) => (
              <span key={i} className="text-xs text-muted-foreground font-body tracking-widest">
                {char}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: Card Swap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex-1 relative hidden md:block"
          style={{ height: '500px' }}
        >
          <CardSwap
            cardDistance={50}
            verticalDistance={60}
            delay={2000}
            pauseOnHover={false}
            width={400}
            height={280}
          >
            {featureCards.map((feature, idx) => (
              <Card key={idx}>
                <div className="w-full h-full rounded-xl bg-card border border-border p-5 flex flex-col cursor-pointer select-none">
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                    <div className="ml-3 flex-1 h-5 rounded bg-muted/60" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm tracking-wider text-foreground uppercase">{feature.title}</h3>
                      <p className="text-[10px] text-muted-foreground font-body tracking-wider uppercase">{feature.subtitle}</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-border mb-3" />
                  <div className="flex-1 space-y-2">
                    {feature.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary/60" />
                        <span className="text-xs text-muted-foreground font-body">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 w-full h-1 rounded-full bg-gradient-to-r from-primary/40 to-primary/10" />
                </div>
              </Card>
            ))}
          </CardSwap>
        </motion.div>
      </div>

      {/* Floating App Icons — scroll-driven spread from cluster */}
      <div ref={iconsRef} className="relative z-10 w-full mt-40 md:mt-56 pb-48">
        <motion.div
          style={{ opacity: iconGroupOpacity, height: "10rem" }}
          className="container mx-auto relative flex items-center justify-center"
        >
          {appIcons.map((app, i) => (
            <ScrollDrivenIcon key={app.name} app={app} index={i} spread={spread} />
          ))}
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

/* ── Scroll-driven icon that goes from clustered center to spread position ── */
interface ScrollDrivenIconProps {
  app: typeof appIcons[0];
  index: number;
  spread: ReturnType<typeof useTransform>;
}

const ScrollDrivenIcon = ({ app, index, spread }: ScrollDrivenIconProps) => {
  const targetX = parseFloat(spreadPositions[index].x);
  const targetY = parseFloat(spreadPositions[index].y);

  // Map spread 0→1 to position
  const x = useTransform(spread, [0, 1], ["0%", `${targetX * 1.2}vw`]);
  const y = useTransform(spread, [0, 1], ["0%", `${targetY * 0.5}vh`]);
  const iconScale = useTransform(spread, [0, 0.5, 1], [0.6, 0.9, 1]);
  const rotate = useTransform(spread, [0, 1], [0, index % 2 === 0 ? 3 : -3]);

  return (
    <motion.div
      style={{ x, y, scale: iconScale, rotate }}
      whileHover={{ scale: 1.25, rotate: index % 2 === 0 ? 8 : -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`absolute ${app.size} rounded-2xl bg-card border border-border shadow-xl flex items-center justify-center cursor-pointer transition-shadow duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:border-primary/30`}
    >
      {app.svg}
    </motion.div>
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
