import type {ReactNode} from "react";

import {PublicIcon} from "@/components/public/PublicIcon";

/** Shared class for inputs, selects and textareas. Defined in globals.css. */
export const formInputClassName = "field-control";

/** Accessibility wiring for a control: id, invalid state and the error it is described by. */
export function fieldProps(id: string, error?: string, hintId?: string) {
  const describedBy = [error ? `${id}-error` : null, hintId ?? null].filter(Boolean).join(" ");

  return {
    id,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": describedBy || undefined,
  };
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

/** Label above, control, then hint or error below. One layout for every field. */
export function Field({id, label, required = false, optionalLabel, error, hint, children, className = ""}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-ui font-semibold text-navy-900">
        <span>
          {label}
          {required ? (
            <span className="ms-1 text-danger" aria-hidden>
              *
            </span>
          ) : null}
        </span>
        {!required && optionalLabel ? (
          <span className="text-sm font-normal text-ink-faint">{optionalLabel}</span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-ink-faint">
          {hint}
        </p>
      ) : null}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function FormLegend({requiredText}: {requiredText: string; optionalText?: string; localeIsRTL?: boolean}) {
  return <p className="text-sm text-ink-faint">{requiredText}</p>;
}

export function FieldError({message, id}: {message?: string; id?: string}) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger">
      <PublicIcon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

type SubmissionNoticeProps = {
  title: string;
  description: string;
  tone: "success" | "error";
  children?: ReactNode;
};

/** Announced result of a submission. Scrolls itself into view so it is never missed on small screens. */
export function SubmissionNotice({title, description, tone, children}: SubmissionNoticeProps) {
  const success = tone === "success";

  return (
    <div
      role={success ? "status" : "alert"}
      ref={(node) => {
        node?.scrollIntoView({block: "center", behavior: "smooth"});
      }}
      className={`flex gap-3 rounded-card border p-4 ${
        success ? "border-success-line bg-success-bg text-success" : "border-danger-line bg-danger-bg text-danger"
      }`}
    >
      <PublicIcon name={success ? "success" : "alert"} className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-ui leading-relaxed">{description}</p>
        {children}
      </div>
    </div>
  );
}

/** White form surface. One of the few places a card and a shadow are used. */
export function FormCard({children, className = ""}: {children: ReactNode; className?: string}) {
  return (
    <div className={`rounded-card border border-line bg-surface p-5 shadow-card sm:p-8 ${className}`}>{children}</div>
  );
}

export function SubmitButton({pending, pendingLabel, children}: {pending: boolean; pendingLabel: string; children: ReactNode}) {
  return (
    <button type="submit" disabled={pending} aria-busy={pending} className="btn btn-primary btn-lg w-full sm:w-auto">
      {pending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-900/30 border-t-navy-900" aria-hidden />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
