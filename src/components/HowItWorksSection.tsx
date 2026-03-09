import { motion } from "framer-motion";
import { MessageSquare, Cpu, Lightbulb, CheckCircle2 } from "lucide-react";
import marquee1 from "@/assets/marquee-1.jpg";
import marquee4 from "@/assets/marquee-4.jpg";
import marquee5 from "@/assets/marquee-5.jpg";

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
    <section id="how-it-works" className="relative py-24 md:py-40">
      {/* Side lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        {/* Header with images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs tracking-[0.3em] text-muted-foreground font-body uppercase mb-4">
            The Process
          </p>
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-foreground uppercase leading-[0.9] flex-shrink-0">
              How It<br />
              <span className="text-primary">Works</span>
            </h2>
            {/* Image cluster */}
            <div className="hidden lg:flex items-end gap-3 flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="w-40 h-52 rounded-sm overflow-hidden"
              >
                <img src={marquee1} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="w-32 h-40 rounded-sm overflow-hidden"
              >
                <img src={marquee4} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="w-36 h-48 rounded-sm overflow-hidden"
              >
                <img src={marquee5} alt="" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Steps in horizontal layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-background p-8 group hover:bg-card transition-colors duration-500 relative"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-4xl text-primary/20 group-hover:text-primary/40 transition-colors">
                  0{i + 1}
                </span>
                <step.icon className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors duration-500" />
              </div>
              <h3 className="font-display text-lg tracking-wider text-foreground uppercase mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
