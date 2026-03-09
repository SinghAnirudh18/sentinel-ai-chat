import { motion } from "framer-motion";
import marquee2 from "@/assets/marquee-2.jpg";
import marquee3 from "@/assets/marquee-3.jpg";

const FooterSection = () => {
  return (
    <footer className="relative py-24 md:py-40">
      {/* Side lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        {/* Join section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs tracking-[0.3em] text-muted-foreground font-body uppercase mb-4">
            Creating the future together
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-foreground uppercase leading-[0.9] mb-8">
            Join<br />
            <span className="text-primary">Us</span>
          </h2>
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <p className="text-sm text-muted-foreground font-body max-w-md leading-relaxed">
              We are always on the lookout for communities to protect. If you're looking for intelligent moderation that empowers learning, get in touch.
            </p>
            <div className="hidden lg:flex items-end gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="w-48 h-64 rounded-sm overflow-hidden border border-border"
              >
                <img src={marquee2} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="w-40 h-52 rounded-sm overflow-hidden border border-border"
              >
                <img src={marquee3} alt="" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl tracking-wider text-foreground">SENTINEL</span>
            <span className="font-display text-xl tracking-wider text-primary">AI</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary ml-1" />
          </div>
          <p className="text-xs text-muted-foreground font-body tracking-[0.1em]">
            © 2026 SENTINELAI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
