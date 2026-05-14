import {isRTL, type Locale} from "@/i18n/routing";

import {SkeletonBlock} from "./SkeletonPrimitives";

export function NotFoundSkeleton({locale}: {locale: Locale}) {
  const localeIsRTL = isRTL(locale);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,61,168,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(244,121,32,0.14),transparent_24%),radial-gradient(circle_at_bottom,rgba(13,31,92,0.08),transparent_40%)]" />
      <div className="relative w-full max-w-3xl">
        <div className="brand-card overflow-hidden">
          <div className="bg-alfs-deep-blue px-6 py-10 text-center text-white sm:px-10 sm:py-14">
            <SkeletonBlock className="mx-auto h-4 w-28 rounded-full bg-white/12" />
            <SkeletonBlock className="mx-auto mt-5 h-20 w-36 rounded-[1.25rem] bg-white/12 sm:h-24 sm:w-44" />
            <SkeletonBlock className="mx-auto mt-5 h-8 w-full max-w-md rounded-full bg-white/12" />
            <div className={`mx-auto mt-4 max-w-xl space-y-3 ${localeIsRTL ? "text-right" : "text-center"}`}>
              <SkeletonBlock className="h-4 w-full rounded-full bg-white/12" />
              <SkeletonBlock className="h-4 w-5/6 rounded-full bg-white/12" />
            </div>
            <SkeletonBlock className="mx-auto mt-8 h-12 w-36 rounded-full bg-white/12" />
          </div>
          <div className="h-1 bg-alfs-orange" />
        </div>
      </div>
    </main>
  );
}

