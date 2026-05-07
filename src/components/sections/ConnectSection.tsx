import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Linkedin, Github, Twitter, PenTool, Facebook, Instagram,
  ExternalLink, MessageCircle
} from "lucide-react";
import DiscordCard from "../contact/DiscordCard";
import SpotifyCard from "../contact/SpotifyCard";
import ResumeCard from "../contact/ResumeCard";
import ContactForm from "../contact/ContactForm";

const primaryNodes = [
  { icon: Linkedin, label: "Professional Network", href: "https://www.linkedin.com/in/tashkirrr/", color: "from-blue-500 to-blue-700" },
  { icon: Github, label: "Source Code & Repos", href: "https://github.com/tashkirrr", color: "from-gray-400 to-gray-600" },
  { icon: Twitter, label: "Technical Updates", href: "https://x.com/STashkir", color: "from-sky-400 to-sky-600" },
  { icon: PenTool, label: "Technical Writing", href: "https://medium.com/@tashkir2006", color: "from-green-400 to-green-600" },
];

const socialGrid = [
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/shahriyar.tashkir/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/tashkirrr" },
  { icon: MessageCircle, label: "Reddit", href: "https://www.reddit.com/user/Awkward-Effective410/" },
];

const ConnectSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl text-foreground mb-2">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-12">Let's connect and build something together.</p>
        </motion.div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Column 1: Primary Technical Nodes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full flex flex-col"
          >
            <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Professional</h3>
            <div className="flex flex-col flex-1 gap-4">
              {primaryNodes.map((node) => (
                <a
                  key={node.label}
                  href={node.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-item flex items-center gap-4 group cursor-pointer flex-1 min-h-[48px]"
                >
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${node.color} text-white`}>
                  <node.icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-foreground text-sm font-semibold">{node.label}</p>
                </div>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Social + Special */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full flex flex-col"
          >
            <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Social</h3>
            <div className="flex flex-col flex-1 gap-4">
              {socialGrid.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-item flex items-center gap-4 group cursor-pointer flex-1 min-h-[48px]"
                >
                <s.icon size={20} className="text-primary" />
                <span className="text-foreground text-sm font-semibold flex-1">{s.label}</span>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
              <DiscordCard />
              <SpotifyCard />
              <ResumeCard />
            </div>
          </motion.div>

          {/* Column 3: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-1 h-full flex flex-col"
          >
            <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Send a Message</h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
