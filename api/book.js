// api/book.js - Vercel Serverless Function
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, email, serviceType, preferredDate, preferredTime, projectDetails } = req.body;

  // Basic validation
  if (!fullName || !email || !serviceType || !preferredDate || !preferredTime) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  try {
    // Confirmation email → Client
    await resend.emails.send({
      from: "Trubeg Consultancy <onboarding@resend.dev>",
      to: email,
      subject: "Your Consultation is Confirmed – Trubeg",
      html: clientConfirmationEmail({ fullName, serviceType, preferredDate, preferredTime, projectDetails }),
    });

    // Notification email → Trubeg team
    await resend.emails.send({
      from: "Trubeg Booking System <onboarding@resend.dev>",
      to: ["xieqingking@gmail.com"],
      subject: `New Booking: ${fullName} – ${serviceType}`,
      html: teamNotificationEmail({ fullName, email, serviceType, preferredDate, preferredTime, projectDetails }),
    });

    return res.status(200).json({ success: true, message: "Booking confirmed! Check your email." });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: "Failed to send confirmation. Please try again or call us directly." });
  }
}

// Email Templates
function clientConfirmationEmail({ fullName, serviceType, preferredDate, preferredTime, projectDetails }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Booking Confirmation – Trubeg</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a1a;padding:40px;text-align:center;">
              <p style="margin:0 0 8px;color:#c8a96e;font-size:11px;letter-spacing:4px;text-transform:uppercase;">Est. 2001 · Nairobi, Kenya</p>
              <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:400;letter-spacing:6px;text-transform:uppercase;">TRUBEG</h1>
              <p style="margin:8px 0 0;color:#888;font-size:12px;letter-spacing:2px;">Construction & Consultancy Excellence</p>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr><td style="height:4px;background:linear-gradient(90deg,#c8a96e,#e8c97e,#c8a96e);"></td></tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:48px 40px;">
              <p style="margin:0 0 8px;color:#c8a96e;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Booking Confirmed</p>
              <h2 style="margin:0 0 24px;color:#1a1a1a;font-size:26px;font-weight:400;">Dear ${fullName},</h2>
              <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.7;">
                Thank you for choosing Trubeg. Your consultation has been received and a member of our senior team will confirm your appointment within <strong>24 hours</strong>.
              </p>

              <!-- Booking Summary Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f3;border-left:3px solid #c8a96e;margin-bottom:32px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 16px;color:#1a1a1a;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Booking Summary</p>
                    ${summaryRow("Service", serviceType)}
                    ${summaryRow("Date", preferredDate)}
                    ${summaryRow("Time", preferredTime)}
                    ${projectDetails ? summaryRow("Project Notes", projectDetails) : ""}
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.7;">
                Your initial consultation is <strong>free of charge</strong> and will include a detailed cost breakdown and timeline estimation for your project.
              </p>

              <p style="margin:0 0 8px;color:#555;font-size:14px;">Need to reach us sooner?</p>
              <p style="margin:0;color:#1a1a1a;font-size:14px;">
                📞 <a href="tel:+254757056893" style="color:#c8a96e;text-decoration:none;">+254 757-056-893</a> &nbsp;|&nbsp;
                📞 <a href="tel:+254743067512" style="color:#c8a96e;text-decoration:none;">+254 743-067-512</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1a1a1a;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 6px;color:#888;font-size:12px;">Anniversary Towers, 14th Floor, Nairobi CBD, Kenya</p>
              <p style="margin:0;color:#555;font-size:11px;">© ${new Date().getFullYear()} Trubeg Construction & Consultancy. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function teamNotificationEmail({ fullName, email, serviceType, preferredDate, preferredTime, projectDetails }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <tr>
            <td style="background:#1a1a1a;padding:32px 40px;">
              <p style="margin:0 0 4px;color:#c8a96e;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Internal Notification</p>
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:400;letter-spacing:3px;">NEW BOOKING RECEIVED</h1>
            </td>
          </tr>
          <tr><td style="height:3px;background:linear-gradient(90deg,#c8a96e,#e8c97e,#c8a96e);"></td></tr>

          <tr>
            <td style="background:#ffffff;padding:40px;">
              <p style="margin:0 0 20px;color:#555;font-size:14px;line-height:1.6;">
                A new consultation has been submitted via the website. Details below:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f3;border-left:3px solid #c8a96e;">
                <tr>
                  <td style="padding:24px 28px;">
                    ${summaryRow("Name", fullName)}
                    ${summaryRow("Email", `<a href="mailto:${email}" style="color:#c8a96e;">${email}</a>`)}
                    ${summaryRow("Service", serviceType)}
                    ${summaryRow("Date", preferredDate)}
                    ${summaryRow("Time", preferredTime)}
                    ${projectDetails ? summaryRow("Project Details", projectDetails) : summaryRow("Project Details", "<em>None provided</em>")}
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0;color:#888;font-size:13px;">
                A confirmation email has been automatically sent to the client at <strong>${email}</strong>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#1a1a1a;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#555;font-size:11px;">Trubeg Internal System · Do not reply to this email</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function summaryRow(label, value) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
      <tr>
        <td width="130" style="color:#999;font-size:11px;letter-spacing:2px;text-transform:uppercase;vertical-align:top;padding-top:2px;">${label}</td>
        <td style="color:#1a1a1a;font-size:14px;line-height:1.5;">${value}</td>
      </tr>
    </table>
  `;
}