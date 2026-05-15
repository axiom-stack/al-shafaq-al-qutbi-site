export function normalizeSkeletonPath(pathname: string | null | undefined) {
  if (!pathname) {
    return "/";
  }

  const [withoutHash] = pathname.split("#");
  const [withoutQuery] = withoutHash.split("?");

  return withoutQuery || "/";
}

export function isAboutPath(pathname: string) {
  return normalizeSkeletonPath(pathname) === "/about";
}

export function isContactPath(pathname: string) {
  return normalizeSkeletonPath(pathname) === "/contact";
}

export function isServicesPath(pathname: string) {
  return normalizeSkeletonPath(pathname) === "/services";
}

const serviceDetailPaths = [
  "/services/sea-freight",
  "/services/land-freight",
  "/services/air-freight",
  "/services/cargo-consolidation",
  "/services/warehousing",
  "/services/customs-clearance",
] as const;

export function isServiceDetailPath(pathname: string) {
  return serviceDetailPaths.includes(
    normalizeSkeletonPath(pathname) as (typeof serviceDetailPaths)[number],
  );
}

export function isAirFreightPath(pathname: string) {
  return isServiceDetailPath(pathname);
}
