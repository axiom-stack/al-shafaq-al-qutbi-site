import {
  createCareersApplicationSchema,
  createContactInquirySchema,
  createServiceQuoteSchema,
  submissionTypeSchema,
} from "@/lib/forms/contact-submissions";
import {
  getCareersFormCopy,
  getCommonFormCopy,
  getContactFormCopy,
  getServiceQuoteFormCopy,
  resolveLocale,
} from "@/lib/forms/form-copy";
import {ZodError} from "zod";
import {buildSubmissionSubject, toFieldErrors, type FormRouteError, type FormRouteSuccess} from "@/lib/forms/server-validation";
import {sendContactSubmissionEmail} from "@/lib/email/resend-contact";

function readStringField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const locale = resolveLocale(formData.get("locale"));
  const commonCopy = getCommonFormCopy(locale);
  const rawFormType = formData.get("formType");
  const parsedFormType = submissionTypeSchema.safeParse(rawFormType);

  if (!parsedFormType.success) {
    return Response.json(
      {
        success: false,
        message: commonCopy.submissionFailed,
        fieldErrors: {
          formType: commonCopy.validation.required,
        },
      },
      {status: 400},
    );
  }

  try {
    switch (parsedFormType.data) {
      case "contact": {
        const copy = getContactFormCopy(locale);
        const payload = createContactInquirySchema(copy).parse({
          formType: parsedFormType.data,
          locale,
          name: readStringField(formData, "name"),
          email: readStringField(formData, "email"),
          phone: readStringField(formData, "phone"),
          subject: readStringField(formData, "subject"),
          message: readStringField(formData, "message"),
        });

        await sendContactSubmissionEmail({payload, locale});
        return Response.json({success: true, message: commonCopy.submissionSucceeded});
      }
      case "service-quote": {
        const copy = getServiceQuoteFormCopy(locale);
        const payload = createServiceQuoteSchema(copy).parse({
          formType: parsedFormType.data,
          locale,
          name: readStringField(formData, "name"),
          email: readStringField(formData, "email"),
          phone: readStringField(formData, "phone"),
          cargoDetails: readStringField(formData, "cargoDetails"),
        });

        await sendContactSubmissionEmail({payload, locale});
        return Response.json({success: true, message: commonCopy.submissionSucceeded});
      }
      case "careers": {
        const copy = getCareersFormCopy(locale);
        const payload = createCareersApplicationSchema(copy).parse({
          formType: parsedFormType.data,
          locale,
          name: readStringField(formData, "name"),
          email: readStringField(formData, "email"),
          phone: readStringField(formData, "phone"),
          position: readStringField(formData, "position"),
          experience: readStringField(formData, "experience"),
          linkedin: readStringField(formData, "linkedin"),
          message: readStringField(formData, "message"),
          cv: formData.get("cv"),
        });

        const attachmentBuffer = Buffer.from(await payload.cv.arrayBuffer());

        await sendContactSubmissionEmail({
          payload,
          locale,
          attachment: {
            filename: payload.cv.name,
            content: attachmentBuffer,
            contentType: payload.cv.type,
          },
        });

        return Response.json({success: true, message: commonCopy.submissionSucceeded});
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = toFieldErrors(error);

      return Response.json(
        {
          success: false,
          message: commonCopy.submissionFailed,
          fieldErrors,
        },
        {status: 400},
      );
    }

    console.error("Contact form submission failed", {
      locale,
      formType: parsedFormType.data,
      subject: buildSubmissionSubject(parsedFormType.data, locale),
      error,
    });

    return Response.json(
      {
        success: false,
        message: commonCopy.submissionFailed,
      },
      {status: 500},
    );
  }
}
