import nodemailer from "nodemailer";

interface InquiryData {
  type: "contact" | "lead" | "assessment";
  parentName?: string | null;
  studentName?: string | null;
  email: string;
  phone?: string | null;
  subject?: string | null;
  notes?: string | null;
  gradeLevel?: string | null;
  curriculum?: string | null;
  learningMode?: string | null;
  schedule?: string | null;
  state?: string | null;
  city?: string | null;
  zipCode?: string | null;
  source?: string | null;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@aceeducation.us";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });
  }
  return null;
}

export async function sendInquiryEmails(data: InquiryData): Promise<{ adminSent: boolean; clientSent: boolean }> {
  const name = data.parentName || data.studentName || "Valued Client";
  const inquiryTypeLabel =
    data.type === "contact"
      ? "Contact Form Message"
      : data.type === "assessment"
      ? "Free Academic Assessment Request"
      : "New Lead Inquiry";

  // HTML for Admin Notification
  const adminHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f6f9; color: #1e293b; margin: 0; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 30px; border: 1px solid #e2e8f0; }
          .header { border-bottom: 2px solid #d97706; padding-bottom: 15px; margin-bottom: 20px; }
          .header h2 { color: #0f172a; margin: 0; font-size: 20px; }
          .field { margin-bottom: 12px; }
          .label { font-weight: bold; font-size: 13px; color: #64748b; text-transform: uppercase; }
          .value { font-size: 15px; color: #0f172a; margin-top: 2px; }
          .notes-box { background: #f8fafc; border-left: 4px solid #d97706; padding: 12px 16px; margin-top: 15px; border-radius: 4px; }
          .footer { margin-top: 25px; font-size: 12px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h2>New Inquiry Received (${inquiryTypeLabel})</h2>
          </div>
          
          <div class="field">
            <div class="label">Client Name</div>
            <div class="value">${data.parentName || "Not provided"}${data.studentName ? ` (Student: ${data.studentName})` : ""}</div>
          </div>

          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>

          <div class="field">
            <div class="label">Phone Number</div>
            <div class="value">${data.phone || "Not provided"}</div>
          </div>

          ${data.subject ? `<div class="field"><div class="label">Subject / Service</div><div class="value">${data.subject}</div></div>` : ""}
          ${data.gradeLevel ? `<div class="field"><div class="label">Grade Level</div><div class="value">${data.gradeLevel}</div></div>` : ""}
          ${data.curriculum ? `<div class="field"><div class="label">Curriculum</div><div class="value">${data.curriculum}</div></div>` : ""}
          ${data.learningMode ? `<div class="field"><div class="label">Learning Mode</div><div class="value">${data.learningMode}</div></div>` : ""}
          ${data.schedule ? `<div class="field"><div class="label">Schedule Preference</div><div class="value">${data.schedule}</div></div>` : ""}
          ${data.state ? `<div class="field"><div class="label">Location</div><div class="value">${data.city ? `${data.city}, ` : ""}${data.state}${data.zipCode ? ` (${data.zipCode})` : ""}</div></div>` : ""}
          ${data.source ? `<div class="field"><div class="label">Source</div><div class="value">${data.source}</div></div>` : ""}

          ${data.notes ? `
            <div class="notes-box">
              <div class="label">Message / Notes</div>
              <div class="value" style="white-space: pre-line;">${data.notes}</div>
            </div>
          ` : ""}

          <div class="footer">
            ACE Education Automated Lead System • Received at ${new Date().toLocaleString()}
          </div>
        </div>
      </body>
    </html>
  `;

  // HTML for Client Confirmation
  const clientHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f6f9; color: #1e293b; margin: 0; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #e2e8f0; }
          .logo { font-size: 22px; font-weight: bold; color: #0b192c; text-decoration: none; }
          .logo span { color: #d97706; }
          .content { margin-top: 20px; line-height: 1.6; }
          .highlight-box { background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px; color: #92400e; }
          .contact-details { background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 20px; font-size: 14px; }
          .footer { margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="logo">ACE <span>Education</span></div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to <strong>ACE Education</strong>! We have successfully received your inquiry regarding <strong>${data.subject || inquiryTypeLabel}</strong>.</p>
            
            <div class="highlight-box">
              <strong>What happens next?</strong><br/>
              One of our academic directors will review your details and contact you within <strong>24 business hours</strong> to discuss a personalized learning plan tailored to your student's needs.
            </div>

            <p>Here is a summary of the information you submitted:</p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${data.email}</li>
              ${data.phone ? `<li><strong>Phone:</strong> ${data.phone}</li>` : ""}
              ${data.subject ? `<li><strong>Program / Subject:</strong> ${data.subject}</li>` : ""}
              ${data.learningMode ? `<li><strong>Learning Preference:</strong> ${data.learningMode}</li>` : ""}
            </ul>

            <div class="contact-details">
              <strong>Need urgent assistance?</strong><br/>
              • <strong>Phone:</strong> +1 (332) 293-6270<br/>
              • <strong>Email:</strong> info@aceeducation.us<br/>
              • <strong>Telegram:</strong> @ACEeducationUSA
            </div>

            <p style="margin-top:24px;">Warm regards,<br/><strong>The ACE Education Team</strong></p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ACE Education. All rights reserved.<br/>
            Providing elite personalized tutoring across the United States & Globally.
          </div>
        </div>
      </body>
    </html>
  `;

  const transporter = getTransporter();

  let adminSent = false;
  let clientSent = false;

  if (transporter) {
    try {
      // Send to Admin
      await transporter.sendMail({
        from: `"ACE Education Leads" <${process.env.SMTP_USER || "no-reply@aceeducation.us"}>`,
        to: ADMIN_EMAIL,
        subject: `[New Inquiry] ${inquiryTypeLabel} - ${name}`,
        html: adminHtml,
      });
      adminSent = true;

      // Send to Client
      await transporter.sendMail({
        from: `"ACE Education" <${process.env.SMTP_USER || "info@aceeducation.us"}>`,
        to: data.email,
        subject: `Thank you for contacting ACE Education - Confirmation`,
        html: clientHtml,
      });
      clientSent = true;
    } catch (err) {
      console.error("[Email Error] Failed to send via SMTP:", err);
    }
  } else {
    console.log(`[Email System Mock] Transporter not configured. Simulation logged:`);
    console.log(` -> Admin Notification sent to: ${ADMIN_EMAIL}`);
    console.log(` -> Client Confirmation sent to: ${data.email}`);
    adminSent = true;
    clientSent = true;
  }

  return { adminSent, clientSent };
}
