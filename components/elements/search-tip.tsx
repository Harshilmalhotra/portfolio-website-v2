"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchTip() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeen, setHasSeen] = useState(true); // Default to true to prevent flash

  useEffect(() => {
    // Check local storage on mount
    const seen = localStorage.getItem("hasSeenSearchTip");
    if (!seen) {
        setHasSeen(false);
        // Delay appearance
        const timer = setTimeout(() => {
            setIsVisible(true);
            // Play sound
            try {
                const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"); // Short placeholder, will replace with real pop
                // actually, let's use a real short pleasant pop sound base64
                const popSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
                popSound.volume = 0.5;
                popSound.play().catch(e => console.log("Audio play failed (user interaction needed first)", e));
            } catch (e) {
                console.error(e);
            }
        }, 2000);
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
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-24 right-4 z-50 flex items-center gap-2 "
        >
          <div className="relative group">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full shadow-[0_0_20px_rgba(234,179,8,0.6)] bg-background/80 backdrop-blur-sm border-yellow-500/50 hover:border-yellow-500 transition-all h-12 w-12 animate-pulse-slow"
                onClick={handleOpenSearch}
              >
                <Lightbulb className="h-6 w-6 text-yellow-500 fill-yellow-500/20" />
                <span className="sr-only">Search Tip</span>
              </Button>
              
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
