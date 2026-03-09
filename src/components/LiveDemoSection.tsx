import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Shield, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModerationResult {
  status: "allowed" | "blocked" | "suggested";
  toxicity: number;
  topicMatch: number;
  spam: number;
  suggestion?: string;
}

const demoMessages: Record<string, ModerationResult> = {
  "What is the difference between Spring Boot and Spring MVC?": {
    status: "allowed",
    toxicity: 0,
    topicMatch: 97,
    spam: 0,
  },
  "Follow me on Instagram for Java tips": {
    status: "suggested",
    toxicity: 0,
    topicMatch: 40,
    spam: 94,
    suggestion: "Self-promotion detected. Try asking a question related to Java development instead.",
  },
  "Buy my crypto course now!": {
    status: "blocked",
    toxicity: 0,
    topicMatch: 5,
    spam: 98,
    suggestion: "Promotional content is not allowed. This group focuses on Full Stack Java.",
  },
  "Best Netflix series?": {
    status: "suggested",
    toxicity: 0,
    topicMatch: 3,
    spam: 0,
    suggestion: "This group focuses on Java development. Try asking about Java frameworks or backend development.",
  },
};

const LiveDemoSection = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ModerationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      // Find closest demo message or default
      const match = Object.entries(demoMessages).find(([key]) =>
        input.toLowerCase().includes(key.toLowerCase().split(" ")[0])
      );
      setResult(
        match
          ? match[1]
          : {
              status: "allowed",
              toxicity: Math.floor(Math.random() * 5),
              topicMatch: 70 + Math.floor(Math.random() * 30),
              spam: Math.floor(Math.random() * 5),
            }
      );
      setLoading(false);
    }, 600);
  };

  const statusConfig = {
    allowed: { icon: CheckCircle2, label: "Allowed", color: "text-emerald-400" },
    blocked: { icon: Shield, label: "Blocked", color: "text-destructive" },
    suggested: { icon: AlertTriangle, label: "Suggestion", color: "text-amber-400" },
  };

  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Try It <span className="text-gradient">Live</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Type a message below to see how SentinelAI moderates it in a Java learning group.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="glass-card rounded-xl p-6 glow-border">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground font-display">Group: Full Stack Java Development</span>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Try: Follow me on Instagram for Java tips"
                className="flex-1 bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <Button variant="hero" size="icon" onClick={handleSubmit} disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick demos */}
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(demoMessages).map((msg) => (
                <button
                  key={msg}
                  onClick={() => {
                    setInput(msg);
                    setResult(null);
                  }}
                  className="text-xs glass-card rounded-full px-3 py-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {msg.length > 30 ? msg.slice(0, 30) + "…" : msg}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Analyzing message…
                </motion.div>
              )}
              {result && !loading && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    {(() => {
                      const cfg = statusConfig[result.status];
                      return (
                        <>
                          <cfg.icon className={`h-5 w-5 ${cfg.color}`} />
                          <span className={`font-display font-semibold text-sm ${cfg.color}`}>{cfg.label}</span>
                        </>
                      );
                    })()}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Toxicity", value: result.toxicity },
                      { label: "Topic Match", value: result.topicMatch },
                      { label: "Spam", value: result.spam },
                    ].map((m) => (
                      <div key={m.label} className="text-center">
                        <p className="text-lg font-display font-bold text-foreground">{m.value}%</p>
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {result.suggestion && (
                    <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                      <p className="text-sm text-muted-foreground">
                        <span className="text-primary font-medium">AI says: </span>
                        {result.suggestion}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveDemoSection;
