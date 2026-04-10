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
  return transporter.sendMail({
    from:    `"${COMPANY_NAME}" <${process.env.SMTP_FROM ?? COMPANY_EMAIL}>`,
    to,
    subject,
    html,
    text,
  });
}

/** Booking confirmation email */
export function bookingConfirmationHtml(data: {
  customerName: string;
  bookingRef:   string;
  tourTitle:    string;
  tourDate:     string;
  numGuests:    number;
  totalAmount:  string;
  paymentMethod: string;
}): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; color: #111; background: #f8f7f5; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #e4e0d9; }
        .header { background: #C41230; color: #fff; padding: 32px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .body { padding: 32px; }
        .row { display: flex; justify-content: space-between; border-bottom: 1px solid #e4e0d9; padding: 12px 0; }
        .label { color: #7a746d; font-size: 14px; }
        .value { font-weight: 600; }
        .total { background: #f8f7f5; border-radius: 6px; padding: 16px; margin-top: 24px; display: flex; justify-content: space-between; }
        .footer { padding: 24px 32px; font-size: 13px; color: #7a746d; border-top: 1px solid #e4e0d9; text-align: center; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>${COMPANY_NAME}</h1>
          <p style="margin: 8px 0 0; opacity: 0.9;">Booking Confirmed</p>
        </div>
        <div class="body">
          <p>Dear ${data.customerName},</p>
          <p>Your booking is confirmed! We look forward to welcoming you on this journey through Japan.</p>
          <div class="row"><span class="label">Booking Reference</span><span class="value">${data.bookingRef}</span></div>
          <div class="row"><span class="label">Tour</span><span class="value">${data.tourTitle}</span></div>
          <div class="row"><span class="label">Date</span><span class="value">${data.tourDate}</span></div>
          <div class="row"><span class="label">Guests</span><span class="value">${data.numGuests}</span></div>
          <div class="row"><span class="label">Payment</span><span class="value">${data.paymentMethod}</span></div>
          <div class="total"><span style="font-weight:600">Total Paid</span><span style="color:#C41230;font-size:18px;font-weight:700">${data.totalAmount}</span></div>
          <p style="margin-top:24px;">If you have any questions, simply reply to this email.</p>
        </div>
        <div class="footer">${COMPANY_NAME} · ${COMPANY_EMAIL}</div>
      </div>
    </body>
    </html>
  `;
}
