"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchTip() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeen, setHasSeen] = useState(true); // Default to true to prevent flash
  const [isBlinking, setIsBlinking] = useState(true);
  
  const MotionButton = motion(Button);

  const playSound = () => {
    // Check if sounds are muted via env flag
    if (process.env.NEXT_PUBLIC_MUTE_SOUNDS === "true") return;

    try {
        const audio = new Audio("/airplane-chime.mp3");
        audio.volume = 1;
        audio.play().catch(() => {
           
        });
    } catch (e) {
        console.error("Audio play failed", e);
    }
  };

  useEffect(() => {
    // Check local storage on mount
    const seen = localStorage.getItem("hasSeenSearchTip");
    if (!seen) {
        setHasSeen(false);
        // Delay appearance
        const timer = setTimeout(() => {
            setIsVisible(true);
            playSound();
        }, 4000);
        return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenSearchTip", "true");
  };

  const handleOpenSearch = () => {
     const searchTrigger = document.getElementById("search-trigger");
     if (searchTrigger) {
         searchTrigger.click();
         handleDismiss();
     }
  }

  if (hasSeen) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="fixed top-24 right-4 z-50 flex items-center gap-2 "
        >
          <div className="relative group">
              <MotionButton
                variant="outline"
                size="icon"
                className={`rounded-full bg-background/80 backdrop-blur-sm transition-all h-14 w-14 ${!isBlinking ? "animate-pulse-slow border-yellow-500/50 hover:border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.6)]" : "border-yellow-500"}`}
                onClick={handleOpenSearch}
                animate={isBlinking ? {
                    boxShadow: [
                        "0 0 20px rgba(234,179,8,0.6)", // yellow
                        "0 0 50px rgba(249,115,22,0.9)", // orange
                        "0 0 20px rgba(234,179,8,0.6)", // yellow
                        "0 0 50px rgba(249,115,22,0.9)", // orange
                        "0 0 20px rgba(234,179,8,0.6)"  // yellow
                    ],
                    borderColor: [
                        "rgba(234,179,8,0.5)",
                        "rgba(249,115,22,1)",
                        "rgba(234,179,8,0.5)",
                        "rgba(249,115,22,1)",
                        "rgba(234,179,8,0.5)"
                    ],
                    backgroundColor: [
                        "rgba(var(--background), 0.8)", // default
                        "rgba(249,115,22,0.2)", // orange tint
                        "rgba(var(--background), 0.8)", // default
                        "rgba(249,115,22,0.2)", // orange tint
                        "rgba(var(--background), 0.8)"  // default
                    ]
                } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
                onAnimationComplete={() => setIsBlinking(false)}
              >
                <Lightbulb className="h-7 w-7 text-yellow-500 fill-yellow-500/20" />
                <span className="sr-only">Search Tip</span>
              </MotionButton>
              
              <Button
                variant="ghost" 
                size="icon"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss();
                }}
              >
                  <X className="h-3 w-3" />
              </Button>

            <div className="absolute top-full right-0 mt-3 w-max max-w-[200px] p-3 rounded-lg border bg-popover text-popover-foreground shadow-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none origin-top-right text-xs">
                <p className="font-medium mb-1">Pro Tip:</p>
                <p className="text-muted-foreground">
                    Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">Cmd K</kbd> or type "find" to search instantly.
                </p>
                {/* Triangle arrow */}
                <div className="absolute -top-1 right-4 w-2 h-2 bg-popover border-t border-l transform rotate-45"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}