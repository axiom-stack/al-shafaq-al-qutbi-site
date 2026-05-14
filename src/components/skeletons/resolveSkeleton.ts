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
