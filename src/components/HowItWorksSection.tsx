import { motion } from "framer-motion";
import { MessageSquare, Cpu, CheckCircle2, Lightbulb } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "User Sends Message",
    description: "A message enters the moderation pipeline before it reaches the chat.",
  },
  {
    icon: Cpu,
    title: "AI Analyzes",
    description: "Three classifiers run in parallel: toxicity, topic relevance, spam detection.",
  },
  {
    icon: Lightbulb,
    title: "AI Suggests",
    description: "If flagged, the user gets a helpful suggestion to improve their message.",
  },
  {
    icon: CheckCircle2,
    title: "Message Delivered",
    description: "Clean messages flow through instantly. The community stays focused.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative flex items-start gap-6 mb-12 pl-16 md:pl-0 ${
                i % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%]"
              }`}
            >
              {/* Dot on line */}
              <div className="absolute left-4 md:left-1/2 top-1 h-5 w-5 rounded-full bg-primary/20 border-2 border-primary md:-translate-x-1/2 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>

              <div className="glass-card rounded-xl p-5 flex-1">
                <step.icon className="h-5 w-5 text-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
