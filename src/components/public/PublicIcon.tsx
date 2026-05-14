import type {SVGProps} from "react";

type IconName =
  | "menu"
  | "close"
  | "search"
  | "quote"
  | "services"
  | "support"
  | "ship"
  | "truck"
  | "plane"
  | "customs"
  | "warehouse"
  | "box"
  | "check"
  | "globe"
  | "route"
  | "eye"
  | "pin"
  | "mail"
  | "phone"
  | "location"
  | "spark"
  | "speed"
  | "flex"
  | "track"
  | "professional"
  | "training"
  | "city"
  | "whatsapp";

const paths: Record<IconName, string[]> = {
  menu: ["M4 7h16", "M4 12h16", "M4 17h16"],
  close: ["M6 6l12 12", "M18 6L6 18"],
  search: ["M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z", "m20 20-3.5-3.5"],
  quote: ["M8 7H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3V7Zm10 0h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3V7Z"],
  services: ["M5 5h5v5H5z", "M14 5h5v5h-5z", "M5 14h5v5H5z", "M14 14h5v5h-5z"],
  support: ["M12 4a8 8 0 0 0-8 8v2a2 2 0 0 0 2 2h2v-5H5.2", "M18.8 11H16v5h2a2 2 0 0 0 2-2v-2a8 8 0 0 0-8-8", "M9 19a3 3 0 0 0 6 0"],
  ship: ["M3 15h18", "M6 15V8h12v7", "M8 8V5h8v3", "m5 19 2-4", "m17 19-2-4"],
  truck: ["M3 7h11v8H3z", "M14 10h3l3 3v2h-6z", "M7 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z", "M17 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"],
  plane: ["m3 15 18-6-8 10-2-5-5 1 2-4-5-3Z"],
  customs: ["M7 4h10", "M6 8h12v12H6z", "M9 12h6", "M9 15h6"],
  warehouse: ["M3 10 12 4l9 6v10H3z", "M8 14h8", "M8 18h8"],
  box: ["M4 7 12 3l8 4-8 4-8-4Z", "M4 7v10l8 4 8-4V7", "M12 11v10"],
  check: ["m5 12 4 4L19 6"],
  globe: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z", "M3 12h18", "M12 3a15 15 0 0 1 0 18", "M12 3a15 15 0 0 0 0 18"],
  route: ["M6 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z", "M18 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z", "M8 16c3 0 4-2 4-4s1-4 4-4"],
  eye: ["M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"],
  pin: ["M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z", "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"],
  mail: ["M4 6h16v12H4z", "m5 7 7 6 7-6"],
  phone: ["M6.5 4h3L11 8 9 9.5a16.5 16.5 0 0 0 5.5 5.5L16 13l4 1.5v3a1.5 1.5 0 0 1-1.7 1.5C9.8 18.1 5.9 14.2 5 5.7A1.5 1.5 0 0 1 6.5 4Z"],
  location: ["M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z", "M12 10.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"],
  spark: ["M12 3v4", "M12 17v4", "M3 12h4", "M17 12h4", "m6 6 2.5 2.5", "m15.5 15.5 2.5 2.5", "m18 6-2.5 2.5", "M8.5 15.5 6 18"],
  speed: ["M4 14a8 8 0 1 1 7.4 5", "M12 12l4-3", "M5 18h5"],
  flex: ["M7 7h10", "M7 17h10", "m13 4 4 3-4 3", "m11 14-4 3 4 3"],
  track: ["M4 12c2.5-4 5.2-6 8-6s5.5 2 8 6c-2.5 4-5.2 6-8 6s-5.5-2-8-6Z", "M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0", "M12 10V7"],
  professional: ["M12 12a4 4 0 1 0-4-4", "M12 12a4 4 0 1 1 4-4", "M5 20a7 7 0 0 1 14 0"],
  training: ["M4 19h16", "M7 16V9", "M12 16V5", "M17 16v-4"],
  city: ["M4 20V8l4-2v14", "M10 20V4l4 2v14", "M16 20v-9l4-2v11", "M6 10h.01", "M6 13h.01", "M12 9h.01", "M12 12h.01", "M18 13h.01"],
  whatsapp: ["M12 21a9 9 0 0 1-4.6-1.3L3 21l1.4-4A9 9 0 1 1 12 21Z", "M9.6 8.5c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .6.4l.7 1.7c.1.2 0 .4-.1.6l-.5.7c.5 1 1.3 1.8 2.3 2.3l.7-.5c.2-.1.4-.2.6-.1l1.7.7c.4.2.4.4.4.6v.5c0 .2 0 .4-.4.6-.5.2-1 .4-1.6.4-3.3-.2-6-2.9-6.2-6.2 0-.6.2-1.1.4-1.6Z"],
};

type PublicIconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function PublicIcon({name, className, ...props}: PublicIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {paths[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
