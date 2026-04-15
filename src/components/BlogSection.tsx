import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ExternalLink, BookOpen, ArrowRight, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  content: string;
}

const BLOG_POSTS_PER_PAGE = 9;

const BlogSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [lastSynced, setLastSynced] = useState<string>("Loading...");

  const fetchPosts = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
    
    try {
      const res = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@tashkir2006",
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      
      if (data.status === "ok" && data.items) {
        const mapped: MediumPost[] = data.items.map((item: Record<string, unknown>) => {
          const title = String(item.title ?? "");
          const link = String(item.link ?? "");
          const pubDateString = String(item.pubDate ?? "");
          const descriptionHtml = String(item.description ?? "");
          const imgMatch = descriptionHtml.match(/<img[^>]+src="([^"><]+)"/);

          return {
            title,
            link,
            pubDate: new Date(pubDateString).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            description: descriptionHtml.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
            thumbnail: imgMatch?.[1] || "",
            content: String(item.content ?? item.description ?? ""),
          };
        });
        setPosts(mapped);
        setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.error("Failed to fetch Medium posts:", err);
      setPosts([]); // Show empty state on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    const pollInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchPosts();
      }
    }, 30000); // 30s sync
    return () => clearInterval(pollInterval);
  }, [fetchPosts]);

  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_POSTS_PER_PAGE));
  const pagedPosts = posts.slice(page * BLOG_POSTS_PER_PAGE, (page + 1) * BLOG_POSTS_PER_PAGE);

  return (
    <section id="blog" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="heading-display text-3xl sm:text-4xl text-foreground mb-2">
                Latest <span className="text-gradient">Articles</span>
              </h2>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                Page {page + 1} of {totalPages} • Last updated: {lastSynced}
              </p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bento-item animate-pulse">
                <div className="h-40 bg-secondary rounded-lg mb-4" />
                <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
                <div className="h-3 bg-secondary rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pagedPosts.map((post, i) => (
              <motion.div
                key={post.link}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bento-item group cursor-pointer min-h-[160px] flex flex-col"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                {post.thumbnail && (
                  <div className="h-40 rounded-lg overflow-hidden mb-4 bg-secondary">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-foreground text-sm leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <Maximize2 size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                </div>
                <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{post.description}</p>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <p className="text-xs text-primary/60">{post.pubDate}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more <ArrowRight size={12} />
                  </span>
                </div>

                {/* Inline Expanded Content */}
                <AnimatePresence>
                  {expandedIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-border">
                        <div
                          className="prose prose-invert prose-sm max-h-[60vh] overflow-y-auto text-foreground/80 text-xs leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
                          <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs min-h-[44px]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Open on Medium <ExternalLink size={12} />
                          </a>
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpandedIndex(null); }}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary text-foreground text-xs min-h-[44px]"
                          >
                            <X size={12} /> Close
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </motion.div>
          ))}
          </div>
        ) : (
          <div className="text-center py-12 bento-item">
            <BookOpen size={28} className="text-primary mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              No recent articles found. Check out my full profile on <a href="https://medium.com/@tashkir2006" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Medium</a>.
            </p>
          </div>
        )}
        
        {/* Pagination Navigation */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 mt-16">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Previous page"
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 disabled:opacity-20 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center bg-secondary/30 p-1 rounded-xl border border-border/50">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all relative overflow-hidden ${
                      page === i
                        ? "text-primary-foreground font-bold shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                        : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {page === i && (
                      <motion.div
                        layoutId="active-blog-page"
                        className="absolute inset-0 bg-primary z-[-1]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                aria-label="Next page"
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 disabled:opacity-20 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center group"
              >
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-10">
          <motion.a
            href="https://medium.com/@tashkir2006"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-shadow hover:shadow-lg hover:shadow-primary/25 min-h-[44px]"
          >
            View All Articles <ArrowRight size={14} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
