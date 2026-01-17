import { google } from "googleapis";

export async function submitToIndexNow(urls: string[]) {
  const BATCH_SIZE = 10000;
  const batches: string[][] = [];
  
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  for (const batch of batches) {
    try {
      const response = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          host: "harshilm.vercel.app",
          key: process.env.INDEXNOW_KEY,
          keyLocation: `https://harshilm.vercel.app/${process.env.INDEXNOW_KEY}.txt`,
          urlList: batch,
        }),
      });

      if (!response.ok) {
        console.error("IndexNow submission failed:", response.statusText);
      } else {
        console.log(`IndexNow submitted ${batch.length} URLs`);
      }
    } catch (error) {
      console.error("IndexNow error:", error);
    }
  }
}

export async function submitToGoogleIndexing(
  urls: string[],
  operation: "URL_UPDATED" | "URL_DELETED"
) {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    console.warn("Missing GOOGLE_SERVICE_ACCOUNT_JSON env var");
    return;
  }

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    const jwtClient = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    await jwtClient.authorize();

    const indexing = google.indexing({
      version: "v3",
      auth: jwtClient,
    });

    // Process sequentially to avoid quota limits
    for (const url of urls) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: operation,
          },
        });
        console.log(`Google Indexing API submitted (${operation}): ${url}`);
      } catch (err: any) {
         console.error(`Google Indexing API failed for ${url}:`, err.message);
      }
    }
  } catch (error) {
    console.error("Google Indexing API error:", error);
  }
}
