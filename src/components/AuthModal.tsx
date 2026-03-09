import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  mode: "login" | "signup";
  isOpen: boolean;
  onClose: () => void;
  onToggleMode: () => void;
}

const AuthModal = ({ mode, isOpen, onClose, onToggleMode }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative glass-card rounded-2xl p-8 w-full max-w-md glow-border"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-8">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                {mode === "login" ? "Welcome Back" : "Get Started"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {mode === "login" ? "Sign in to your account" : "Create your SentinelAI account"}
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
              )}
              <div>
                <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button variant="hero" className="w-full" size="lg">
                {mode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={onToggleMode} className="text-primary hover:underline font-medium">
                {mode === "login" ? "Sign up" : "Log in"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
