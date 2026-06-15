"use client";

import { useEffect, useState, Suspense } from "react";
import Clarity from "@microsoft/clarity";
import { usePathname, useSearchParams } from "next/navigation";

// Utility to generate random anonymous IDs
function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15);
}

function ClarityTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [initialized, setInitialized] = useState(false);
  const [userId, setUserId] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    
    if (projectId && !initialized) {
      // 1. Initialize API
      Clarity.init(projectId);
      
      // 2. Cookie Consent API
      Clarity.consentV2(); 
      
      // Generate anonymous IDs
      const uid = generateId();
      const sid = generateId();
      setUserId(uid);
      setSessionId(sid);

      setInitialized(true);

      // 6. Upgrade Session API
      // Upgrade session to prioritize recording if the user interacts with the page
      const handleInteraction = () => {
        Clarity.upgrade("user_interaction");
      };
      
      // Listen for the first click interaction to upgrade the session recording priority
      document.addEventListener("click", handleInteraction, { once: true });
      return () => document.removeEventListener("click", handleInteraction);
    }
  }, [initialized]);

  // Track page views and set tags on route changes
  useEffect(() => {
    if (initialized && pathname && userId) {
      // 3. Custom Tags API
      Clarity.setTag("page_path", pathname);
      
      // 4. Custom Events API
      Clarity.event("page_view");
      
      // 5. Identify API
      // Recommended by docs: "Identify API should be called for each page of the website"
      Clarity.identify(userId, sessionId, pathname, "anonymous_visitor");
      
      // Optional extra tags
      if (searchParams.has("utm_source")) {
        Clarity.setTag("utm_source", searchParams.get("utm_source") as string);
      }
    }
  }, [pathname, searchParams, initialized, userId, sessionId]);

  return null;
}

export function ClarityAnalytics() {
  return (
    <Suspense fallback={null}>
      <ClarityTracker />
    </Suspense>
  );
}
