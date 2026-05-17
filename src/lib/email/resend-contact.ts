import {Resend} from "resend";

import type {Locale} from "@/i18n/routing";

import {
  buildSubmissionSubject,
} from "@/lib/forms/server-validation";
import type {
  CareersApplicationValues,
  ContactInquiryValues,
  ServiceQuoteValues,
  SubmissionType,
} from "@/lib/forms/contact-submissions";
import {
  getCareersFormCopy,
  getContactFormCopy,
  getServiceQuoteFormCopy,
} from "@/lib/forms/form-copy";

type SubmissionPayload = ContactInquiryValues | ServiceQuoteValues | CareersApplicationValues;

type SubmissionAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL;
const resendToEmail = process.env.RESEND_TO_EMAIL;

function getResendClient() {
  if (!resendApiKey || !resendFromEmail || !resendToEmail) {
    return null;
  }

  return new Resend(resendApiKey);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatLocale(locale: Locale) {
  return locale === "ar" ? "Arabic" : "English";
}

function formatFormType(formType: SubmissionType, locale: Locale) {
  const labels: Record<SubmissionType, Record<Locale, string>> = {
    contact: {
      en: "Contact inquiry",
      ar: "استفسار تواصل",
    },
    "service-quote": {
      en: "Service quote request",
      ar: "طلب عرض سعر",
    },
    careers: {
      en: "Careers application",
      ar: "طلب توظيف",
    },
  };

  return labels[formType][locale];
}

function renderFieldRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:0 0 16px 0;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;line-height:1.3;color:#1a2f7a;padding:0 0 6px 0;text-transform:uppercase;letter-spacing:0.05em;">
          ${escapeHtml(label)}
        </div>
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#454651;background-color:#fbf8ff;border:1px solid #e8e4ef;border-radius:12px;padding:14px 16px;white-space:pre-wrap;">
          ${escapeHtml(value)}
        </div>
      </td>
    </tr>
  `;
}

function buildRows(payload: SubmissionPayload, locale: Locale) {
  if (payload.formType === "contact") {
    const copy = getContactFormCopy(locale);

    return [
      renderFieldRow(copy.fields.name, payload.name),
      renderFieldRow(copy.fields.email, payload.email),
      renderFieldRow(copy.fields.phone, payload.phone ?? "—"),
      renderFieldRow(copy.fields.subject, payload.subject),
      renderFieldRow(copy.fields.message, payload.message),
    ].join("");
  }

  if (payload.formType === "service-quote") {
    const copy = getServiceQuoteFormCopy(locale);

    return [
      renderFieldRow(copy.fields.name, payload.name),
      renderFieldRow(copy.fields.email, payload.email),
      renderFieldRow(copy.fields.phone, payload.phone ?? "—"),
      renderFieldRow(copy.fields.cargoDetails, payload.cargoDetails),
    ].join("");
  }

  const copy = getCareersFormCopy(locale);

  return [
    renderFieldRow(copy.fields.name, payload.name),
    renderFieldRow(copy.fields.email, payload.email),
    renderFieldRow(copy.fields.phone, payload.phone),
    renderFieldRow(copy.fields.position, payload.position),
    renderFieldRow(copy.fields.experience, payload.experience),
    renderFieldRow(copy.fields.linkedin, payload.linkedin ?? "—"),
    renderFieldRow(copy.fields.message, payload.message),
    renderFieldRow(copy.fields.cv, payload.cv.name),
  ].join("");
}

function buildSubmissionHtml(payload: SubmissionPayload, locale: Locale) {
  const subject = buildSubmissionSubject(payload.formType, locale);
  const formTypeLabel = formatFormType(payload.formType, locale);
  const rows = buildRows(payload, locale);

  return `
    <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f4f0fa;width:100%;padding:24px 0;">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;max-width:640px;width:100%;background-color:#ffffff;border:1px solid #e8e4ef;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 0 28px;">
                <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;width:100%;">
                  <tr>
                    <td style="padding:0 20px 0 0;vertical-align:middle;">
                      <img src="https://www.aurora-lfs.com/images/ALFS_LOGO.png" alt="Al Shafaq Al Qutbi Logistics Services (ALFS)" width="140" height="42" style="display:block;border:0;outline:none;text-decoration:none;width:140px;height:auto;max-width:140px;" />
                    </td>
                    <td style="width:3px;padding:0;vertical-align:middle;background-color:#f47920;font-size:0;line-height:0;">&nbsp;</td>
                    <td style="padding:0 0 0 20px;vertical-align:middle;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;line-height:1.3;color:#1a2f7a;padding:0 0 4px 0;">
                        ${escapeHtml(subject)}
                      </div>
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;line-height:1.5;color:#454651;">
                        ${escapeHtml(formTypeLabel)} • ${escapeHtml(formatLocale(locale))}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 0 28px;font-size:0;line-height:0;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" style="border-collapse:collapse;">
                  <tr>
                    <td style="border-top:1px solid #e8e4ef;font-size:0;line-height:0;height:1px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 16px 28px;">
                <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;width:100%;">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px 28px;">
                <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.65;color:#454651;padding:0 0 3px 0;">
                      <span style="color:#1a2f7a;font-weight:700;">E</span>&nbsp;
                      <a href="mailto:info@aurora-lfs.com" style="color:#1e3da8;text-decoration:none;">info@aurora-lfs.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.65;color:#454651;padding:0 0 3px 0;">
                      <span style="color:#1a2f7a;font-weight:700;">W</span>&nbsp;
                      <a href="https://www.aurora-lfs.com" style="color:#f47920;text-decoration:none;font-weight:600;">www.aurora-lfs.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:1.55;color:#757682;padding:4px 0 0 0;">
                      Amman, Jordan — Al-Muwaffaqiyah, Agencies Street,<br />
                      Al-Jawarni Commercial Complex No. 8, First Floor
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

function buildSubmissionText(payload: SubmissionPayload, locale: Locale) {
  const baseLines = [
    buildSubmissionSubject(payload.formType, locale),
    `Form type: ${formatFormType(payload.formType, locale)}`,
    `Locale: ${locale}`,
  ];

  if (payload.formType === "contact") {
    return [
      ...baseLines,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone ?? "-"}`,
      `Subject: ${payload.subject}`,
      `Message: ${payload.message}`,
    ].join("\n");
  }

  if (payload.formType === "service-quote") {
    return [
      ...baseLines,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone ?? "-"}`,
      `Shipment Details: ${payload.cargoDetails}`,
    ].join("\n");
  }

  return [
    ...baseLines,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Position: ${payload.position}`,
    `Experience: ${payload.experience}`,
    `LinkedIn: ${payload.linkedin ?? "-"}`,
    `Message: ${payload.message}`,
    `CV: ${payload.cv.name}`,
  ].join("\n");
}

export function getMissingResendEnvKeys() {
  return [
    !resendApiKey ? "RESEND_API_KEY" : null,
    !resendFromEmail ? "RESEND_FROM_EMAIL" : null,
    !resendToEmail ? "RESEND_TO_EMAIL" : null,
  ].filter((value): value is string => Boolean(value));
}

export async function sendContactSubmissionEmail({
  payload,
  locale,
  attachment,
}: {
  payload: SubmissionPayload;
  locale: Locale;
  attachment?: SubmissionAttachment;
}) {
  const resend = getResendClient();

  if (!resend || !resendFromEmail || !resendToEmail) {
    throw new Error(`Missing Resend env vars: ${getMissingResendEnvKeys().join(", ")}`);
  }

  const {error} = await resend.emails.send({
    from: resendFromEmail,
    to: resendToEmail,
    replyTo: payload.email,
    subject: buildSubmissionSubject(payload.formType as SubmissionType, locale),
    html: buildSubmissionHtml(payload, locale),
    text: buildSubmissionText(payload, locale),
    attachments: attachment
      ? [
          {
            filename: attachment.filename,
            content: attachment.content,
            contentType: attachment.contentType,
          },
        ]
      : undefined,
  });

  if (error) {
    throw new Error(error.message);
  }
}
