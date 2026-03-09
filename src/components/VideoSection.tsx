import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const features = [
  "Real-Time AI Message Moderation",
  "Context-Aware Moderation Using Group Grammar",
  "Multi-Rule Moderation Engine",
  "User-Friendly Feedback System",
];

const VideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.92, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000); // 2s visible + ~1s for transition
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="demo" ref={containerRef} className="relative py-24 md:py-40">
      {/* Side lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      {/* Purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text & Features */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <p className="text-xs tracking-[0.3em] text-muted-foreground font-body uppercase mb-4">
              On Set
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-foreground uppercase leading-[0.9] mb-12">
              See It In<br />
              <span className="text-primary">Action</span>
            </h2>

            {/* Feature cycling */}
            <div className="relative h-24 md:h-28 flex items-center justify-center lg:justify-start overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute flex items-center gap-4"
                >
                  {/* Accent line */}
                  <div className="hidden lg:block w-8 h-px bg-primary/60 shrink-0" />

                  {/* Number */}
                  <span className="text-xs text-primary/60 font-body tracking-widest shrink-0">
                    0{activeFeature + 1}
                  </span>

                  {/* Feature text */}
                  <h3 className="font-display text-lg md:text-2xl lg:text-3xl tracking-wider text-foreground/90 uppercase">
                    {features[activeFeature]}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-3 mt-6 justify-center lg:justify-start">
              {features.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 rounded-full cursor-pointer"
                  animate={{
                    width: i === activeFeature ? 32 : 8,
                    backgroundColor: i === activeFeature
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted-foreground) / 0.3)",
                  }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActiveFeature(i)}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Video */}
          <motion.div
            style={{ scale, opacity }}
            className="flex-1 [perspective:1200px]"
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
                className="absolute inset-0 z-10 pointer-events-none rounded-2xl transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 0.08 : 0,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, transparent 100%)",
                }}
              />

              <video autoPlay loop muted playsInline className="w-full h-auto block">
                <source src="/demo.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
