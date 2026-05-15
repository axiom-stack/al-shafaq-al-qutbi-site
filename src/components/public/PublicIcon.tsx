import type {ComponentProps} from "react";
import type {IconType} from "react-icons";
import {
  FiActivity,
  FiBookOpen,
  FiBox,
  FiCheck,
  FiClipboard,
  FiEye,
  FiGlobe,
  FiGrid,
  FiHeadphones,
  FiLayers,
  FiShield,
  FiMail,
  FiMap,
  FiMapPin,
  FiMenu,
  FiPhone,
  FiSearch,
  FiShuffle,
  FiTarget,
  FiTruck,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";
import {FaCity, FaWarehouse, FaWhatsapp} from "react-icons/fa6";
import {GiCargoShip} from "react-icons/gi";
import {IoAirplaneOutline} from "react-icons/io5";
import {MdOutlineFactCheck} from "react-icons/md";

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
  | "layers"
  | "shield"
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

const icons: Record<IconName, IconType> = {
  menu: FiMenu,
  close: FiX,
  search: FiSearch,
  quote: FiClipboard,
  services: FiGrid,
  support: FiHeadphones,
  ship: GiCargoShip,
  truck: FiTruck,
  plane: IoAirplaneOutline,
  customs: MdOutlineFactCheck,
  warehouse: FaWarehouse,
  box: FiBox,
  layers: FiLayers,
  shield: FiShield,
  check: FiCheck,
  globe: FiGlobe,
  route: FiMap,
  eye: FiEye,
  pin: FiMapPin,
  mail: FiMail,
  phone: FiPhone,
  location: FiMapPin,
  spark: FiZap,
  speed: FiActivity,
  flex: FiShuffle,
  track: FiTarget,
  professional: FiUsers,
  training: FiBookOpen,
  city: FaCity,
  whatsapp: FaWhatsapp,
};

type PublicIconProps = ComponentProps<"svg"> & {
  name: IconName;
};

export function PublicIcon({name, className, ...props}: PublicIconProps) {
  const IconComponent = icons[name];

  return <IconComponent aria-hidden="true" className={className} {...props} />;
}
