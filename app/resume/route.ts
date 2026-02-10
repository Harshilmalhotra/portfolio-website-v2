import { NextResponse } from "next/server";

export async function GET() {
  const fileId = "13aGt6YEz7HTIpjVivP7sAbLaIk0m06hS";
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return new NextResponse("Failed to fetch resume", { status: response.status });
    }

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set("Content-Disposition", 'inline; filename="resume.pdf"');
    headers.set("Cache-Control", "public, max-age=3600, must-revalidate");

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
