import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // TODO: Integrate an actual email service (Resend, SendGrid, etc.) here
    console.log("Contact form submission:", { name, email, message });

    // Simulate backend processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
