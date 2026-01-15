import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, message, visitorData } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        // Extract Server-Side Metrics
        const headers = req.headers;
        const userAgent = headers.get("user-agent") || "Unknown";
        const referer = headers.get("referer") || "Direct";

        // Fallbacks
        const vBrowser = visitorData?.browser || {};
        const vScreen = visitorData?.screen || {};
        const vNetwork = visitorData?.network || {};
        const vConn = vNetwork.connection || {};
        const vContext = visitorData?.context || {};
        const vDevice = visitorData?.device || {};
        const vBattery = visitorData?.battery || {};
        const vGpu = visitorData?.gpu || {};
        const vPerf = visitorData?.performance || {};
        const vFingerprint = visitorData?.fingerprint || {};

        const text = `
📩 *New Contact Message*

👤 *Identity*
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

💬 *Message*
${message}

──────────────────────
🕵️ *ADVANCED TELEMETRY*
──────────────────────

🌍 *Location & Network*
IP: ${vNetwork.ip || "Unknown"}
City: ${vNetwork.city || "Unknown"}, ${vNetwork.region || ""}
Country: ${vNetwork.country_name || "Unknown"}
ISP: ${vNetwork.org || "Unknown"}
Connection: ${vConn.effectiveType ? vConn.effectiveType.toUpperCase() : "Unknown"}
Downlink: ${vConn.downlink ? vConn.downlink + " Mbps" : "?"}

💻 *Device & OS*
Platform: ${vBrowser.platform || "Unknown"}
User Agent: ${userAgent}
Concurrency: ${vDevice.hardwareConcurrency || "?"} cores
Memory: ${vDevice.deviceMemory ? `~${vDevice.deviceMemory} GB` : "Unknown"}
Touch Points: ${vDevice.touchPoints || 0}
GPU: ${vGpu.renderer || "Unknown"}

🌐 *Browser*
Vendor: ${vBrowser.vendor || "Unknown"}
Language: ${vBrowser.language || "Unknown"}
Cookies: ${vBrowser.cookiesEnabled ? "Yes" : "No"}
Do Not Track: ${vBrowser.doNotTrack || "No"}

🖥 *Screen*
Res: ${vScreen.width}x${vScreen.height}
Avail: ${vScreen.availWidth}x${vScreen.availHeight}
Pixel Ratio: ${vScreen.pixelRatio}
Color Depth: ${vScreen.colorDepth}-bit

⚡ *Performance*
Load Time: ${vPerf.loadTime ? Math.round(vPerf.loadTime) + "ms" : "Unknown"}
First Paint: ${vPerf.firstPaint ? Math.round(vPerf.firstPaint) + "ms" : "Unknown"}

🔋 *Battery*
Level: ${vBattery.level || "Unknown"}
Charging: ${vBattery.charging ? "Yes" : "No"}

🕰 *Context*
Timezone: ${vContext.timezone || "Unknown"}
Page: ${vContext.pathname || "Unknown"}
Canvas Hash: \`${vFingerprint.canvasHash || "Unknown"}\`
    `.trim();

        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: "Markdown",
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Telegram API Error:", errorData);
            return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
