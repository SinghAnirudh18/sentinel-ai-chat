import { Shield } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-display font-bold text-foreground">
              Sentinel<span className="text-primary">AI</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 SentinelAI. Guarding conversations, empowering learning.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
