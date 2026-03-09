import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-card border border-border p-8 w-full max-w-md"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-display text-xl tracking-wider text-foreground">SENTINEL</span>
                <span className="font-display text-xl tracking-wider text-primary">AI</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary ml-1" />
              </div>
              <h2 className="font-display text-3xl tracking-wider text-foreground uppercase">
                {mode === "login" ? "Welcome Back" : "Get Started"}
              </h2>
              <p className="text-sm text-muted-foreground font-body mt-2">
                {mode === "login" ? "Sign in to your account" : "Create your SentinelAI account"}
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-xs text-muted-foreground font-body tracking-[0.1em] uppercase mb-2 block">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors font-body"
                  />
                </div>
              )}
              <div>
                <label className="text-xs text-muted-foreground font-body tracking-[0.1em] uppercase mb-2 block">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors font-body"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-body tracking-[0.1em] uppercase mb-2 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-background border border-border px-4 py-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors font-body"
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

              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-display text-sm tracking-[0.2em] uppercase transition-colors">
                {mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground font-body mt-6">
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
