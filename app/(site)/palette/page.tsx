"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ColorDefinition = {
  name: string;
  variable: string;
  tailwindClass: string;
  group: string;
};

const colors: ColorDefinition[] = [
  // Background & Foreground
  { name: "Background", variable: "--background", tailwindClass: "bg-background", group: "Base" },
  { name: "Foreground", variable: "--foreground", tailwindClass: "bg-foreground", group: "Base" },

  // Primary
  { name: "Primary", variable: "--primary", tailwindClass: "bg-primary", group: "Primary" },
  { name: "Primary Foreground", variable: "--primary-foreground", tailwindClass: "bg-primary-foreground", group: "Primary" },
  { name: "Primary Hover", variable: "--primary-hover", tailwindClass: "bg-primary/90", group: "Primary" }, // Note: primary-hover isn't a direct utility user typically uses as bg-primary-hover, often just hover state, but I'll list it. Actually config has 'hover' under primary, so it is 'bg-primary-hover'

  // Muted
  { name: "Muted", variable: "--muted", tailwindClass: "bg-muted", group: "Muted" },
  { name: "Muted Foreground", variable: "--muted-foreground", tailwindClass: "bg-muted-foreground", group: "Muted" },

  // Accent
  { name: "Accent", variable: "--accent", tailwindClass: "bg-accent", group: "Accent" },
  { name: "Accent Foreground", variable: "--accent-foreground", tailwindClass: "bg-accent-foreground", group: "Accent" },

  // Border
  { name: "Border", variable: "--border", tailwindClass: "bg-border", group: "Border" },
];

export default function PalettePage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const ColorCard = ({ color }: { color: ColorDefinition }) => {
    return (
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "group relative h-32 w-full rounded-xl border shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center",
            color.tailwindClass.startsWith("bg-primary-hover")
              ? "bg-[hsl(var(--primary-hover))]"
              : color.tailwindClass
          )}
          onClick={() => copyToClipboard(color.tailwindClass)}
        >
          {/* Tooltip-like overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-xl backdrop-blur-[2px]">
            <span className="text-white font-medium drop-shadow-md flex items-center gap-2">
              {copied === color.tailwindClass ? (
                <Check size={20} />
              ) : (
                <Copy size={20} />
              )}
              {copied === color.tailwindClass ? "Copied!" : "Copy Class"}
            </span>
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">{color.name}</h3>
          <p className="text-sm text-muted-foreground code font-mono">
            {color.tailwindClass}
          </p>
          <p className="text-xs text-muted-foreground/60 font-mono mt-1">
            {color.variable}
          </p>
        </div>
      </div>
    );
  };

  // Group colors
  const groupedColors = colors.reduce((acc, color) => {
    if (!acc[color.group]) acc[color.group] = [];
    acc[color.group].push(color);
    return acc;
  }, {} as Record<string, ColorDefinition[]>);

  return (
    // Wrap in a div that handles the dark class and background colors
    <div className={cn("min-h-screen transition-colors duration-300", isDark ? "dark bg-background text-foreground" : "bg-background text-foreground")}>
      <div className="container mx-auto px-8 py-24">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">Design System Palette</h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-muted transition-colors border"
            aria-label="Toggle theme"
          >
            {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
        
        <p className="text-muted-foreground mb-12">
          A comprehensive guide to the color palette used across the portfolio.
          Click on any color swatch to copy its Tailwind CSS class name.
        </p>

        <div className="space-y-16">
          {Object.entries(groupedColors).map(([group, groupColors]) => (
            <div key={group}>
              <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
                {group}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {groupColors.map((color) => (
                  <ColorCard key={color.name} color={color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
