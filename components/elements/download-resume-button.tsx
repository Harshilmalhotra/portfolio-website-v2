"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function DownloadResumeButton() {
    const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        // Use local file to avoid firewall restrictions
        const resumeUrl = "/resume";
        
        // 1. Open in new tab (View)
        window.open(resumeUrl, "_blank", "noopener,noreferrer");

        // 2. Trigger Download (Direct)
        const link = document.createElement("a");
        link.href = resumeUrl;
        link.download = "Harshil_Malhotra_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button onClick={handleDownload} className="w-fit rounded-full">
            <Download className="mr-2" /> Download CV
        </Button>
    );
}
