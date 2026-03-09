import { motion } from "framer-motion";
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
  return (
    <section id="features" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Powerful <span className="text-gradient">Features</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Three AI layers working together to keep your community focused and safe.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 group hover:glow-border transition-all duration-500"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
