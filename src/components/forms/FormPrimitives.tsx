import type {ReactNode} from "react";

export const formInputClassName =
  "w-full rounded-md border border-outline-variant bg-[#fbf8ff] px-4 py-2.5 text-sm text-on-surface outline-none transition-colors focus:border-alfs-orange focus:ring-2 focus:ring-alfs-orange/20 disabled:cursor-not-allowed disabled:opacity-70";

type FormLegendProps = {
  requiredText: string;
  optionalText: string;
  localeIsRTL: boolean;
};

export function FormLegend({requiredText, optionalText, localeIsRTL}: FormLegendProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-xl border border-[#ebe8f3] bg-[#fbf8ff] px-4 py-3 text-xs text-on-surface-variant ${
        localeIsRTL ? "justify-end text-right" : "justify-start text-left"
      }`}
    >
      <span className="font-semibold text-alfs-navy">
        <span className="text-[#d93025]">*</span> {requiredText}
      </span>
      <span>{optionalText}</span>
    </div>
  );
}

type FieldLabelProps = {
  label: string;
  required?: boolean;
  optionalLabel?: string;
};

export function FieldLabel({label, required = false, optionalLabel}: FieldLabelProps) {
  return (
    <span className="mb-1.5 block text-sm font-medium text-alfs-navy">
      {label}
      {required ? (
        <span className="ms-1 text-[#d93025]" aria-hidden>
          *
        </span>
      ) : optionalLabel ? (
        <span className="ms-2 rounded-full bg-[#eef1fb] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant">
          {optionalLabel}
        </span>
      ) : null}
    </span>
  );
}

type FieldErrorProps = {
  message?: string;
};

export function FieldError({message}: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return <span className="mt-1.5 block text-xs font-medium text-[#d93025]">{message}</span>;
}

type SubmissionNoticeProps = {
  title: string;
  description: string;
  tone: "success" | "error";
  children?: ReactNode;
};

export function SubmissionNotice({
  title,
  description,
  tone,
  children,
}: SubmissionNoticeProps) {
  const classes =
    tone === "success"
      ? "border-[#cae7d3] bg-[#f3fbf6] text-[#1d5f35]"
      : "border-[#f3d0cb] bg-[#fff5f3] text-[#9f2f22]";

  return (
    <div className={`rounded-xl border px-4 py-3 ${classes}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6">{description}</p>
      {children}
    </div>
  );
}
