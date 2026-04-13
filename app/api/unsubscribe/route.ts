import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { COMPANY_NAME } from "@/lib/constants";

/**
 * GET /api/unsubscribe?email=xxx
 * One-click unsubscribe from deal emails.
 * Linked from the footer of all promotional emails.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  if (!email) {
    return new NextResponse("Invalid unsubscribe link.", { status: 400 });
  }

  try {
    await prisma.user.updateMany({
      where: { email },
      data:  { dealSubscription: false },
    });
  } catch {
    // Silently ignore — user may not exist
  }

  // Return a simple confirmation page
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unsubscribed — ${COMPANY_NAME}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #F0EDE8; margin: 0; padding: 40px 16px; text-align: center; color: #1B2847; }
    .card { max-width: 480px; margin: 40px auto; background: #fff; border-radius: 12px; padding: 48px 36px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    h1 { font-size: 24px; margin: 0 0 12px; }
    p { font-size: 15px; color: #7A746D; line-height: 1.6; margin: 0 0 24px; }
    a { color: #C41230; font-weight: 600; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <div style="font-size:48px;margin-bottom:16px;">✓</div>
    <h1>You've been unsubscribed</h1>
    <p>You'll no longer receive promotional deal emails from ${COMPANY_NAME}.<br />You can re-subscribe at any time from your account settings.</p>
    <a href="${base}">Return to ${COMPANY_NAME}</a>
  </div>
</body>
</html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
