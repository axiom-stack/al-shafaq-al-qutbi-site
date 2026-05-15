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

export function isServicesPath(pathname: string) {
  return normalizeSkeletonPath(pathname) === "/services";
}

export function isAirFreightPath(pathname: string) {
  return normalizeSkeletonPath(pathname) === "/services/air-freight";
}
