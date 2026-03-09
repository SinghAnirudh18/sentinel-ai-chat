import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], [40, 16]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -40]);

  return (
    <section id="demo" ref={containerRef} className="relative py-20 md:py-32">
      {/* Glow behind video */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/8 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            See It In <span className="text-gradient">Action</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Watch how SentinelAI moderates messages in real-time with context awareness.
          </p>
        </motion.div>

        <motion.div
          style={{ scale, opacity, borderRadius, y }}
          className="max-w-4xl mx-auto overflow-hidden glow-border"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
            style={{ borderRadius: "inherit" }}
          >
            <source src="/demo.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
