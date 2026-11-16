import type {ReactNode} from "react";

import {type Locale} from "@/i18n/routing";

import {
  isAboutPath,
  isCareersPath,
  isContactPath,
  isCoveragePath,
  isServiceDetailPath,
  isServicesPath,
  normalizeSkeletonPath,
} from "./resolveSkeleton";
import {SkeletonBlock} from "./SkeletonPrimitives";

/*
 * Route skeletons. Each one mirrors the section order and proportions of its
 * page (same shell, same vertical rhythm, same hero heights) so navigation and
 * language switches do not shift the layout. Direction comes from the
 * document, so the same markup serves LTR and RTL.
 */

function Bar({className = "", dark = false}: {className?: string; dark?: boolean}) {
  return <SkeletonBlock className={`rounded-md ${dark ? "skeleton-on-dark" : ""} ${className}`} />;
}

function Lines({count = 3, dark = false, className = ""}: {count?: number; dark?: boolean; className?: string}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({length: count}, (_, index) => (
        <Bar key={index} dark={dark} className={`h-4 ${index === count - 1 ? "w-3/5" : "w-full"}`} />
      ))}
    </div>
  );
}

function NavbarSkeleton() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface shadow-[0_1px_0_var(--color-line)]">
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-4">
        <Bar className="h-9 w-32 sm:h-10 lg:h-11 lg:w-36" />
        <div className="hidden items-center gap-6 lg:flex">
          {Array.from({length: 6}, (_, index) => (
            <Bar key={index} className="h-4 w-16" />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Bar className="h-10 w-20" />
          <Bar className="h-10 w-10 lg:w-28" />
        </div>
      </div>
    </header>
  );
}

function FooterSkeleton() {
  return (
    <footer className="bg-navy-900">
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-[1.5fr_1fr_1fr_1.35fr] lg:gap-x-8 lg:py-20">
        <div className="col-span-2 lg:col-span-1">
          <Bar dark className="h-12 w-44" />
          <Lines dark count={2} className="mt-6 max-w-sm" />
        </div>
        {Array.from({length: 3}, (_, column) => (
          <div key={column} className="space-y-4">
            <Bar dark className="h-4 w-20" />
            {Array.from({length: 4}, (_, row) => (
              <Bar key={row} dark className="h-4 w-32" />
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}

function HeroSkeleton({size = "md", actions = 2}: {size?: "lg" | "md"; actions?: number}) {
  const minHeight =
    size === "lg" ? "lg:min-h-[min(46rem,calc(100svh-var(--header-h)))]" : "lg:min-h-[32rem]";

  return (
    <section className={`bg-navy-900 lg:flex ${minHeight}`}>
      <Bar dark className={`w-full !rounded-none lg:hidden ${size === "lg" ? "h-64 sm:h-96" : "h-52 sm:h-80"}`} />
      <div className="shell flex flex-col pb-12 pt-6 sm:pb-16 sm:pt-8 lg:justify-center lg:py-20">
        <div className="max-w-[44rem]">
          <Bar dark className="h-10 w-full sm:h-12 lg:h-14" />
          <Bar dark className="mt-3 h-10 w-4/5 sm:h-12 lg:h-14" />
          <Lines dark count={3} className="mt-6 max-w-[36rem]" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {Array.from({length: actions}, (_, index) => (
              <Bar key={index} dark className="h-14 w-full sm:w-44" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Band({tone = "paper", children}: {tone?: "paper" | "surface" | "sunken" | "navy"; children: ReactNode}) {
  const bg = {paper: "bg-paper", surface: "bg-surface", sunken: "bg-sunken", navy: "bg-navy-900"}[tone];

  return (
    <section className={`${bg} section-y`}>
      <div className="shell">{children}</div>
    </section>
  );
}

function HeadingSkeleton({dark = false, lead = true}: {dark?: boolean; lead?: boolean}) {
  return (
    <div className="max-w-3xl">
      <Bar dark={dark} className="h-9 w-4/5 lg:h-11" />
      {lead ? <Lines dark={dark} count={2} className="mt-5 max-w-2xl" /> : null}
    </div>
  );
}

function RowsSkeleton({count = 3, dark = false, className = ""}: {count?: number; dark?: boolean; className?: string}) {
  return (
    <div className={className}>
      {Array.from({length: count}, (_, index) => (
        <div key={index} className={`flex gap-4 border-t py-6 ${dark ? "border-white/15" : "border-line"}`}>
          <Bar dark={dark} className="h-11 w-11 shrink-0" />
          <div className="flex-1 space-y-2.5">
            <Bar dark={dark} className="h-4 w-2/5" />
            <Bar dark={dark} className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TileGridSkeleton({count = 6}: {count?: number}) {
  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3">
      {Array.from({length: count}, (_, index) => (
        <div key={index} className="flex items-center gap-4 rounded-card border border-line bg-surface p-3 sm:block sm:p-0">
          <Bar className="h-24 w-24 shrink-0 sm:aspect-[16/10] sm:h-auto sm:w-full sm:rounded-b-none" />
          <div className="flex-1 space-y-2.5 sm:p-6">
            <Bar className="h-5 w-1/2" />
            <Bar className="h-4 w-full" />
            <Bar className="hidden h-4 w-1/3 sm:block" />
          </div>
        </div>
      ))}
    </div>
  );
}

function StepsSkeleton({count = 3, dark = false, columns = "lg:grid-cols-3"}: {count?: number; dark?: boolean; columns?: string}) {
  return (
    <div className={`mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:mt-14 ${columns}`}>
      {Array.from({length: count}, (_, index) => (
        <div key={index} className={`border-t pt-5 ${dark ? "border-white/20" : "border-line-strong"}`}>
          <Bar dark={dark} className="h-8 w-8 !rounded-full" />
          <Bar dark={dark} className="mt-4 h-4 w-1/2" />
          <Bar dark={dark} className="mt-3 h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

function FormSkeleton({rows = 3}: {rows?: number}) {
  return (
    <div className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
      <div className="space-y-5">
        {Array.from({length: rows}, (_, index) => (
          <div key={index} className="space-y-2">
            <Bar className="h-4 w-28" />
            <Bar className="h-12 w-full" />
          </div>
        ))}
        <div className="space-y-2">
          <Bar className="h-4 w-28" />
          <Bar className="h-32 w-full" />
        </div>
        <Bar className="h-14 w-full sm:w-44" />
      </div>
    </div>
  );
}

function LocationSkeleton() {
  return (
    <section className="section-y bg-surface">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
        <div>
          <Bar className="h-9 w-1/2 lg:h-11" />
          <RowsSkeleton count={2} className="mt-8 border-b border-line" />
          <Bar className="mt-8 h-12 w-44" />
        </div>
        <Bar className="min-h-[18rem] !rounded-[var(--radius-media)] lg:min-h-[24rem]" />
      </div>
    </section>
  );
}

function ClosingSkeleton() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="shell section-y-tight">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-2xl">
            <Bar className="h-1 w-12" />
            <Bar className="mt-6 h-9 w-4/5 lg:h-11" />
            <Lines count={2} className="mt-5" />
          </div>
          <Bar className="h-14 w-full sm:w-48" />
        </div>
      </div>
    </section>
  );
}

function SplitSkeleton({rows = 3, media = false}: {rows?: number; media?: boolean}) {
  return (
    <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
      {media ? (
        <Bar className="aspect-[4/3] w-full !rounded-[var(--radius-media)]" />
      ) : (
        <div>
          <Bar className="h-9 w-4/5 lg:h-11" />
          <Lines count={4} className="mt-6" />
        </div>
      )}
      <div>
        {media ? (
          <>
            <Bar className="h-9 w-4/5 lg:h-11" />
            <Lines count={3} className="mt-6" />
          </>
        ) : null}
        <RowsSkeleton count={rows} className={`border-b border-line ${media ? "mt-8" : ""}`} />
      </div>
    </div>
  );
}

function HomeSkeleton() {
  return (
    <>
      <HeroSkeleton size="lg" />
      <Band>
        <HeadingSkeleton />
        <TileGridSkeleton />
      </Band>
      <Band tone="surface">
        <SplitSkeleton />
      </Band>
      <Band tone="navy">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Bar dark className="h-9 w-4/5 lg:h-11" />
            <Lines dark count={3} className="mt-6" />
            <RowsSkeleton dark count={2} className="mt-8 border-b border-white/15" />
          </div>
          <Bar dark className="aspect-[16/11] w-full !rounded-[var(--radius-media)]" />
        </div>
      </Band>
      <ClosingSkeleton />
    </>
  );
}

function AboutSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <Band tone="surface">
        <SplitSkeleton />
      </Band>
      <Band tone="navy">
        <div className="grid gap-12 md:grid-cols-2">
          {Array.from({length: 2}, (_, index) => (
            <div key={index}>
              <Bar dark className="h-6 w-32" />
              <Lines dark count={4} className="mt-5" />
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({length: 4}, (_, index) => (
            <RowsSkeleton key={index} dark count={1} />
          ))}
        </div>
      </Band>
      <Band tone="surface">
        <SplitSkeleton media />
      </Band>
      <Band tone="navy">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Bar dark className="h-9 w-4/5 lg:h-11" />
            <Lines dark count={3} className="mt-6" />
          </div>
          <Bar dark className="aspect-[16/11] w-full !rounded-[var(--radius-media)]" />
        </div>
      </Band>
      <ClosingSkeleton />
    </>
  );
}

function ServicesSkeleton() {
  return (
    <>
      <HeroSkeleton actions={1} />
      <div className="sticky top-[var(--header-h)] z-30 border-b border-line bg-surface">
        <div className="shell flex gap-3 overflow-hidden py-2">
          {Array.from({length: 6}, (_, index) => (
            <Bar key={index} className="h-11 w-28 shrink-0" />
          ))}
        </div>
      </div>
      <Band tone="surface">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <Bar className="h-9 w-4/5 lg:h-11" />
          <Lines count={4} />
        </div>
        <Bar className="mt-14 h-6 w-56 lg:mt-20" />
        <StepsSkeleton count={5} columns="lg:grid-cols-5" />
      </Band>
      <div className="bg-paper">
        <div className="shell">
          {Array.from({length: 3}, (_, index) => (
            <div key={index} className="grid items-center gap-8 border-t border-line py-14 first:border-t-0 lg:grid-cols-2 lg:gap-16 lg:py-24">
              <Bar className={`aspect-[16/11] w-full !rounded-[var(--radius-media)] ${index % 2 === 1 ? "lg:order-2" : ""}`} />
              <div>
                <Bar className="h-9 w-3/5 lg:h-11" />
                <Lines count={3} className="mt-5" />
                <RowsSkeleton count={2} className="mt-6" />
                <Bar className="mt-8 h-12 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ClosingSkeleton />
    </>
  );
}

function ServiceDetailSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <Band tone="surface">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:gap-16 xl:gap-24">
          <div>
            <Bar className="h-9 w-4/5 lg:h-11" />
            <Lines count={5} className="mt-6" />
            <Bar className="mt-12 h-6 w-48" />
            <div className="mt-5 border-b border-line">
              {Array.from({length: 6}, (_, index) => (
                <div key={index} className="grid gap-2 border-t border-line py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <Bar className="h-5 w-36" />
                  <Bar className="h-4 w-full" />
                </div>
              ))}
            </div>
            <Lines count={4} className="mt-12" />
          </div>
          <FormSkeleton />
        </div>
      </Band>
      <Band>
        <HeadingSkeleton lead={false} />
        <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          <RowsSkeleton count={2} />
          <RowsSkeleton count={2} />
          <RowsSkeleton count={2} className="hidden lg:block" />
        </div>
      </Band>
      <Band tone="navy">
        <HeadingSkeleton dark lead={false} />
        <StepsSkeleton count={6} dark />
      </Band>
      <Band>
        <HeadingSkeleton lead={false} />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {Array.from({length: 4}, (_, index) => (
            <div key={index} className="overflow-hidden rounded-card border border-line bg-surface">
              <Bar className="aspect-[16/10] w-full !rounded-none" />
              <div className="p-4 sm:p-5">
                <Bar className="h-5 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </Band>
      <ClosingSkeleton />
    </>
  );
}

function ContactSkeleton() {
  return (
    <>
      <HeaderSkeleton />
      <Band>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <HeadingSkeleton />
            <div className="mt-8">
              <FormSkeleton />
            </div>
          </div>
          <div>
            <HeadingSkeleton />
            <RowsSkeleton count={3} className="mt-8 border-b border-line" />
          </div>
        </div>
      </Band>
      <LocationSkeleton />
    </>
  );
}

function HeaderSkeleton() {
  return (
    <section className="bg-navy-900">
      <div className="shell py-12 sm:py-14 lg:py-16">
        <div className="max-w-[44rem]">
          <Bar dark className="h-10 w-4/5 sm:h-12 lg:h-14" />
          <Lines dark count={3} className="mt-6" />
          <Bar dark className="mt-8 h-14 w-full sm:w-44" />
        </div>
      </div>
    </section>
  );
}

function CareersSkeleton() {
  return (
    <>
      <HeaderSkeleton />
      <Band tone="surface">
        <SplitSkeleton media />
      </Band>
      <Band>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <HeadingSkeleton />
            <div className="mt-8">
              <FormSkeleton rows={5} />
            </div>
          </div>
          <div>
            <HeadingSkeleton />
            <StepsSkeleton count={4} columns="!grid-cols-1" />
          </div>
        </div>
      </Band>
    </>
  );
}

function CoverageSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <Band tone="surface">
        <SplitSkeleton rows={2} />
      </Band>
      <Band tone="navy">
        <div className="grid gap-12 md:grid-cols-2">
          {Array.from({length: 2}, (_, index) => (
            <div key={index}>
              <Bar dark className="h-6 w-40" />
              <Lines dark count={3} className="mt-5" />
            </div>
          ))}
        </div>
      </Band>
      <Band>
        <div className="grid gap-6 sm:grid-cols-3">
          {Array.from({length: 3}, (_, index) => (
            <Bar key={index} className="aspect-[4/3] w-full !rounded-[var(--radius-media)]" />
          ))}
        </div>
      </Band>
      <LocationSkeleton />
      <ClosingSkeleton />
    </>
  );
}

function resolveBody(pathname: string) {
  if (isCoveragePath(pathname)) {
    return <CoverageSkeleton />;
  }

  if (isCareersPath(pathname)) {
    return <CareersSkeleton />;
  }

  if (isContactPath(pathname)) {
    return <ContactSkeleton />;
  }

  if (isAboutPath(pathname)) {
    return <AboutSkeleton />;
  }

  if (isServiceDetailPath(pathname)) {
    return <ServiceDetailSkeleton />;
  }

  if (isServicesPath(pathname)) {
    return <ServicesSkeleton />;
  }

  return <HomeSkeleton />;
}

export function PageSkeleton({pathname}: {locale: Locale; pathname: string}) {
  const normalizedPath = normalizeSkeletonPath(pathname);

  return (
    <div role="status" aria-busy="true">
      <NavbarSkeleton />
      <main className="pt-[var(--header-h)]">{resolveBody(normalizedPath)}</main>
      <FooterSkeleton />
    </div>
  );
}
