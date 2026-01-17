"use client";
import { useState, useEffect } from "react";

export interface VisitorData {
    browser: any;
    device: any;
    screen: any;
    battery: any;
    network: any;
    context: any;
    gpu: any;
    performance: any;
    fingerprint: any;
}

export function useVisitorData() {
    const [data, setData] = useState<VisitorData | null>(null);

    useEffect(() => {
        const collectData = async () => {
            // --- Browser ---
            const browserData = {
                userAgent: navigator.userAgent,
                language: navigator.language,
                cookiesEnabled: navigator.cookieEnabled,
                doNotTrack: navigator.doNotTrack,
                platform: navigator.platform,
                vendor: navigator.vendor,
                maxTouchPoints: navigator.maxTouchPoints,
                pdfViewerEnabled: (navigator as any).pdfViewerEnabled,
            };

            // --- Screen ---
            const screenData = {
                width: window.screen.width,
                height: window.screen.height,
                availWidth: window.screen.availWidth,
                availHeight: window.screen.availHeight,
                colorDepth: window.screen.colorDepth,
                pixelRatio: window.devicePixelRatio,
                orientation: window.screen.orientation ? window.screen.orientation.type : "unknown",
            };

            // --- Battery ---
            let batteryData = {};
            if ((navigator as any).getBattery) {
                try {
                    const battery: any = await (navigator as any).getBattery();
                    batteryData = {
                        level: (battery.level * 100).toFixed(0) + "%",
                        charging: battery.charging,
                        chargingTime: battery.chargingTime,
                        dischargingTime: battery.dischargingTime,
                    };
                } catch (e) {
                    // ignore
                }
            }

            // --- Network (IP - Client Side) ---
            let networkData: any = {};
            const IP_CACHE_KEY = 'user_ip_data';
            const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

            try {
                const cached = localStorage.getItem(IP_CACHE_KEY);
                const now = Date.now();
                let shouldUseCache = false;

                if (cached) {
                    try {
                        const parsed = JSON.parse(cached);
                        if (parsed && parsed.timestamp && (now - parsed.timestamp < CACHE_DURATION)) {
                            networkData = parsed.data;
                            shouldUseCache = true;
                        }
                    } catch (err) {
                        // invalid cache
                    }
                }

                if (!shouldUseCache) {
                    const res = await fetch("https://ipapi.co/json/");
                    if (res.ok) {
                        networkData = await res.json();
                        try {
                            localStorage.setItem(IP_CACHE_KEY, JSON.stringify({
                                timestamp: now,
                                data: networkData
                            }));
                        } catch (e) {
                            // storage quota exceeded or other error
                        }
                    }
                }
            } catch (e) {
                // ignore fetch errors
            }

            // --- Network (Connection API) ---
            const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
            if (conn) {
                networkData.connection = {
                    effectiveType: conn.effectiveType,
                    downlink: conn.downlink,
                    rtt: conn.rtt,
                    saveData: conn.saveData,
                    type: conn.type,
                };
            }

            // --- GPU ---
            let gpuData = {};
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (gl) {
                    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
                    if (debugInfo) {
                        gpuData = {
                            vendor: (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                            renderer: (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
                        };
                    }
                }
            } catch (e) {
                // ignore
            }

            // --- Performance ---
            let perfData: any = {};
            if (window.performance) {
                const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
                if (navEntry) {
                    perfData = {
                        loadTime: navEntry.loadEventEnd - navEntry.startTime,
                        domReady: navEntry.domContentLoadedEventEnd - navEntry.startTime,
                        firstPaint: 0,
                    };
                }
                const paint = performance.getEntriesByType("paint");
                const fp = paint.find(p => p.name === "first-paint");
                if (fp) perfData.firstPaint = fp.startTime;
            }

            // --- Fingerprint (Canvas Hash) ---
            let fingerprint = "";
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.textBaseline = "top";
                    ctx.font = "14px 'Arial'";
                    ctx.textBaseline = "alphabetic";
                    ctx.fillStyle = "#f60";
                    ctx.fillRect(125, 1, 62, 20);
                    ctx.fillStyle = "#069";
                    ctx.fillText("Hello World", 2, 15);
                    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
                    ctx.fillText("Hello World", 4, 17);
                    const dataUrl = canvas.toDataURL();
                    // Simple hash function
                    let hash = 0;
                    for (let i = 0; i < dataUrl.length; i++) {
                        const char = dataUrl.charCodeAt(i);
                        hash = ((hash << 5) - hash) + char;
                        hash = hash & hash;
                    }
                    fingerprint = hash.toString();
                }
            } catch (e) {
                // ignore
            }


            // --- Context ---
            const contextData = {
                pathname: window.location.pathname,
                referrer: document.referrer,
                timestamp: new Date().toISOString(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            };

            setData({
                browser: browserData,
                device: {
                    hardwareConcurrency: navigator.hardwareConcurrency,
                    deviceMemory: (navigator as any).deviceMemory,
                    touchPoints: navigator.maxTouchPoints,
                },
                screen: screenData,
                battery: batteryData,
                network: networkData,
                context: contextData,
                gpu: gpuData,
                performance: perfData,
                fingerprint: { canvasHash: fingerprint },
            });
        };

        collectData();
    }, []);

    return data;
}
