import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({
  title = "Md. Shahriyar Tashkir | Cyber Portfolio",
  description = "Creative Developer & Technical Designer specializing in building immersive digital experiences. Explore my journey, projects, and technical toolkit.",
  keywords = "Shahriyar Tashkir, Developer Portfolio, React Developer, UI/UX Designer, Cyber Portfolio, Software Engineer Bangladesh",
  image = "https://i.postimg.cc/024RWhmB/icon.png",
  url = "https://tashkirrr.github.io/Md.Shahriyar.Tashkir/"
}: SEOProps) => {
  useEffect(() => {
    document.title = title;
    
    const updateMeta = (name: string, content: string, attr: string = "name") => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMeta("description", description);
    updateMeta("keywords", keywords);
    
    // OpenGraph
    updateMeta("og:title", title, "property");
    updateMeta("og:description", description, "property");
    updateMeta("og:image", image, "property");
    updateMeta("og:url", url, "property");
    updateMeta("og:type", "website", "property");
    
    // Twitter
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", image);
  }, [title, description, keywords, image, url]);

  return null;
};

export default SEO;
