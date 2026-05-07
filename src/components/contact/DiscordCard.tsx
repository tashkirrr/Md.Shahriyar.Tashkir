import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Check, Copy } from "lucide-react";

const DiscordCard = () => {
  const [copied, setCopied] = useState(false);
  const discordId = "865610520366940200";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(discordId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bento-item flex items-center gap-4 flex-1 min-h-[48px] relative group overflow-hidden">
      <MessageCircle size={20} className="text-primary shrink-0" />
      <span className="text-foreground text-sm font-semibold flex-1">Discord</span>
      
      <div className="flex items-center gap-2 shrink-0">
        <code className="font-mono text-[10px] md:text-xs text-muted-foreground bg-secondary px-2 py-1.5 rounded truncate max-w-[120px] md:max-w-[150px]">
          {discordId}
        </code>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all flex items-center justify-center shrink-0 min-w-[32px] min-h-[32px]"
          title="Copy to clipboard"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Check size={14} className="text-primary" />
              </motion.div>
            ) : (
              <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Copy size={14} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            className="absolute inset-0 bg-card/90 backdrop-blur-sm flex items-center justify-center rounded-xl z-10 border border-primary/20"
          >
            <p className="text-sm font-semibold text-primary tracking-wide">
              ID Copied!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscordCard;
