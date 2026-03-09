import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onAuthOpen: (mode: "login" | "signup") => void;
}

const Navbar = ({ onAuthOpen }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["ABOUT", "FEATURES", "HOW IT WORKS", "DEMO"];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-6 md:px-12">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1">
          <span className="font-display text-2xl tracking-wider text-foreground">
            SENTINEL
          </span>
          <span className="font-display text-2xl tracking-wider text-primary">AI</span>
          <span className="inline-block w-2 h-2 rounded-full bg-primary ml-1 animate-pulse-glow" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300 font-body font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => onAuthOpen("signup")}
            className="flex items-center gap-2 text-xs tracking-[0.2em] font-body font-medium text-foreground hover:text-primary transition-colors duration-300"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            GET IN TOUCH
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border overflow-hidden"
          >
            <div className="flex flex-col gap-6 p-6">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-sm tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-body"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => { onAuthOpen("signup"); setMobileOpen(false); }}
                className="flex items-center gap-2 text-sm tracking-[0.2em] font-body text-foreground"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                GET IN TOUCH
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
