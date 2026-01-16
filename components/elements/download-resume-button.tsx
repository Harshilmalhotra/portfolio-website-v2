"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function DownloadResumeButton() {
    const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        // Google Drive File ID
        const fileId = "13aGt6YEz7HTIpjVivP7sAbLaIk0m06hS";
        
        // 1. Open in new tab (View)
        const viewUrl = `https://drive.google.com/file/d/${fileId}/view`;
        window.open(viewUrl, "_blank", "noopener,noreferrer");

        // 2. Trigger Download (Direct)
        // using a hidden iframe or link click is safer than window.location to strictly avoid navigation
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "Harshil_Malhotra_Resume.pdf"; // Suggest a filename
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
