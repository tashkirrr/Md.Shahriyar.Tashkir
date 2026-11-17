import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string>("Ready to send");
  const lastSubmitTime = useRef<number>(0);
  const statusResetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (statusResetTimeout.current) clearTimeout(statusResetTimeout.current);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || sending) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setStatus("Message form is unavailable. Please email tashkir2006@gmail.com.");
      return;
    }
    
    const now = Date.now();
    if (now - lastSubmitTime.current < 30000) {
      setStatus("Please wait 30 seconds before sending another message.");
      return;
    }
    
    setSending(true);
    setStatus("Sending...");

    try {
      await new Promise((r) => setTimeout(r, 600));
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      lastSubmitTime.current = now;
      setStatus("Message sent successfully!");
      formRef.current.reset();
      statusResetTimeout.current = setTimeout(() => setStatus("Ready to send"), 4000);
    } catch (error) {
      console.error("EmailJS form submission failed:", error);
      setStatus("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bento-item flex flex-col justify-between flex-1 space-y-3">
      <input
        type="text"
        name="from_name"
        placeholder="Your Name"
        required
        maxLength={100}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground border-none focus:ring-1 focus:ring-primary focus:outline-none transition-colors min-h-[44px] text-sm"
        style={{ fontSize: "16px" }}
        autoComplete="name"
      />
      <input
        type="email"
        name="from_email"
        placeholder="Your Email"
        required
        maxLength={100}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground border-none focus:ring-1 focus:ring-primary focus:outline-none transition-colors min-h-[44px] text-sm"
        style={{ fontSize: "16px" }}
        autoComplete="email"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        rows={4}
        required
        maxLength={1000}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground border-none focus:ring-1 focus:ring-primary focus:outline-none transition-colors resize-none text-sm flex-1"
        style={{ fontSize: "16px" }}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-primary/70 truncate">{status}</p>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 min-h-[44px] whitespace-nowrap"
        >
          <Send size={14} />
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
