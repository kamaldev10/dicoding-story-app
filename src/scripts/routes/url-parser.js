import routes from "./routes";

function extractPathnameSegments(path) {
  const splitUrl = path.split("/");

  return {
    resource: splitUrl[1] || null,
    id: splitUrl[2] || null,
    action: splitUrl[3] || null,
  };
}

function constructRouteFromSegments(pathSegments) {
  let pathname = "";

  if (pathSegments.resource) {
    pathname = pathname.concat(`/${pathSegments.resource}`);
  }

  if (pathSegments.id) {
    pathname = pathname.concat("/:id");
  }

  return pathname || "/";
}

export function getActivePathname() {
  return location.hash.replace("#", "") || "/";
}
export function getActiveRoute() {
  const pathname = getActivePathname();
  const normalizedPath = `#${pathname}`;

  if (routes[normalizedPath]) return normalizedPath;

  const urlSegments = extractPathnameSegments(pathname);
  return `#${constructRouteFromSegments(urlSegments)}`;
}

export function parseActivePathname() {
  const pathname = getActivePathname();
  return extractPathnameSegments(pathname);
}

export function getRoute(pathname) {
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

export function parsePathname(pathname) {
  return extractPathnameSegments(pathname);
}
