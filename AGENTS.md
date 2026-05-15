<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Internationalization Rules

- New UI/UX pages must use `next-intl` message files for all user-facing text.
- Keep locale content in `messages/en.json` and `messages/ar.json` unless there is a strong reason to split further.
- Do not hardcode page copy, labels, headings, buttons, empty states, or other visible text directly in page components.
- If content comes from a database or CMS, resolve it through a locale helper in code first, then render the localized value.
- Prefer utility functions for locale-aware value resolution over ad hoc string branching inside components.
- Any new page MUST include a matching layout skeleton. Skeletons must be implemented alongside the page and used during loading + language switching to prevent layout shift.
- Dedicated service pages (e.g. `/services/air-freight`) each need their own skeleton variant in `PageSkeleton` / `resolveSkeleton.ts`, registered by route path.
