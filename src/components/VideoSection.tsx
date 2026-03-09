import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const VideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -40]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const yVal = (e.clientY - centerY) / (rect.height / 2);
    rotateY.set(x * 8);
    rotateX.set(-yVal * 6);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section id="demo" ref={containerRef} className="relative py-24 md:py-40">
      {/* Side lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      {/* Purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-muted-foreground font-body uppercase mb-4">
            On Set
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-foreground uppercase leading-[0.9]">
            See It In<br />
            <span className="text-primary">Action</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ scale, opacity, y }}
          className="max-w-5xl mx-auto [perspective:1200px]"
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative rounded-2xl overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm shadow-2xl shadow-primary/5 transition-shadow duration-500 hover:shadow-primary/15 hover:border-primary/30"
          >
            {/* Top bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-card/80 border-b border-border/30">
              <div className="w-3 h-3 rounded-full bg-destructive/50" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
              <div className="ml-4 flex-1 h-5 rounded-full bg-muted/40 max-w-xs" />
            </div>

            {/* Glare overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none rounded-2xl opacity-0 transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.08 : 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, transparent 100%)",
              }}
            />

            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block"
            >
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
