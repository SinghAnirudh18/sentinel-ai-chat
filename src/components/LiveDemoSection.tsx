import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

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
    allowed: { icon: CheckCircle2, label: "ALLOWED", color: "text-primary" },
    blocked: { icon: Shield, label: "BLOCKED", color: "text-destructive" },
    suggested: { icon: AlertTriangle, label: "SUGGESTION", color: "text-yellow-500" },
  };

  return (
    <section className="relative py-24 md:py-40">
      {/* Side lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-muted-foreground font-body uppercase mb-4">
            Live Testing
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-foreground uppercase leading-[0.9]">
            Try It<br />
            <span className="text-primary">Live</span>
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-6 max-w-lg">
            Type a message below to see how SentinelAI moderates it in a Java learning group.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="border border-border bg-card p-8">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs tracking-[0.15em] text-muted-foreground font-body uppercase">
                Group: Full Stack Java Development
              </span>
            </div>

            <div className="flex gap-3 mb-6">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Try: Follow me on Instagram for Java tips"
                className="flex-1 bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors font-body"
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {/* Quick demos */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(demoMessages).map((msg) => (
                <button
                  key={msg}
                  onClick={() => { setInput(msg); setResult(null); }}
                  className="text-xs border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors font-body"
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
                  className="flex items-center gap-2 text-sm text-muted-foreground font-body"
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
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2">
                    {(() => {
                      const cfg = statusConfig[result.status];
                      return (
                        <>
                          <cfg.icon className={`h-5 w-5 ${cfg.color}`} />
                          <span className={`font-display text-lg tracking-wider ${cfg.color}`}>{cfg.label}</span>
                        </>
                      );
                    })()}
                  </div>

                  <div className="grid grid-cols-3 gap-px bg-border">
                    {[
                      { label: "TOXICITY", value: result.toxicity },
                      { label: "TOPIC MATCH", value: result.topicMatch },
                      { label: "SPAM", value: result.spam },
                    ].map((m) => (
                      <div key={m.label} className="bg-background text-center py-4">
                        <p className="font-display text-2xl text-foreground">{m.value}%</p>
                        <p className="text-xs text-muted-foreground tracking-[0.1em] font-body">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {result.suggestion && (
                    <div className="border-l-2 border-primary/50 pl-4 py-2">
                      <p className="text-sm text-muted-foreground font-body">
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
