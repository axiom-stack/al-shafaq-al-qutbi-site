import {isRTL, type Locale} from "@/i18n/routing";

import {SkeletonBlock, SkeletonCircle, SkeletonText} from "./SkeletonPrimitives";
import {
  isAboutPath,
  isCareersPath,
  isContactPath,
  isServiceDetailPath,
  isServicesPath,
  normalizeSkeletonPath,
} from "./resolveSkeleton";

function PublicNavbarSkeleton({locale}: {locale: Locale}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e2e1ec] bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-2 py-2 sm:px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <SkeletonBlock className="h-12 w-32 rounded-xl" />
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          {Array.from({length: 6}, (_, index) => (
            <SkeletonBlock key={index} className="h-3.5 w-16 rounded-full" />
          ))}
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="inline-flex items-center rounded-full border border-outline-variant bg-white p-1 shadow-sm">
            <SkeletonBlock className="h-7 w-12 rounded-full" />
            <SkeletonBlock className="h-7 w-12 rounded-full" />
          </div>
          <SkeletonBlock className="h-10 w-28 rounded-md" />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <div className="inline-flex items-center rounded-full border border-outline-variant bg-white p-1 shadow-sm">
            <SkeletonBlock className="h-7 w-12 rounded-full" />
            <SkeletonBlock className="h-7 w-12 rounded-full" />
          </div>
          <SkeletonBlock className="h-10 w-10 rounded-md" />
        </div>
      </div>

      <div
        className="border-t border-outline-variant/40 bg-white px-4 py-4 lg:hidden text-start"
      >
        <div className="flex flex-col gap-4">
          {Array.from({length: 4}, (_, index) => (
            <SkeletonBlock key={index} className="h-4 w-28 rounded-full" />
          ))}
        </div>
      </div>
    </header>
  );
}

function PublicFooterSkeleton({locale}: {locale: Locale}) {
  return (
    <footer className="border-t-4 border-alfs-orange bg-alfs-deep-blue text-white">
      <div
        className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] lg:px-8 text-start"
      >
        <div className="space-y-4">
          <SkeletonBlock className="h-14 w-40 rounded-xl bg-white/14" />
        </div>

        {Array.from({length: 2}, (_, columnIndex) => (
          <div key={columnIndex}>
            <SkeletonBlock className="mb-4 h-4 w-28 rounded-full bg-white/16" />
            <div className="space-y-3">
              {Array.from({length: 4}, (_, itemIndex) => (
                <SkeletonBlock
                  key={itemIndex}
                  className="h-3.5 w-24 rounded-full bg-white/14"
                />
              ))}
            </div>
          </div>
        ))}

        <div>
          <SkeletonBlock className="mb-4 h-4 w-24 rounded-full bg-white/16" />
          <div className="space-y-4">
            {Array.from({length: 3}, (_, index) => (
              <div key={index} className="flex items-start gap-3">
                <SkeletonCircle className="mt-0.5 h-[18px] w-[18px] bg-white/18" />
                <SkeletonText
                  className="w-full"
                  lineClassName="bg-white/14"
                  lines={index === 0 ? 2 : 1}
                  lastLineWidth={index === 0 ? "72%" : "62%"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 lg:px-8">
          <SkeletonBlock className="h-3.5 w-56 rounded-full bg-white/12" />
        </div>
      </div>
    </footer>
  );
}

function HomeSkeleton({locale}: {locale: Locale}) {
  const sideHeadingAccentClass = "me-auto ms-0";
  const aboutFeatureGlowClass = "-start-4 -top-4";

  return (
    <>
      <PublicNavbarSkeleton locale={locale} />
      <main id="top" className="min-h-screen bg-[#fbf8ff] pt-[56px]">
        <section className="relative overflow-hidden bg-alfs-deep-blue px-4 pb-24 pt-0 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[rgba(13,31,92,0.9)]" />

          <div className="relative mx-auto grid w-full max-w-[1360px] gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 lg:py-10 text-start">
              <SkeletonBlock className="h-16 max-w-[760px] rounded-[1.5rem] bg-white/12 sm:h-20 lg:h-24" />
              <SkeletonText
                className="mt-5 max-w-[670px]"
                lineClassName="h-5 rounded-full bg-white/12"
                lines={3}
                lastLineWidth="76%"
              />

              <div className="mt-7 flex flex-wrap gap-3">
                <SkeletonBlock className="h-12 w-40 rounded-md bg-white/16" />
                <SkeletonBlock className="h-12 w-36 rounded-md bg-white/10" />
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {Array.from({length: 6}, (_, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-1.5"
                  >
                    <SkeletonCircle className="h-3.5 w-3.5 bg-white/18" />
                    <SkeletonBlock className="h-3 w-20 rounded-full bg-white/18" />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="hidden lg:col-span-4 lg:flex lg:justify-end"
            >
              <div className="w-full max-w-[344px] rounded-2xl border border-white/18 bg-white/10 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
                <div className="mb-5 flex items-center gap-2">
                  <SkeletonCircle className="h-5 w-5 bg-white/18" />
                  <SkeletonBlock className="h-5 w-32 rounded-full bg-white/18" />
                </div>
                <div className="space-y-4">
                  {Array.from({length: 3}, (_, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <SkeletonCircle className="mt-0.5 h-5 w-5 bg-white/18" />
                      <div className="w-full space-y-2">
                        <SkeletonBlock className="h-4 w-28 rounded-full bg-white/18" />
                        <SkeletonBlock className="h-3 w-full rounded-full bg-white/14" />
                        <SkeletonBlock className="h-3 w-5/6 rounded-full bg-white/14" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-9 mb-12 max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-12">
            {Array.from({length: 4}, (_, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#e1deec] bg-[#fbf8ff] px-5 py-6 text-center shadow-[0_8px_24px_rgba(26,47,122,0.12)] md:col-span-1 lg:col-span-3"
              >
                <SkeletonCircle className="mx-auto h-11 w-11 bg-alfs-navy/8" />
                <SkeletonBlock className="mx-auto mt-4 h-4 w-28 rounded-full" />
                <SkeletonText
                  className="mx-auto mt-2 max-w-[210px]"
                  lines={2}
                  lineClassName="h-3 rounded-full"
                  lastLineWidth="74%"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="max-w-[560px] text-start">
              <SkeletonBlock className="h-12 w-full max-w-[420px] rounded-[1.25rem]" />
              <SkeletonBlock
                className={`mt-5 h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
              <SkeletonText className="mt-6" lines={4} lastLineWidth="66%" />

              <div className="mt-7 space-y-3">
                {Array.from({length: 2}, (_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <SkeletonCircle className="h-5 w-5 bg-alfs-orange/70" />
                    <SkeletonBlock className="h-4 w-56 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <article className="relative overflow-hidden rounded-2xl bg-alfs-deep-blue p-7 shadow-[0_8px_24px_rgba(26,47,122,0.12)] md:col-span-2">
                <div
                  className={`absolute h-28 w-28 rounded-full bg-alfs-royal-blue/35 blur-2xl ${aboutFeatureGlowClass}`}
                />
                <div className="relative">
                  <SkeletonCircle className="h-8 w-8 bg-white/14" />
                  <SkeletonBlock className="mt-4 h-6 w-44 rounded-full bg-white/14" />
                  <SkeletonText
                    className="mt-3 max-w-[410px]"
                    lineClassName="h-3.5 rounded-full bg-white/14"
                    lines={2}
                    lastLineWidth="72%"
                  />
                </div>
              </article>

              {Array.from({length: 2}, (_, index) => (
                <article
                  key={index}
                  className="rounded-2xl border border-outline-variant/40 bg-white p-6 shadow-sm"
                >
                  <SkeletonCircle className="h-7 w-7 bg-alfs-navy/10" />
                  <SkeletonBlock className="mt-4 h-4 w-32 rounded-full" />
                  <SkeletonText className="mt-2" lines={2} lastLineWidth="78%" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f2eff8] px-4 py-[4.5rem] sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="text-center">
              <SkeletonBlock className="mx-auto h-12 w-72 rounded-[1.25rem]" />
              <SkeletonBlock className="mx-auto mt-4 h-[3px] w-[52px] rounded-full bg-alfs-orange" />
              <SkeletonText className="mx-auto mt-4 max-w-[620px]" lines={2} lastLineWidth="72%" />
            </div>

            <div className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({length: 6}, (_, index) => (
                <article
                  key={index}
                  className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-white shadow-[0_4px_16px_rgba(26,47,122,0.08)]"
                >
                  <div className="h-1.5 w-full bg-light-grey" />
                  <div className="p-7">
                    <SkeletonCircle className="h-8 w-8 bg-alfs-navy/10" />
                    <SkeletonBlock className="mt-5 h-6 w-40 rounded-full" />
                    <SkeletonText className="mt-3 min-h-[72px]" lines={3} lastLineWidth="68%" />
                    <SkeletonBlock className="mt-5 h-4 w-28 rounded-full bg-alfs-orange/25" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-alfs-deep-blue px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,92,0.95)_0%,rgba(13,31,92,0.68)_42%,rgba(13,31,92,0.88)_100%)] opacity-90" />

          <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 text-start">
              <SkeletonBlock className="h-12 w-full max-w-[330px] rounded-[1.25rem] bg-white/14" />
              <SkeletonBlock
                className={`mt-5 h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
              <SkeletonText
                className="mt-5 max-w-[430px]"
                lineClassName="h-4 rounded-full bg-white/14"
                lines={3}
                lastLineWidth="72%"
              />

              <div className="mt-8 space-y-4">
                {Array.from({length: 2}, (_, index) => (
                  <article
                    key={index}
                    className="bg-white/10 py-4 backdrop-blur-sm border-s-[3px] border-s-alfs-orange sm:border-s-4 rounded-e-2xl"
                  >
                    <div className="flex items-center gap-2 px-4">
                      <SkeletonCircle className="h-[18px] w-[18px] bg-white/18" />
                      <SkeletonBlock className="h-4 w-36 rounded-full bg-white/18" />
                    </div>
                    <div className="ps-10 pt-2 pe-4">
                      <SkeletonBlock className="h-3 w-full rounded-full bg-white/14" />
                      <SkeletonBlock className="mt-2 h-3 w-4/5 rounded-full bg-white/14" />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative min-h-[280px] lg:col-span-7 lg:min-h-[430px]">
              <div className="absolute inset-8 rounded-[2rem] border border-white/12 bg-white/6" />
            </div>
          </div>
        </section>

        <section className="bg-alfs-orange px-4 py-14 text-center text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[760px]">
            <SkeletonBlock className="mx-auto h-12 w-full max-w-[460px] rounded-[1.25rem] bg-white/18" />
            <SkeletonText
              className="mx-auto mt-4 max-w-[520px]"
              lineClassName="h-4 rounded-full bg-white/16"
              lines={2}
              lastLineWidth="74%"
            />
            <SkeletonBlock className="mx-auto mt-7 h-12 w-40 rounded-md bg-white/28" />
          </div>
        </section>

        <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-8 text-center">
              <SkeletonBlock className="mx-auto h-10 w-48 rounded-full" />
              <SkeletonBlock className="mx-auto mt-4 h-[3px] w-[52px] rounded-full bg-alfs-orange" />
            </div>
            <SkeletonBlock className="h-[450px] w-full rounded-2xl" />
          </div>
        </section>
      </main>
      <PublicFooterSkeleton locale={locale} />
      <div
        className="fixed bottom-4 z-40 h-12 w-12 rounded-full bg-[#25D366]/85 shadow-[0_14px_30px_rgba(0,0,0,0.18)] sm:bottom-6 start-4 sm:start-6"
        aria-hidden="true"
      />
    </>
  );
}

function AboutSkeleton({locale}: {locale: Locale}) {
  const sideHeadingAccentClass = "me-auto ms-0";
  const officeCardClass = "border-s-4 border-e-0 text-start";

  return (
    <>
      <PublicNavbarSkeleton locale={locale} />
      <main className="min-h-screen bg-[#fbf8ff] pt-[72px]">
        <section className="relative overflow-hidden bg-alfs-deep-blue">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,92,0.92)_0%,rgba(13,31,92,0.82)_40%,rgba(13,31,92,0.34)_100%)]" />

          <div className="relative mx-auto grid max-w-[1280px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-16">
            <div className="lg:col-span-7 text-start">
              <SkeletonBlock className="h-3.5 w-24 rounded-full bg-alfs-orange/50" />
              <SkeletonBlock className="mt-3 h-16 w-full max-w-[620px] rounded-[1.5rem] bg-white/12 sm:h-20 lg:h-24" />
              <SkeletonText
                className="mt-5 max-w-[610px]"
                lineClassName="h-4 rounded-full bg-white/12"
                lines={3}
                lastLineWidth="72%"
              />

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <SkeletonBlock className="h-11 w-40 rounded-md bg-white/16" />
                <SkeletonBlock className="h-11 w-40 rounded-md bg-white/10" />
              </div>
            </div>

            <div
              className="lg:col-span-5 lg:justify-self-end"
            >
              <div className="max-w-[350px] rounded-[18px] border border-white/18 bg-white/14 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-md">
                <SkeletonBlock className="h-8 w-32 rounded-full bg-white/18" />
                <div className="mt-5 space-y-3">
                  {Array.from({length: 6}, (_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <SkeletonCircle className="h-8 w-8 bg-white/16" />
                      <SkeletonBlock className="h-4 w-32 rounded-full bg-white/16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="max-w-[510px] text-start">
              <SkeletonBlock className="h-12 w-full max-w-[330px] rounded-[1.25rem]" />
              <SkeletonBlock
                className={`mt-5 h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
              <SkeletonText className="mt-6" lines={4} lastLineWidth="70%" />
            </div>

            <div className="space-y-3 text-start">
              {Array.from({length: 3}, (_, index) => (
                <article
                  key={index}
                  className="rounded-[14px] border border-[#ebe8f3] bg-white px-5 py-4 shadow-[0_14px_30px_rgba(26,47,122,0.10)]"
                >
                  <div className="flex items-start gap-4">
                    <SkeletonCircle className="mt-0.5 h-10 w-10 bg-[#f3f5ff]" />
                    <div className="w-full">
                      <SkeletonBlock className="h-4 w-40 rounded-full" />
                      <SkeletonText className="mt-2" lines={2} lastLineWidth="78%" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-alfs-deep-blue px-4 py-14 sm:px-6 lg:px-8 lg:py-[4.5rem]">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative mx-auto grid max-w-[1280px] gap-4 md:grid-cols-2">
            {Array.from({length: 2}, (_, index) => (
              <article
                key={index}
                className="rounded-[12px] bg-white px-6 py-8 text-center shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
              >
                <SkeletonBlock className="mx-auto h-8 w-36 rounded-full" />
                <SkeletonBlock className="mx-auto mt-3 h-[3px] w-[52px] rounded-full bg-alfs-orange" />
                <SkeletonText className="mx-auto mt-5 max-w-[420px]" lines={3} lastLineWidth="74%" />
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f2eff8] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-[880px] text-center">
              <SkeletonBlock className="mx-auto h-12 w-72 rounded-[1.25rem]" />
              <SkeletonBlock className="mx-auto mt-5 h-[3px] w-[52px] rounded-full bg-alfs-orange" />
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({length: 4}, (_, index) => (
                <article
                  key={index}
                  className="rounded-[12px] border border-[#e8e4ef] bg-white px-5 py-6 text-center shadow-[0_12px_28px_rgba(26,47,122,0.10)]"
                >
                  <SkeletonCircle className="mx-auto h-12 w-12 bg-alfs-orange/10" />
                  <SkeletonBlock className="mx-auto mt-4 h-4 w-28 rounded-full" />
                  <SkeletonText className="mx-auto mt-2 max-w-[220px]" lines={2} lastLineWidth="76%" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-center">
            <div
              className="relative overflow-hidden rounded-[14px] shadow-[0_18px_36px_rgba(26,47,122,0.14)] order-2 lg:order-1"
            >
              <SkeletonBlock className="aspect-[22/19] w-full rounded-[14px]" />
            </div>

            <div className="order-1 text-start lg:order-2">
              <SkeletonBlock className="h-12 w-full max-w-[420px] rounded-[1.25rem]" />
              <SkeletonBlock
                className={`mt-5 h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
              <SkeletonText className="mt-6 max-w-[540px]" lines={3} lastLineWidth="72%" />

              <div className="mt-7 space-y-5">
                {Array.from({length: 3}, (_, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <SkeletonCircle className="mt-1 h-10 w-10 bg-alfs-orange/10" />
                    <div className="w-full text-start">
                      <SkeletonBlock className="h-4 w-36 rounded-full" />
                      <SkeletonText className="mt-2" lines={2} lastLineWidth="76%" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#f7f5fb] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="text-start">
              <SkeletonBlock className="h-12 w-full max-w-[360px] rounded-[1.25rem]" />
              <SkeletonBlock
                className={`mt-5 h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
              <SkeletonText className="mt-6 max-w-[570px]" lines={3} lastLineWidth="70%" />

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {Array.from({length: 1}, (_, index) => (
                  <article
                    key={index}
                    className={`rounded-[10px] bg-white px-5 py-4 shadow-[0_12px_24px_rgba(26,47,122,0.08)] ${officeCardClass}`}
                  >
                    <div className="flex items-center gap-2">
                      <SkeletonCircle className="h-[18px] w-[18px] bg-alfs-orange/30" />
                      <SkeletonBlock className="h-4 w-24 rounded-full" />
                    </div>
                    <SkeletonText className="mt-3" lines={2} lastLineWidth="72%" />
                  </article>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[450px]">
              <div className="absolute inset-0 rounded-full bg-alfs-navy/6 blur-3xl" />
              <div className="relative aspect-square w-full rounded-full border border-alfs-navy/12 bg-white/70">
                <div className="absolute inset-10 rounded-full border border-dashed border-alfs-navy/18" />
                <div className="absolute inset-20 rounded-full border border-dashed border-alfs-navy/18" />
                <SkeletonCircle className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 bg-alfs-orange" />
                {[
                  "left-[20%] top-[18%]",
                  "right-[10%] top-[24%]",
                  "right-[16%] bottom-[14%]",
                  "left-[14%] bottom-[18%]",
                  "left-1/2 top-[10%] -translate-x-1/2",
                ].map((positionClass) => (
                  <SkeletonCircle
                    key={positionClass}
                    className={`absolute h-4 w-4 bg-alfs-navy/45 ${positionClass}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-alfs-deep-blue px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative mx-auto max-w-[760px]">
            <SkeletonBlock className="mx-auto h-12 w-full max-w-[460px] rounded-[1.25rem] bg-white/14" />
            <SkeletonText
              className="mx-auto mt-5 max-w-[580px]"
              lineClassName="h-4 rounded-full bg-white/12"
              lines={2}
              lastLineWidth="72%"
            />
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <SkeletonBlock className="h-11 w-40 rounded-md bg-white/16" />
              <SkeletonBlock className="h-11 w-40 rounded-md bg-white/10" />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-white/16 pt-6">
              {Array.from({length: 2}, (_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <SkeletonCircle className="h-4 w-4 bg-alfs-orange/40" />
                  <SkeletonBlock className="h-4 w-32 rounded-full bg-white/14" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-8 text-center">
              <SkeletonBlock className="mx-auto h-10 w-48 rounded-full" />
              <SkeletonBlock className="mx-auto mt-4 h-[3px] w-[52px] rounded-full bg-alfs-orange" />
            </div>
            <SkeletonBlock className="h-[450px] w-full rounded-2xl" />
          </div>
        </section>
      </main>

      <PublicFooterSkeleton locale={locale} />
      <div
        className="fixed bottom-4 z-40 h-12 w-12 rounded-full bg-[#25D366]/85 shadow-[0_14px_30px_rgba(0,0,0,0.18)] sm:bottom-6 start-4 sm:start-6"
        aria-hidden="true"
      />
    </>
  );
}

function ServicesSkeleton({locale}: {locale: Locale}) {
  return (
    <>
      <PublicNavbarSkeleton locale={locale} />
      <main className="min-h-screen bg-[#fbf8ff] pt-[56px]">
        <section className="relative flex min-h-[520px] items-center overflow-hidden bg-alfs-deep-blue px-4 pb-20 pt-10 sm:min-h-[600px] sm:px-6 lg:min-h-[720px] lg:px-8">
          <SkeletonBlock
            aria-hidden
            className="absolute inset-0 min-h-full bg-alfs-royal-blue/35"
          />
          <div className="relative z-20 mx-auto w-full max-w-[1280px]">
            <ServicesHeroSkeleton />
          </div>
        </section>
        <section className="relative z-10 mx-auto -mt-9 mb-12 max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({length: 4}, (_, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#e1deec] bg-[#fbf8ff] px-6 py-8 text-center shadow-[0_8px_30px_rgba(26,47,122,0.12)]"
              >
                <SkeletonCircle className="mx-auto h-16 w-16 bg-alfs-navy/8" />
                <SkeletonBlock className="mx-auto mt-4 h-4 w-28 rounded-full" />
                <SkeletonText className="mx-auto mt-2 max-w-[200px]" lines={2} lastLineWidth="70%" />
              </div>
            ))}
          </div>
        </section>
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2">
            <SkeletonText lines={4} lastLineWidth="68%" />
            <SkeletonBlock className="h-80 rounded-xl bg-alfs-deep-blue/20" />
          </div>
        </section>
        <section className="bg-[#f2eff8] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <SkeletonBlock className="mx-auto h-10 w-64 rounded-full" />
            <div className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-2">
              {Array.from({length: 6}, (_, index) => (
                <SkeletonBlock key={index} className="min-h-[220px] rounded-xl" />
              ))}
            </div>
          </div>
        </section>
        {Array.from({length: 6}, (_, index) => (
          <section key={index} className="border-t border-outline-variant/30 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2 lg:items-center">
              <SkeletonBlock className="h-[380px] rounded-xl sm:h-[500px]" />
              <SkeletonText lines={5} lastLineWidth="72%" />
            </div>
          </section>
        ))}
      </main>
      <PublicFooterSkeleton locale={locale} />
      <div
        className="fixed bottom-4 z-40 h-12 w-12 rounded-full bg-[#25D366]/85 shadow-[0_14px_30px_rgba(0,0,0,0.18)] sm:bottom-6 start-4 sm:start-6"
        aria-hidden="true"
      />
    </>
  );
}

function ServicesHeroSkeleton() {
  return (
    <div className="relative mx-auto max-w-[1280px] text-start">
      <SkeletonBlock className="h-4 w-40 rounded-full bg-white/14" />
      <SkeletonBlock className="mt-4 h-16 w-full max-w-[620px] rounded-[1.5rem] bg-white/12 sm:h-20" />
      <SkeletonText
        className="mt-5 w-full max-w-[670px]"
        lineClassName="h-4 rounded-full bg-white/12"
        lines={3}
        lastLineWidth="76%"
      />
      <ServicesHeroSkeletonChips />
    </div>
  );
}

function ServicesHeroSkeletonChips() {
  return (
    <div className="mt-7 flex flex-wrap gap-2">
      {Array.from({length: 6}, (_, index) => (
        <SkeletonBlock key={index} className="h-8 w-24 rounded-full bg-white/14" />
      ))}
    </div>
  );
}

function AirFreightSkeleton({locale}: {locale: Locale}) {
  const sideHeadingAccentClass = "me-auto ms-0";

  return (
    <>
      <PublicNavbarSkeleton locale={locale} />
      <main className="min-h-screen bg-[#fbf8ff] pt-[56px]">
        <section className="relative flex min-h-[520px] items-center overflow-hidden bg-alfs-deep-blue px-4 py-12 sm:min-h-[600px] sm:px-6 lg:min-h-[640px] lg:px-8 lg:py-16">
          <SkeletonBlock
            aria-hidden
            className="absolute inset-0 min-h-full bg-alfs-royal-blue/35"
          />
          <div className="relative z-20 mx-auto w-full max-w-[1280px]">
            <ServiceDetailHeroTextSkeleton />
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_0.4fr]">
            <div className="max-w-[640px] text-start">
              <SkeletonBlock className="h-12 w-full max-w-[420px] rounded-[1.25rem]" />
              <SkeletonBlock
                className={`mt-5 h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
              <SkeletonText className="mt-6" lines={3} lastLineWidth="70%" />
            </div>
            <div className="text-start lg:text-end">
              <SkeletonBlock className="h-4 w-36 rounded-full" />
            </div>
          </div>
        </section>

        <section className="bg-[#f2eff8] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-[760px] text-center">
              <SkeletonBlock className="mx-auto h-10 w-64 rounded-full" />
              <SkeletonBlock className="mx-auto mt-4 h-[3px] w-[52px] rounded-full bg-alfs-orange" />
              <SkeletonText className="mx-auto mt-5 max-w-[520px]" lines={2} lastLineWidth="72%" />
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({length: 6}, (_, index) => (
                <article
                  key={index}
                  className="rounded-[12px] border border-[#e8e4ef] bg-white px-5 py-6 shadow-[0_12px_28px_rgba(26,47,122,0.10)]"
                >
                  <SkeletonCircle className="h-11 w-11 bg-alfs-orange/10" />
                  <SkeletonBlock className="mt-4 h-4 w-32 rounded-full" />
                  <SkeletonText className="mt-2" lines={2} lastLineWidth="76%" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <AirFreightBenefitsSkeleton
            sideHeadingAccentClass={sideHeadingAccentClass}
          />
        </section>

        <section className="bg-alfs-deep-blue px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <SkeletonBlock className="mx-auto h-10 w-48 rounded-full bg-white/14" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({length: 4}, (_, index) => (
                <SkeletonBlock key={index} className="h-40 rounded-[12px] bg-white/8" />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-alfs-deep-blue px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[760px]">
            <SkeletonBlock className="mx-auto h-12 w-full max-w-[460px] rounded-[1.25rem] bg-white/14" />
            <SkeletonText
              className="mx-auto mt-5 max-w-[520px]"
              lineClassName="bg-white/12"
              lines={2}
              lastLineWidth="72%"
            />
            <SkeletonBlock className="mx-auto mt-8 h-11 w-40 rounded-md bg-white/16" />
          </div>
        </section>
      </main>
      <PublicFooterSkeleton locale={locale} />
      <div
        className="fixed bottom-4 z-40 h-12 w-12 rounded-full bg-[#25D366]/85 shadow-[0_14px_30px_rgba(0,0,0,0.18)] sm:bottom-6 start-4 sm:start-6"
        aria-hidden="true"
      />
    </>
  );
}

function ServiceDetailHeroTextSkeleton() {
  return (
    <div className="max-w-[760px] text-start">
      <SkeletonBlock className="h-3.5 w-32 rounded-full bg-alfs-orange/50" />
      <SkeletonBlock className="mt-3 h-16 w-full max-w-[640px] rounded-[1.5rem] bg-white/12 sm:h-20 lg:h-24" />
      <SkeletonText
        className="mt-5 max-w-[580px]"
        lineClassName="h-4 rounded-full bg-white/12"
        lines={3}
        lastLineWidth="72%"
      />
      <ServiceDetailHeroChipsSkeleton />
      <ServiceDetailHeroCtasSkeleton />
    </div>
  );
}

function ServiceDetailHeroChipsSkeleton() {
  return (
    <div className="mt-7 flex flex-wrap gap-2">
      {Array.from({length: 5}, (_, index) => (
        <SkeletonBlock key={index} className="h-8 w-24 rounded-full bg-white/14" />
      ))}
    </div>
  );
}

function ServiceDetailHeroCtasSkeleton() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <SkeletonBlock className="h-11 w-40 rounded-md bg-white/16" />
      <SkeletonBlock className="h-11 w-36 rounded-md bg-white/10" />
    </div>
  );
}

function AirFreightBenefitsSkeleton({
  sideHeadingAccentClass,
}: {
  sideHeadingAccentClass: string;
}) {
  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="max-w-[560px] text-start">
        <SkeletonBlock className="h-12 w-full max-w-[360px] rounded-[1.25rem]" />
        <SkeletonBlock
          className={`mt-5 h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
        />
        <SkeletonText className="mt-6" lines={2} lastLineWidth="70%" />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({length: 6}, (_, index) => (
          <SkeletonBlock key={index} className="h-24 rounded-[12px]" />
        ))}
      </div>
    </div>
  );
}

function ContactSkeleton({locale}: {locale: Locale}) {
  const sideHeadingAccentClass = "me-auto ms-0";

  return (
    <>
      <PublicNavbarSkeleton locale={locale} />
      <main className="min-h-screen bg-[#fbf8ff] pt-[56px]">
        <section className="relative overflow-hidden bg-alfs-deep-blue">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,92,0.92)_0%,rgba(13,31,92,0.82)_40%,rgba(13,31,92,0.34)_100%)]" />
          <div className="relative mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-16">
            <div className="lg:col-span-7 text-start">
              <SkeletonBlock className="h-3.5 w-24 rounded-full bg-alfs-orange/50" />
              <SkeletonBlock className="mt-3 h-16 w-full max-w-[640px] rounded-[1.5rem] bg-white/12 sm:h-20" />
              <SkeletonText
                className="mt-5 max-w-[600px]"
                lineClassName="h-4 rounded-full bg-white/12"
                lines={3}
                lastLineWidth="72%"
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <SkeletonBlock className="h-11 w-40 rounded-md bg-white/16" />
                <SkeletonBlock className="h-11 w-40 rounded-md bg-white/10" />
              </div>
            </div>
            <div
              className="lg:col-span-5 lg:justify-self-end"
            >
              <div className="max-w-[350px] rounded-[18px] border border-white/18 bg-white/14 p-6 backdrop-blur-md">
                <SkeletonBlock className="h-8 w-32 rounded-full bg-white/18" />
                <div className="mt-5 space-y-3">
                  {Array.from({length: 3}, (_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <SkeletonCircle className="h-8 w-8 bg-white/16" />
                      <SkeletonBlock className="h-4 w-32 rounded-full bg-white/16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f2eff8] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1280px] text-center">
            <SkeletonBlock className="mx-auto h-10 w-64 rounded-[1.25rem]" />
            <SkeletonText className="mx-auto mt-4 max-w-[620px]" lines={2} lastLineWidth="60%" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {Array.from({length: 3}, (_, index) => (
                <SkeletonBlock key={index} className="h-44 rounded-2xl" />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2">
            <div className="text-start">
              <SkeletonBlock className="h-12 w-full max-w-[360px] rounded-[1.25rem]" />
              <SkeletonText className="mt-4" lines={2} lastLineWidth="70%" />
              <SkeletonBlock className="mt-8 h-[420px] rounded-[14px]" />
            </div>
            <div className="text-start">
              <SkeletonBlock className="h-12 w-full max-w-[280px] rounded-[1.25rem]" />
              <SkeletonBlock
                className={`mt-5 h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
              <SkeletonText className="mt-5" lines={2} lastLineWidth="68%" />
              <div className="mt-7 space-y-4">
                {Array.from({length: 1}, (_, index) => (
                  <SkeletonBlock key={index} className="h-24 rounded-[10px]" />
                ))}
              </div>
              <SkeletonBlock className="mt-8 h-28 rounded-[14px]" />
            </div>
          </div>
        </section>

        <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-8 text-center">
              <SkeletonBlock className="mx-auto h-10 w-48 rounded-full" />
              <SkeletonBlock className="mx-auto mt-4 h-[3px] w-[52px] rounded-full bg-alfs-orange" />
            </div>
            <SkeletonBlock className="h-[450px] w-full rounded-2xl" />
          </div>
        </section>

        <section className="bg-alfs-orange px-4 py-14 text-center text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[760px]">
            <SkeletonBlock className="mx-auto h-12 w-full max-w-[460px] rounded-[1.25rem] bg-white/18" />
            <SkeletonText
              className="mx-auto mt-4 max-w-[520px]"
              lineClassName="h-4 rounded-full bg-white/16"
              lines={2}
              lastLineWidth="74%"
            />
            <SkeletonBlock className="mx-auto mt-7 h-12 w-40 rounded-md bg-white/28" />
          </div>
        </section>
      </main>
      <PublicFooterSkeleton locale={locale} />
      <div
        className="fixed bottom-4 z-40 h-12 w-12 rounded-full bg-[#25D366]/85 shadow-[0_14px_30px_rgba(0,0,0,0.18)] sm:bottom-6 start-4 sm:start-6"
        aria-hidden="true"
      />
    </>
  );
}

function CareersSkeleton({locale}: {locale: Locale}) {
  const sideHeadingAccentClass = "me-auto ms-0";

  return (
    <>
      <PublicNavbarSkeleton locale={locale} />
      <main className="min-h-screen bg-[#fbf8ff] pt-[56px]">
        <section className="relative overflow-hidden bg-alfs-deep-blue">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,92,0.92)_0%,rgba(13,31,92,0.82)_40%,rgba(13,31,92,0.34)_100%)]" />
          <div className="relative mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-16">
            <div className="lg:col-span-7 text-start">
              <SkeletonBlock className="h-3.5 w-24 rounded-full bg-alfs-orange/50" />
              <SkeletonBlock className="mt-3 h-16 w-full max-w-[640px] rounded-[1.5rem] bg-white/12 sm:h-20" />
              <SkeletonText
                className="mt-5 max-w-[600px]"
                lineClassName="h-4 rounded-full bg-white/12"
                lines={3}
                lastLineWidth="72%"
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <SkeletonBlock className="h-11 w-36 rounded-md bg-white/16" />
                <SkeletonBlock className="h-11 w-40 rounded-md bg-white/10" />
              </div>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <div className="max-w-[350px] rounded-[18px] border border-white/18 bg-white/14 p-6 backdrop-blur-md">
                <SkeletonBlock className="h-8 w-32 rounded-full bg-white/18" />
                <div className="mt-5 space-y-3">
                  {Array.from({length: 3}, (_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <SkeletonCircle className="h-8 w-8 bg-white/16" />
                      <SkeletonBlock className="h-4 w-32 rounded-full bg-white/16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f2eff8] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1280px] text-center">
            <SkeletonBlock className="mx-auto h-10 w-64 rounded-[1.25rem]" />
            <SkeletonText className="mx-auto mt-4 max-w-[620px]" lines={2} lastLineWidth="60%" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {Array.from({length: 3}, (_, index) => (
                <SkeletonBlock key={index} className="h-40 rounded-2xl" />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2">
            <div className="text-start">
              <SkeletonBlock className="h-12 w-full max-w-[360px] rounded-[1.25rem]" />
              <SkeletonText className="mt-4" lines={2} lastLineWidth="70%" />
              <SkeletonBlock className="mt-8 h-[480px] rounded-[14px]" />
            </div>
            <div className="text-start">
              <SkeletonBlock className="h-12 w-full max-w-[280px] rounded-[1.25rem]" />
              <SkeletonBlock
                className={`mt-5 h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
              <SkeletonText className="mt-5" lines={2} lastLineWidth="68%" />
              <div className="mt-8 space-y-4">
                {Array.from({length: 4}, (_, index) => (
                  <SkeletonBlock key={index} className="h-20 rounded-[10px]" />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooterSkeleton locale={locale} />
    </>
  );
}

export function PageSkeleton({locale, pathname}: {locale: Locale; pathname: string}) {
  const normalizedPath = normalizeSkeletonPath(pathname);

  if (isCareersPath(normalizedPath)) {
    return <CareersSkeleton locale={locale} />;
  }

  if (isContactPath(normalizedPath)) {
    return <ContactSkeleton locale={locale} />;
  }

  if (isAboutPath(normalizedPath)) {
    return <AboutSkeleton locale={locale} />;
  }

  if (isServiceDetailPath(normalizedPath)) {
    return <AirFreightSkeleton locale={locale} />;
  }

  if (isServicesPath(normalizedPath)) {
    return <ServicesSkeleton locale={locale} />;
  }

  return <HomeSkeleton locale={locale} />;
}
