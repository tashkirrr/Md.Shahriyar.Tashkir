import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Code2, Star, GitFork, ExternalLink, Palette, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

const langColors: Record<string, string> = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-400",
  HTML: "bg-orange-400",
  CSS: "bg-purple-400",
  Java: "bg-red-400",
  "C++": "bg-pink-400",
  C: "bg-gray-400",
  Shell: "bg-lime-400",
};

const PROJECTS_PER_PAGE = 9;

const ProjectsSection = () => {
  const ref = useRef(null);
  const sectionInView = useInView(ref, { once: true, margin: "-50px" });
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); 
    
    try {
      // Fetch more repos to support pagination (max 100 per page)
      const response = await fetch(
        "https://api.github.com/users/tashkirrr/repos?sort=updated&per_page=100",
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setRepos(data);
      }
    } catch (error) {
      console.error("GitHub API Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const totalPages = Math.ceil(repos.length / PROJECTS_PER_PAGE);
  const paginatedRepos = repos.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("projects");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="heading-display text-3xl sm:text-4xl text-foreground mb-2">
              All <span className="text-gradient">Projects</span>
            </h2>
            <p className="font-medium text-[10px] sm:text-xs text-muted-foreground">
              A comprehensive archive of my work on GitHub
            </p>
          </div>
          <a 
            href="https://github.com/tashkirrr?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-xs text-primary hover:text-accent transition-colors flex items-center gap-2 group"
          >
            View profile on GitHub
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <a
          href="https://drive.google.com/drive/folders/19dQKjjD0GSYWCXmZmXmmL5MftLMdJJL0?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="bento-item group cursor-pointer block mb-6 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">Pinned / Design</span>
            <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Palette size={28} className="text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground text-lg">Visual Storytelling Suite</h3>
              <p className="text-muted-foreground text-sm mt-1">4+ years of professional design work — branding, UI/UX, marketing collateral.</p>
            </div>
          </div>
        </a>

        {/* Repos Grid */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {loading
                ? Array.from({ length: PROJECTS_PER_PAGE }).map((_, i) => (
                    <div key={i} className="bento-item space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))
                : paginatedRepos.map((repo) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bento-item group cursor-pointer flex flex-col min-h-[160px] relative transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded bg-secondary group-hover:bg-primary/10 transition-colors">
                            <Code2 size={14} className="text-primary" />
                          </div>
                          <h3 className="font-display font-semibold text-foreground text-sm truncate max-w-[150px]">{repo.name}</h3>
                        </div>
                        <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-muted-foreground text-xs line-clamp-2 mb-6 font-sans leading-relaxed">
                        {repo.description || "A project I'm working on."}
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        {repo.language && (
                          <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground font-medium">
                            <span className={`w-2 h-2 rounded-full ${langColors[repo.language] || "bg-muted-foreground"} shadow-sm`} />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-3 ml-auto">
                          {repo.stargazers_count > 0 && (
                            <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                              <Star size={10} className="text-yellow-500/70" /> {repo.stargazers_count}
                            </span>
                          )}
                          {repo.forks_count > 0 && (
                            <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                              <GitFork size={10} className="text-blue-500/70" /> {repo.forks_count}
                            </span>
                          )}
                        </span>
                      </div>

                      {/* "See More" Hover Overlay */}
                      <div className="absolute inset-0 bg-primary/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="bg-background/90 border border-primary/30 px-3 py-1.5 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <span className="text-[10px] font-medium text-primary font-bold">See More</span>
                          <ArrowRight size={14} className="text-primary" />
                        </div>
                      </div>
                    </motion.a>
                  ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
                  currentPage === i + 1
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
