import { Download } from "lucide-react";

const ResumeCard = () => {
  return (
    <a
      href="resume.html"
      target="_blank"
      rel="noopener noreferrer"
      className="bento-item flex flex-col justify-center cursor-pointer group flex-1 min-h-[48px]"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-primary/20 text-primary">
          <Download size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-foreground text-sm font-semibold">Download Resume</p>
          <p className="text-muted-foreground text-xs mt-1">
            Get my full CV in PDF format
          </p>
        </div>
      </div>
    </a>
  );
};

export default ResumeCard;
