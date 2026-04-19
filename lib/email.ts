import nodemailer from "nodemailer";
import { COMPANY_NAME, COMPANY_EMAIL } from "./constants";

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to:      string;
  subject: string;
  html:    string;
  text?:   string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const from = process.env.SMTP_FROM ?? COMPANY_EMAIL;
  return transporter.sendMail({
    from:       `"${COMPANY_NAME}" <${from}>`,
    replyTo:    from,
    to,
    subject,
    html,
    // Always include plain-text fallback — spam filters penalise HTML-only emails
    text: text ?? html.replace(/<[^>]+>/g, " ").replace(/\s{2,}/g, " ").trim(),
    headers: {
      "X-Mailer":        "GoTripJapan Mailer",
      "X-Priority":      "3",
      "Precedence":      "bulk",
      "List-Unsubscribe": `<mailto:${from}?subject=unsubscribe>`,
    },
  });
}

// ─── Shared base ─────────────────────────────────────────────────────────────

function baseTemplate({
  previewText,
  headerLabel,
  body,
}: {
  previewText: string;
  headerLabel: string;
  body: string;
}): string {
  const year = new Date().getFullYear();
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>${previewText}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#F0EDE8;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
  <!-- Preview text (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${previewText}&nbsp;&#8199;&#65279;&#847;&zwnj;&nbsp;&#8199;&#65279;&#847;&zwnj;</div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F0EDE8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Top accent bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(to right,#C41230,#C8A84B,#1B2847);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background-color:#1B2847;padding:36px 40px 28px;text-align:center;">
              <!-- Wordmark -->
              <div style="display:inline-block;border:2px solid rgba(200,168,75,0.6);border-radius:8px;padding:8px 20px;margin-bottom:16px;">
                <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#C8A84B;letter-spacing:3px;text-transform:uppercase;">${COMPANY_NAME}</span>
              </div>
              <!-- Label pill -->
              <div style="display:inline-block;background-color:#C41230;color:#ffffff;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:5px 16px;border-radius:20px;">${headerLabel}</div>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:2px;background:linear-gradient(to right,transparent,#C8A84B,transparent);"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 28px;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F8F7F5;padding:24px 40px;border-top:1px solid #E4E0D9;text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;color:#7A746D;">Questions? Reply to this email or contact us at</p>
              <a href="mailto:${COMPANY_EMAIL}" style="color:#C41230;font-size:13px;font-weight:600;text-decoration:none;">${COMPANY_EMAIL}</a>
              <p style="margin:16px 0 0;font-size:11px;color:#A8A29E;">&copy; ${year} ${COMPANY_NAME}. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── Row helper ───────────────────────────────────────────────────────────────

function detailRow(label: string, value: string): string {
  return `
  <tr>
    <td style="padding:11px 0;border-bottom:1px solid #F0EDE8;font-size:13px;color:#7A746D;width:45%;">${label}</td>
    <td style="padding:11px 0;border-bottom:1px solid #F0EDE8;font-size:14px;font-weight:600;color:#1B2847;text-align:right;">${value}</td>
  </tr>`;
}

// ─── CTA button helper ────────────────────────────────────────────────────────

function ctaButton(label: string, url: string): string {
  return `
  <table cellpadding="0" cellspacing="0" border="0" style="margin:28px auto 0;">
    <tr>
      <td style="background-color:#C41230;border-radius:8px;">
        <a href="${url}" style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.5px;">${label}</a>
      </td>
    </tr>
  </table>`;
}

// ─── 1. Email verification ────────────────────────────────────────────────────

export function emailVerificationHtml(data: {
  name:      string;
  verifyUrl: string;
}): string {
  const body = `
    <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1B2847;font-family:Georgia,'Times New Roman',serif;">Welcome, ${data.name}!</p>
    <p style="margin:0 0 24px;font-size:15px;color:#4A4540;line-height:1.7;">
      Thank you for creating an account with ${COMPANY_NAME}. To activate your account and start exploring our tours, please verify your email address.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F8F7F5;border-radius:10px;border:1px solid #E4E0D9;padding:0;">
      <tr>
        <td style="padding:24px 28px;text-align:center;">
          <p style="margin:0 0 6px;font-size:13px;color:#7A746D;letter-spacing:0.5px;text-transform:uppercase;">Your verification link expires in</p>
          <p style="margin:0;font-size:28px;font-weight:700;color:#C41230;">24 hours</p>
        </td>
      </tr>
    </table>

    ${ctaButton("Verify My Email Address", data.verifyUrl)}

    <p style="margin:28px 0 0;font-size:13px;color:#7A746D;line-height:1.6;">
      If the button above doesn't work, copy and paste this link into your browser:<br />
      <a href="${data.verifyUrl}" style="color:#C41230;word-break:break-all;">${data.verifyUrl}</a>
    </p>
    <p style="margin:20px 0 0;font-size:13px;color:#A8A29E;">If you didn't create an account, you can safely ignore this email.</p>
  `;

  return baseTemplate({
    previewText: `${data.name}, please verify your email to activate your ${COMPANY_NAME} account`,
    headerLabel: "Verify Your Email",
    body,
  });
}

// ─── 2. Booking confirmation ──────────────────────────────────────────────────

export function bookingConfirmationHtml(data: {
  customerName:  string;
  bookingRef:    string;
  tourTitle:     string;
  tourDate:      string;
  numGuests:     number;
  totalAmount:   string;
  paymentMethod: string;
}): string {
  const body = `
    <p style="margin:0 0 6px;font-size:22px;font-weight:700;color:#1B2847;font-family:Georgia,'Times New Roman',serif;">Your adventure awaits!</p>
    <p style="margin:0 0 24px;font-size:15px;color:#4A4540;line-height:1.7;">
      Dear ${data.customerName}, your booking is <strong style="color:#1B7849;">confirmed</strong>. We look forward to welcoming you on this journey through Japan.
    </p>

    <!-- Status badge -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#1B2847,#2A3B66);border-radius:10px;margin-bottom:24px;">
      <tr>
        <td style="padding:20px 28px;">
          <p style="margin:0 0 2px;font-size:11px;color:rgba(200,168,75,0.9);letter-spacing:2px;text-transform:uppercase;">Booking Reference</p>
          <p style="margin:0;font-size:24px;font-weight:700;color:#C8A84B;letter-spacing:2px;">${data.bookingRef}</p>
        </td>
        <td style="padding:20px 28px;text-align:right;">
          <div style="display:inline-block;background-color:#1B7849;color:#ffffff;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:6px 14px;border-radius:20px;">&#10003; Confirmed</div>
        </td>
      </tr>
    </table>

    <!-- Detail rows -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      ${detailRow("Tour", data.tourTitle)}
      ${detailRow("Date", data.tourDate)}
      ${detailRow("Guests", String(data.numGuests))}
      ${detailRow("Payment Method", data.paymentMethod)}
    </table>

    <!-- Total -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F8F7F5;border-radius:8px;margin-top:20px;">
      <tr>
        <td style="padding:16px 20px;font-size:14px;font-weight:700;color:#1B2847;">Total Paid</td>
        <td style="padding:16px 20px;text-align:right;font-size:22px;font-weight:700;color:#C41230;">${data.totalAmount}</td>
      </tr>
    </table>

    <p style="margin:28px 0 0;font-size:14px;color:#4A4540;line-height:1.7;">
      Need to make changes or have questions about your tour? Simply reply to this email and our team will assist you.
    </p>
  `;

  return baseTemplate({
    previewText: `Your ${data.tourTitle} booking is confirmed — ${data.bookingRef}`,
    headerLabel: "Booking Confirmed",
    body,
  });
}

// ─── 3. Guide message notification ───────────────────────────────────────────

export function guideMessageHtml(data: {
  customerName:   string;
  guideName:      string;
  messagePreview: string;
  tourTitle:      string;
  bookingRef:     string;
  viewUrl:        string;
}): string {
  const body = `
    <p style="margin:0 0 6px;font-size:22px;font-weight:700;color:#1B2847;font-family:Georgia,'Times New Roman',serif;">You have a new message</p>
    <p style="margin:0 0 24px;font-size:15px;color:#4A4540;line-height:1.7;">
      Dear ${data.customerName}, your guide <strong>${data.guideName}</strong> has sent you a message regarding your booking.
    </p>

    <!-- Booking badge -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F8F7F5;border-radius:8px;border:1px solid #E4E0D9;margin-bottom:24px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 2px;font-size:11px;color:#7A746D;text-transform:uppercase;letter-spacing:1px;">Booking</p>
          <p style="margin:0;font-size:14px;font-weight:700;color:#1B2847;">${data.tourTitle}</p>
          <p style="margin:4px 0 0;font-size:12px;color:#7A746D;">${data.bookingRef}</p>
        </td>
      </tr>
    </table>

    <!-- Message preview bubble -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:20px 24px;background:#EEF2FA;border-left:4px solid #1B2847;border-radius:0 8px 8px 0;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#1B2847;text-transform:uppercase;letter-spacing:1px;">${data.guideName} wrote:</p>
          <p style="margin:0;font-size:14px;color:#4A4540;line-height:1.7;font-style:italic;">&ldquo;${data.messagePreview}${data.messagePreview.length >= 200 ? "&hellip;" : ""}&rdquo;</p>
        </td>
      </tr>
    </table>

    ${ctaButton("View Full Message", data.viewUrl)}

    <p style="margin:24px 0 0;font-size:13px;color:#7A746D;line-height:1.6;">
      You can also reply to your guide directly from your bookings dashboard.
    </p>
  `;

  return baseTemplate({
    previewText: `${data.guideName} sent you a message about your ${data.tourTitle} tour`,
    headerLabel: "New Message from Your Guide",
    body,
  });
}

// ─── 4. Wishlist discount alert ───────────────────────────────────────────────

export function wishlistDiscountHtml(data: {
  customerName:   string;
  tourTitle:      string;
  tourSlug:       string;
  discountCode:   string;
  discountLabel:  string; // e.g. "15% off" or "$30 off"
  originalPrice:  string;
  discountedPrice?: string;
  validUntil?:    string;
  tourImageUrl?:  string;
}): string {
  const tourUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/tours/${data.tourSlug}`;

  const body = `
    <p style="margin:0 0 6px;font-size:22px;font-weight:700;color:#1B2847;font-family:Georgia,'Times New Roman',serif;">Great news — a wishlist tour just got cheaper!</p>
    <p style="margin:0 0 24px;font-size:15px;color:#4A4540;line-height:1.7;">
      Dear ${data.customerName}, one of the tours on your wishlist now has an exclusive discount. Don't miss out!
    </p>

    <!-- Tour card -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#1B2847,#2A3B66);border-radius:10px;margin-bottom:24px;overflow:hidden;">
      <tr>
        <td style="padding:24px 28px;">
          <p style="margin:0 0 4px;font-size:11px;color:rgba(200,168,75,0.9);letter-spacing:2px;text-transform:uppercase;">Wishlisted Tour</p>
          <p style="margin:0 0 16px;font-size:20px;font-weight:700;color:#ffffff;">${data.tourTitle}</p>
          <!-- Discount badge -->
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="background-color:#C41230;color:#ffffff;font-size:18px;font-weight:700;padding:8px 20px;border-radius:6px;">${data.discountLabel}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Price comparison -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F8F7F5;border-radius:8px;border:1px solid #E4E0D9;margin-bottom:24px;">
      <tr>
        <td style="padding:16px 20px;border-right:1px solid #E4E0D9;text-align:center;width:50%;">
          <p style="margin:0 0 4px;font-size:11px;color:#7A746D;text-transform:uppercase;letter-spacing:1px;">Original Price</p>
          <p style="margin:0;font-size:20px;font-weight:700;color:#A8A29E;text-decoration:line-through;">${data.originalPrice}</p>
        </td>
        <td style="padding:16px 20px;text-align:center;width:50%;">
          <p style="margin:0 0 4px;font-size:11px;color:#7A746D;text-transform:uppercase;letter-spacing:1px;">After Discount</p>
          <p style="margin:0;font-size:24px;font-weight:700;color:#C41230;">${data.discountedPrice ?? "See tour page"}</p>
        </td>
      </tr>
    </table>

    <!-- Discount code box -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FFF8E7;border:2px dashed #C8A84B;border-radius:8px;margin-bottom:24px;">
      <tr>
        <td style="padding:18px 24px;text-align:center;">
          <p style="margin:0 0 6px;font-size:12px;color:#7A746D;text-transform:uppercase;letter-spacing:1px;">Your Discount Code</p>
          <p style="margin:0;font-size:24px;font-weight:700;color:#1B2847;letter-spacing:4px;">${data.discountCode}</p>
          ${data.validUntil ? `<p style="margin:8px 0 0;font-size:12px;color:#C41230;">Expires: ${data.validUntil}</p>` : ""}
        </td>
      </tr>
    </table>

    ${ctaButton("Book Now & Save", tourUrl)}

    <p style="margin:24px 0 0;font-size:13px;color:#7A746D;line-height:1.6;">
      Apply the discount code at checkout. This offer is available for a limited time.
    </p>
  `;

  return baseTemplate({
    previewText: `${data.discountLabel} on your wishlisted tour: ${data.tourTitle}`,
    headerLabel: "Wishlist Price Drop",
    body,
  });
}

// ─── 5. Password reset ────────────────────────────────────────────────────────

export function passwordResetHtml(data: {
  name:     string;
  resetUrl: string;
}): string {
  const body = `
    <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1B2847;font-family:Georgia,'Times New Roman',serif;">Reset your password</p>
    <p style="margin:0 0 24px;font-size:15px;color:#4A4540;line-height:1.7;">
      Hi ${data.name}, we received a request to reset the password for your ${COMPANY_NAME} account. Click the button below to choose a new password.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F8F7F5;border-radius:10px;border:1px solid #E4E0D9;padding:0;">
      <tr>
        <td style="padding:24px 28px;text-align:center;">
          <p style="margin:0 0 6px;font-size:13px;color:#7A746D;letter-spacing:0.5px;text-transform:uppercase;">This link expires in</p>
          <p style="margin:0;font-size:28px;font-weight:700;color:#C41230;">1 hour</p>
        </td>
      </tr>
    </table>

    ${ctaButton("Reset My Password", data.resetUrl)}

    <p style="margin:28px 0 0;font-size:13px;color:#7A746D;line-height:1.6;">
      If the button above doesn't work, copy and paste this link into your browser:<br />
      <a href="${data.resetUrl}" style="color:#C41230;word-break:break-all;">${data.resetUrl}</a>
    </p>
    <p style="margin:20px 0 0;font-size:13px;color:#A8A29E;">If you didn't request a password reset, you can safely ignore this email. Your password will not change.</p>
  `;

  return baseTemplate({
    previewText: `Reset your ${COMPANY_NAME} account password`,
    headerLabel: "Password Reset",
    body,
  });
}

// ─── 6. Deal alert (newsletter subscribers) ───────────────────────────────────

export function dealAlertHtml(data: {
  customerName:  string;
  tourTitle:     string;
  tourSlug:      string;
  discountCode:  string;
  discountLabel: string;
  originalPrice: string;
  validUntil?:   string;
  shortDescription?: string;
  unsubscribeUrl: string;
}): string {
  const tourUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/tours/${data.tourSlug}`;

  const body = `
    <p style="margin:0 0 6px;font-size:22px;font-weight:700;color:#1B2847;font-family:Georgia,'Times New Roman',serif;">Exclusive deal for you!</p>
    <p style="margin:0 0 24px;font-size:15px;color:#4A4540;line-height:1.7;">
      Dear ${data.customerName}, as a ${COMPANY_NAME} subscriber you get exclusive early access to our latest offer.
    </p>

    <!-- Tour highlight card -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#C41230,#8B0D20);border-radius:10px;margin-bottom:24px;">
      <tr>
        <td style="padding:28px;">
          <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.7);letter-spacing:2px;text-transform:uppercase;">Featured Tour</p>
          <p style="margin:0 0 10px;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;">${data.tourTitle}</p>
          ${data.shortDescription ? `<p style="margin:0 0 16px;font-size:14px;color:rgba(255,255,255,0.85);line-height:1.6;">${data.shortDescription}</p>` : ""}
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="background-color:#C8A84B;color:#1B2847;font-size:20px;font-weight:700;padding:10px 24px;border-radius:6px;">${data.discountLabel}</td>
              <td style="padding-left:16px;font-size:16px;color:rgba(255,255,255,0.7);text-decoration:line-through;">was ${data.originalPrice}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Discount code -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FFF8E7;border:2px dashed #C8A84B;border-radius:8px;margin-bottom:24px;">
      <tr>
        <td style="padding:20px 24px;text-align:center;">
          <p style="margin:0 0 6px;font-size:12px;color:#7A746D;text-transform:uppercase;letter-spacing:1px;">Subscriber Exclusive Code</p>
          <p style="margin:0;font-size:26px;font-weight:700;color:#1B2847;letter-spacing:4px;">${data.discountCode}</p>
          ${data.validUntil ? `<p style="margin:8px 0 0;font-size:12px;color:#C41230;font-weight:600;">Valid until: ${data.validUntil}</p>` : ""}
        </td>
      </tr>
    </table>

    ${ctaButton("Claim This Deal", tourUrl)}

    <p style="margin:28px 0 0;font-size:12px;color:#A8A29E;line-height:1.6;text-align:center;">
      You're receiving this because you subscribed to ${COMPANY_NAME} deals.<br />
      <a href="${data.unsubscribeUrl}" style="color:#C41230;text-decoration:none;">Unsubscribe</a>
    </p>
  `;

  return baseTemplate({
    previewText: `Exclusive deal: ${data.discountLabel} on ${data.tourTitle}`,
    headerLabel: "Members-Only Deal",
    body,
  });
}
