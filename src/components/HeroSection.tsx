import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import marquee1 from "@/assets/marquee-1.jpg";
import marquee2 from "@/assets/marquee-2.jpg";
import marquee3 from "@/assets/marquee-3.jpg";
import marquee4 from "@/assets/marquee-4.jpg";
import marquee5 from "@/assets/marquee-5.jpg";

interface HeroSectionProps {
  onAuthOpen: (mode: "signup") => void;
}

const images = [marquee1, marquee2, marquee3, marquee4, marquee5];

const HeroSection = ({ onAuthOpen }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const marqueeY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Side accent lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

      {/* Large Title */}
      <motion.div
        style={{ y: titleY, opacity }}
        className="relative z-10 text-center pt-32 pb-8 px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-wider text-foreground uppercase"
        >
          SENTINEL<span className="text-primary">AI</span>
        </motion.h1>
      </motion.div>

      {/* Horizontal Scrolling Image Strip */}
      <motion.div
        style={{ y: marqueeY }}
        className="relative z-10 w-full overflow-hidden py-6"
      >
        <div className="flex animate-marquee gap-4" style={{ width: "fit-content" }}>
          {[...images, ...images, ...images].map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[220px] md:w-[280px] h-[280px] md:h-[360px] rounded-sm overflow-hidden"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tagline below marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{ opacity }}
        className="relative z-10 text-center py-12 px-4"
      >
        <p className="text-xs md:text-sm tracking-[0.3em] text-muted-foreground font-body uppercase max-w-xl mx-auto">
          We are experts in AI-powered real-time chat moderation. We create safe communities that empower learning worldwide.
        </p>
      </motion.div>

      {/* Countdown-style number strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 flex items-center justify-center gap-3 pb-8"
      >
        {["3", ".", ".", "2", ".", ".", "1", ".", ".", "0", ".", ".", "1", ".", ".", "2", ".", ".", "3"].map((char, i) => (
          <span key={i} className="text-xs text-muted-foreground font-body tracking-widest">
            {char}
          </span>
        ))}
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
