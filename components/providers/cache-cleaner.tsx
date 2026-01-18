"use client";

import { useEffect } from "react";

export function CacheCleaner() {
  useEffect(() => {
    const CLEANUP_KEY = "last_cleanup_timestamp";
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

    try {
      const lastCleanup = localStorage.getItem(CLEANUP_KEY);
      const now = Date.now();

      if (!lastCleanup || now - parseInt(lastCleanup, 10) > TWENTY_FOUR_HOURS) {
        // Clear Local Storage
        localStorage.clear();

        // Clear Session Storage
        sessionStorage.clear();

        // Clear Cookies
        document.cookie.split(";").forEach((cookie) => {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });

        // Set new timestamp
        localStorage.setItem(CLEANUP_KEY, now.toString());
        
        console.log("Cache and storage cleared as per 24h policy.");
      }
    } catch (error) {
      console.error("Failed to clear cache/storage:", error);
    }
  }, []);

  return null;
}
