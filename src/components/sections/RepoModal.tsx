import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Star, GitFork, Calendar, Code2 } from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at?: string;
  topics?: string[];
}

interface RepoModalProps {
  repo: GitHubRepo | null;
  onClose: () => void;
}

const RepoModal = ({ repo, onClose }: RepoModalProps) => {
  if (!repo) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header Image / Pattern */}
          <div className="h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background text-foreground transition-colors z-10"
            >
              <X size={18} />
            </button>
            <div className="absolute -bottom-6 left-8 p-4 rounded-xl bg-card border border-border shadow-lg">
              <Code2 size={32} className="text-primary" />
            </div>
          </div>

          <div className="p-8 pt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground">{repo.name}</h3>
                {repo.language && (
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-2 inline-block">
                    {repo.language}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Star size={16} className="text-yellow-500" />
                  <span className="text-sm font-semibold">{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <GitFork size={16} className="text-blue-500" />
                  <span className="text-sm font-semibold">{repo.forks_count}</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {repo.description || "This project is a testament to technical exploration and problem-solving. It demonstrates the use of modern development practices and a commitment to building clean, efficient code."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Calendar size={14} />
                  <span className="text-[10px] uppercase tracking-wider font-bold">Last Updated</span>
                </div>
                <p className="text-sm font-semibold">
                  {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : "Recently"}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <ExternalLink size={14} />
                  <span className="text-[10px] uppercase tracking-wider font-bold">Source</span>
                </div>
                <p className="text-sm font-semibold">GitHub Repository</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-border hover:bg-secondary transition-colors text-sm font-semibold"
              >
                Close
              </button>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all text-sm font-bold flex items-center gap-2"
              >
                View on GitHub
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RepoModal;
