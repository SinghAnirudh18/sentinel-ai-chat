import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Brain, MessageSquareWarning, Shield, Target, Sliders, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Context-Aware AI",
    description: "Understands group topics via embeddings. Detects off-topic messages using cosine similarity.",
  },
  {
    icon: MessageSquareWarning,
    title: "AI Suggestion Engine",
    description: "Instead of blocking, guides users to write better, topic-relevant messages.",
  },
  {
    icon: Shield,
    title: "Multi-Layer Detection",
    description: "Toxicity, topic relevance, and spam detection working in parallel.",
  },
  {
    icon: Target,
    title: "Real-Time Moderation",
    description: "Sub-300ms latency. Messages are checked before they appear in chat.",
  },
  {
    icon: Sliders,
    title: "Adaptive Modes",
    description: "Strict, Balanced, or Relaxed — admins control moderation intensity.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track toxicity rates, off-topic trends, and flagged users in real time.",
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="features" ref={sectionRef} className="relative py-24 md:py-40">
      {/* Side accent lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs tracking-[0.3em] text-muted-foreground font-body uppercase mb-4">
            Our Capabilities
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-foreground uppercase leading-[0.9]">
            Beyond<br />
            <span className="text-primary">Moderation</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-background p-8 md:p-10 group hover:bg-card transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <feature.icon className="h-6 w-6 text-primary/60 group-hover:text-primary transition-colors duration-500" />
                <span className="text-xs text-muted-foreground font-body tracking-widest">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl tracking-wider text-foreground uppercase mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
