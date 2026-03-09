import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import marquee1 from "@/assets/marquee-1.jpg";
import marquee2 from "@/assets/marquee-2.jpg";
import marquee3 from "@/assets/marquee-3.jpg";
import marquee4 from "@/assets/marquee-4.jpg";
import marquee5 from "@/assets/marquee-5.jpg";

interface HeroSectionProps {
  onAuthOpen: (mode: "signup") => void;
}

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

        {/* Right: Card Swap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex-1 relative hidden md:block"
          style={{ height: '500px' }}
        >
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
            width={340}
            height={420}
          >
            <Card>
              <img src={marquee1} alt="" className="w-full h-full object-cover rounded-xl" />
            </Card>
            <Card>
              <img src={marquee2} alt="" className="w-full h-full object-cover rounded-xl" />
            </Card>
            <Card>
              <img src={marquee3} alt="" className="w-full h-full object-cover rounded-xl" />
            </Card>
            <Card>
              <img src={marquee4} alt="" className="w-full h-full object-cover rounded-xl" />
            </Card>
            <Card>
              <img src={marquee5} alt="" className="w-full h-full object-cover rounded-xl" />
            </Card>
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
