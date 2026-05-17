import {z} from "zod";

export const submissionTypes = ["contact", "service-quote", "careers"] as const;
export const submissionTypeSchema = z.enum(submissionTypes);

export type SubmissionType = (typeof submissionTypes)[number];

export const careersCvMaxBytes = 10 * 1024 * 1024;
export const careersCvAcceptedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;
export const careersCvAcceptedExtensions = [".pdf", ".doc", ".docx"] as const;

export type FormCopy = {
  requiredLabel: string;
  optionalLabel: string;
  submissionFailed: string;
  submissionSucceeded: string;
  validation: {
    required: string;
    email: string;
    phone: string;
    select: string;
    messageMin: string;
    cargoDetailsMin: string;
    linkedin: string;
    fileRequired: string;
    fileType: string;
    fileSize: string;
  };
};

export type SharedFormFieldLabels = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactFormFieldLabels = SharedFormFieldLabels & {
  subject: string;
};

export type ServiceQuoteFieldLabels = Pick<SharedFormFieldLabels, "name" | "email" | "phone"> & {
  cargoDetails: string;
};

export type CareersFieldLabels = SharedFormFieldLabels & {
  position: string;
  experience: string;
  linkedin: string;
  cv: string;
};

export type ContactFormCopy = {
  form: FormCopy;
  fields: ContactFormFieldLabels;
};

export type ServiceQuoteFormCopy = {
  form: FormCopy;
  fields: ServiceQuoteFieldLabels;
};

export type CareersFormCopy = {
  form: FormCopy;
  fields: CareersFieldLabels;
};

function requiredTrimmed(message: string, min = 1) {
  return z
    .string()
    .trim()
    .min(min, message);
}

function optionalTrimmed() {
  return z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined);
}

function phoneField(messages: FormCopy["validation"]) {
  return z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined)
    .refine((value) => !value || value.length >= 7, {
      message: messages.phone,
    });
}

function fileValueSchema(message: string) {
  return z.custom<File>((value) => value instanceof File && value.size > 0, {
    message,
  });
}

function hasAcceptedCvType(file: File) {
  const loweredName = file.name.toLowerCase();

  return (
    careersCvAcceptedMimeTypes.includes(file.type as (typeof careersCvAcceptedMimeTypes)[number]) ||
    careersCvAcceptedExtensions.some((extension) => loweredName.endsWith(extension))
  );
}

export function createContactInquirySchema(copy: ContactFormCopy) {
  return z.object({
    formType: z.literal("contact"),
    locale: z.enum(["en", "ar"]),
    name: requiredTrimmed(copy.form.validation.required),
    email: requiredTrimmed(copy.form.validation.required).email(copy.form.validation.email),
    phone: phoneField(copy.form.validation),
    subject: requiredTrimmed(copy.form.validation.select),
    message: requiredTrimmed(copy.form.validation.messageMin, 10),
  });
}

export function createServiceQuoteSchema(copy: ServiceQuoteFormCopy) {
  return z.object({
    formType: z.literal("service-quote"),
    locale: z.enum(["en", "ar"]),
    name: requiredTrimmed(copy.form.validation.required),
    email: requiredTrimmed(copy.form.validation.required).email(copy.form.validation.email),
    phone: phoneField(copy.form.validation),
    cargoDetails: requiredTrimmed(copy.form.validation.cargoDetailsMin, 10),
  });
}

export function createCareersApplicationSchema(copy: CareersFormCopy) {
  return z.object({
    formType: z.literal("careers"),
    locale: z.enum(["en", "ar"]),
    name: requiredTrimmed(copy.form.validation.required),
    email: requiredTrimmed(copy.form.validation.required).email(copy.form.validation.email),
    phone: requiredTrimmed(copy.form.validation.required).refine((value) => value.length >= 7, {
      message: copy.form.validation.phone,
    }),
    position: requiredTrimmed(copy.form.validation.required),
    experience: requiredTrimmed(copy.form.validation.select),
    linkedin: optionalTrimmed().refine(
      (value) => !value || /^https?:\/\//i.test(value),
      {
        message: copy.form.validation.linkedin,
      },
    ),
    message: requiredTrimmed(copy.form.validation.messageMin, 10),
    cv: fileValueSchema(copy.form.validation.fileRequired)
      .refine((file) => hasAcceptedCvType(file), {
        message: copy.form.validation.fileType,
      })
      .refine((file) => file.size <= careersCvMaxBytes, {
        message: copy.form.validation.fileSize,
      }),
  });
}

export type ContactInquiryValues = z.infer<ReturnType<typeof createContactInquirySchema>>;
export type ServiceQuoteValues = z.infer<ReturnType<typeof createServiceQuoteSchema>>;
export type CareersApplicationValues = z.infer<ReturnType<typeof createCareersApplicationSchema>>;
export type ContactInquiryInputValues = z.input<ReturnType<typeof createContactInquirySchema>>;
export type ServiceQuoteInputValues = z.input<ReturnType<typeof createServiceQuoteSchema>>;
export type CareersApplicationInputValues = z.input<ReturnType<typeof createCareersApplicationSchema>>;

export type ContactSubmissionValues =
  | ContactInquiryValues
  | ServiceQuoteValues
  | CareersApplicationValues;
