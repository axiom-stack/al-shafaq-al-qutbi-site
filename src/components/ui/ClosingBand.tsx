import type {ReactNode} from "react";

type ClosingBandProps = {
  title: string;
  lead?: string;
  actions: ReactNode;
  id?: string;
};

/**
 * The single closing pattern used at the end of a page. A light band with a
 * short orange rule, so it stays distinct from the navy footer below it.
 * Secondary actions passed here should use the `secondary` button variant.
 */
export function ClosingBand({title, lead, actions, id = "final-cta"}: ClosingBandProps) {
  return (
    <section id={id} className="border-t border-line bg-surface">
      <div className="shell section-y-tight">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <span aria-hidden className="block h-1 w-12 rounded-full bg-orange-500" />
            <h2 className="t-h2 mt-6 text-navy-900">{title}</h2>
            {lead ? <p className="t-lead mt-4 text-ink-soft">{lead}</p> : null}
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>
        </div>
      </div>
    </section>
  );
}
