import type {ReactNode} from "react";

type Tone = "paper" | "surface" | "sunken" | "navy";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper",
  surface: "bg-surface",
  sunken: "bg-sunken",
  navy: "on-dark bg-navy-900 text-on-dark-soft",
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  tight?: boolean;
  className?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
};

/** Page band: sets background tone, vertical rhythm and the shared container. */
export function Section({id, tone = "paper", tight = false, className = "", children, ...rest}: SectionProps) {
  return (
    <section
      id={id}
      className={`${toneClass[tone]} ${tight ? "section-y-tight" : "section-y"} ${className}`}
      {...rest}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  title: string;
  lead?: string;
  onDark?: boolean;
  align?: "start" | "center";
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

/** Section title block. Start-aligned by default; one heading style site-wide. */
export function SectionHeader({
  title,
  lead,
  onDark = false,
  align = "start",
  action,
  as: Heading = "h2",
  className = "",
  id,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-6 ${
        centered ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"
      } ${className}`}
    >
      <div className={centered ? "max-w-3xl" : "max-w-3xl"}>
        <Heading id={id} className={`t-h2 ${onDark ? "text-white" : "text-navy-900"}`}>
          {title}
        </Heading>
        {lead ? (
          <p className={`t-lead mt-4 max-w-2xl ${centered ? "mx-auto" : ""} ${onDark ? "text-on-dark-soft" : "text-ink-soft"}`}>
            {lead}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
