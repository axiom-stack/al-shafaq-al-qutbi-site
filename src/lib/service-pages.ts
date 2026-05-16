import type {ComponentProps} from "react";

import type {PublicIcon} from "@/components/public/PublicIcon";
import {serviceHeroImages, serviceImages} from "@/lib/service-images";
import {siteAnchors} from "@/lib/site-routes";

export type ServiceSlug =
  | "sea-freight"
  | "land-freight"
  | "air-freight"
  | "cargo-consolidation"
  | "warehousing"
  | "customs-clearance";

type IconName = ComponentProps<typeof PublicIcon>["name"];

export type ServicePageConfig = {
  slug: ServiceSlug;
  translationNamespace:
    | "SeaFreightPage"
    | "LandFreightPage"
    | "AirFreightPage"
    | "CargoConsolidationPage"
    | "WarehousingPage"
    | "CustomsClearancePage";
  image: string;
  heroImage: string;
  heroIcon: IconName;
  chipKeys: readonly string[];
  whenToChooseKeys: readonly string[];
  whenToChooseIcons: Record<string, IconName>;
  capabilityKeys: readonly string[];
  capabilityIcons: Record<string, IconName>;
  useCaseKeys: readonly string[];
  processKeys: readonly string[];
  processIcons: Record<string, IconName>;
  whyAlfsKeys: readonly string[];
  relatedKeys: readonly string[];
  relatedRoutes: Record<string, ServiceSlug>;
  relatedIcons: Record<string, IconName>;
  secondaryCtaHref: string;
};

export const servicePageConfigs: Record<ServiceSlug, ServicePageConfig> = {
  "sea-freight": {
    slug: "sea-freight",
    translationNamespace: "SeaFreightPage",
    image: serviceImages.seaFreight,
    heroImage: serviceHeroImages.seaFreight,
    heroIcon: "ship",
    chipKeys: ["lcl", "fcl", "bulk", "partial", "oversized", "sensitive"],
    whenToChooseKeys: [
      "fullContainer",
      "partialContainer",
      "bulk",
      "oversized",
      "sensitive",
      "costFocused",
    ],
    whenToChooseIcons: {
      fullContainer: "box",
      partialContainer: "layers",
      bulk: "box",
      oversized: "route",
      sensitive: "shield",
      costFocused: "flex",
    },
    capabilityKeys: ["lcl", "fcl", "bulkPartial", "monitoring", "specialized", "doorToDoor"],
    capabilityIcons: {
      lcl: "layers",
      fcl: "box",
      bulkPartial: "box",
      monitoring: "eye",
      specialized: "shield",
      doorToDoor: "route",
    },
    useCaseKeys: ["bulk", "partial", "full", "oversized", "sensitive", "trade"],
    processKeys: [
      "shareDetails",
      "chooseLclFcl",
      "planRoute",
      "prepare",
      "monitor",
      "arrival",
    ],
    processIcons: {
      shareDetails: "quote",
      chooseLclFcl: "layers",
      planRoute: "ship",
      prepare: "quote",
      monitor: "eye",
      arrival: "check",
    },
    whyAlfsKeys: ["flexible", "monitoring", "cargoTypes", "coordination"],
    relatedKeys: ["consolidation", "warehousing", "landFreight", "customs"],
    relatedRoutes: {
      consolidation: "cargo-consolidation",
      warehousing: "warehousing",
      landFreight: "land-freight",
      customs: "customs-clearance",
    },
    relatedIcons: {
      consolidation: "box",
      warehousing: "warehouse",
      landFreight: "truck",
      customs: "customs",
    },
    secondaryCtaHref: "#process",
  },
  "land-freight": {
    slug: "land-freight",
    translationNamespace: "LandFreightPage",
    image: serviceImages.landFreight,
    heroImage: serviceHeroImages.landFreight,
    heroIcon: "truck",
    chipKeys: ["ftl", "ltl", "flatbed", "temperature", "regional", "crossBorder"],
    whenToChooseKeys: [
      "fullTruckload",
      "partial",
      "oversized",
      "temperature",
      "local",
      "regional",
    ],
    whenToChooseIcons: {
      fullTruckload: "truck",
      partial: "layers",
      oversized: "route",
      temperature: "shield",
      local: "pin",
      regional: "globe",
    },
    capabilityKeys: ["ftl", "ltl", "flatbed", "temperature", "regional", "doorToDoor"],
    capabilityIcons: {
      ftl: "truck",
      ltl: "layers",
      flatbed: "route",
      temperature: "shield",
      regional: "globe",
      doorToDoor: "route",
    },
    useCaseKeys: ["ftl", "ltl", "oversized", "shaped", "food", "pharma", "regional"],
    processKeys: [
      "shareDetails",
      "selectType",
      "planRoute",
      "prepare",
      "monitor",
      "delivery",
    ],
    processIcons: {
      shareDetails: "quote",
      selectType: "truck",
      planRoute: "route",
      prepare: "box",
      monitor: "eye",
      delivery: "check",
    },
    whyAlfsKeys: ["flexible", "transportTypes", "regional", "communication"],
    relatedKeys: ["warehousing", "consolidation", "seaFreight", "customs"],
    relatedRoutes: {
      warehousing: "warehousing",
      consolidation: "cargo-consolidation",
      seaFreight: "sea-freight",
      customs: "customs-clearance",
    },
    relatedIcons: {
      warehousing: "warehouse",
      consolidation: "box",
      seaFreight: "ship",
      customs: "customs",
    },
    secondaryCtaHref: "#quote-form",
  },
  "air-freight": {
    slug: "air-freight",
    translationNamespace: "AirFreightPage",
    image: serviceImages.airFreight,
    heroImage: serviceHeroImages.airFreight,
    heroIcon: "plane",
    chipKeys: ["timeSensitive", "delicate", "small", "large", "updates"],
    whenToChooseKeys: [
      "timeSensitive",
      "highValue",
      "delicate",
      "small",
      "largeUrgent",
      "global",
    ],
    whenToChooseIcons: {
      timeSensitive: "speed",
      highValue: "shield",
      delicate: "spark",
      small: "box",
      largeUrgent: "layers",
      global: "globe",
    },
    capabilityKeys: ["handling", "timeSensitive", "delicate", "updates", "schedule", "doorToDoor"],
    capabilityIcons: {
      handling: "box",
      timeSensitive: "speed",
      delicate: "spark",
      updates: "eye",
      schedule: "plane",
      doorToDoor: "route",
    },
    useCaseKeys: ["documents", "delicate", "urgent", "large", "priority", "timeSensitive"],
    processKeys: [
      "shareDetails",
      "assess",
      "planRoute",
      "documentation",
      "move",
      "arrival",
    ],
    processIcons: {
      shareDetails: "quote",
      assess: "search",
      planRoute: "plane",
      documentation: "quote",
      move: "route",
      arrival: "check",
    },
    whyAlfsKeys: ["schedule", "flexible", "communication", "handling"],
    relatedKeys: ["seaFreight", "landFreight", "warehousing", "consolidation"],
    relatedRoutes: {
      seaFreight: "sea-freight",
      landFreight: "land-freight",
      warehousing: "warehousing",
      consolidation: "cargo-consolidation",
    },
    relatedIcons: {
      seaFreight: "ship",
      landFreight: "truck",
      warehousing: "warehouse",
      consolidation: "box",
    },
    secondaryCtaHref: "/#track",
  },
  "cargo-consolidation": {
    slug: "cargo-consolidation",
    translationNamespace: "CargoConsolidationPage",
    image: serviceImages.consolidation,
    heroImage: serviceHeroImages.consolidation,
    heroIcon: "box",
    chipKeys: ["grouping", "container", "cost", "organization", "supplyChain"],
    whenToChooseKeys: [
      "multiple",
      "partial",
      "cost",
      "multiOrigin",
      "inventory",
      "planning",
    ],
    whenToChooseIcons: {
      multiple: "layers",
      partial: "box",
      cost: "flex",
      multiOrigin: "globe",
      inventory: "warehouse",
      planning: "route",
    },
    capabilityKeys: ["grouping", "container", "cost", "organization", "supplyChain", "doorToDoor"],
    capabilityIcons: {
      grouping: "box",
      container: "layers",
      cost: "flex",
      organization: "quote",
      supplyChain: "route",
      doorToDoor: "route",
    },
    useCaseKeys: ["partial", "supplier", "container", "warehouse", "planning", "multiStage"],
    processKeys: [
      "shareDetails",
      "assess",
      "planGrouping",
      "prepare",
      "move",
      "track",
    ],
    processIcons: {
      shareDetails: "quote",
      assess: "search",
      planGrouping: "box",
      prepare: "layers",
      move: "route",
      track: "check",
    },
    whyAlfsKeys: ["organization", "efficiency", "cost", "partial"],
    relatedKeys: ["seaFreight", "landFreight", "warehousing", "customs"],
    relatedRoutes: {
      seaFreight: "sea-freight",
      landFreight: "land-freight",
      warehousing: "warehousing",
      customs: "customs-clearance",
    },
    relatedIcons: {
      seaFreight: "ship",
      landFreight: "truck",
      warehousing: "warehouse",
      customs: "customs",
    },
    secondaryCtaHref: "#process",
  },
  warehousing: {
    slug: "warehousing",
    translationNamespace: "WarehousingPage",
    image: serviceImages.warehousing,
    heroImage: serviceHeroImages.warehousing,
    heroIcon: "warehouse",
    chipKeys: ["secure", "management", "inventory", "protection", "flexible"],
    whenToChooseKeys: [
      "waiting",
      "inventory",
      "protection",
      "consolidation",
      "distribution",
      "flexible",
    ],
    whenToChooseIcons: {
      waiting: "box",
      inventory: "quote",
      protection: "shield",
      consolidation: "layers",
      distribution: "route",
      flexible: "flex",
    },
    capabilityKeys: ["secure", "management", "inventory", "protection", "flexible", "doorToDoor"],
    capabilityIcons: {
      secure: "shield",
      management: "warehouse",
      inventory: "quote",
      protection: "shield",
      flexible: "flex",
      doorToDoor: "route",
    },
    useCaseKeys: ["temporary", "inventory", "preShipment", "staging", "consolidation", "protection"],
    processKeys: [
      "shareRequirements",
      "assess",
      "receive",
      "manage",
      "prepare",
      "release",
    ],
    processIcons: {
      shareRequirements: "quote",
      assess: "search",
      receive: "warehouse",
      manage: "quote",
      prepare: "box",
      release: "check",
    },
    whyAlfsKeys: ["secure", "management", "inventory", "protection"],
    relatedKeys: ["consolidation", "landFreight", "seaFreight", "customs"],
    relatedRoutes: {
      consolidation: "cargo-consolidation",
      landFreight: "land-freight",
      seaFreight: "sea-freight",
      customs: "customs-clearance",
    },
    relatedIcons: {
      consolidation: "box",
      landFreight: "truck",
      seaFreight: "ship",
      customs: "customs",
    },
    secondaryCtaHref: siteAnchors.contact,
  },
  "customs-clearance": {
    slug: "customs-clearance",
    translationNamespace: "CustomsClearancePage",
    image: serviceImages.customsClearance,
    heroImage: serviceHeroImages.customsClearance,
    heroIcon: "customs",
    chipKeys: ["documentation", "compliance", "faster", "smooth", "regulations"],
    whenToChooseKeys: [
      "importExport",
      "crossBorder",
      "documentation",
      "regulated",
      "timeSensitive",
      "complete",
    ],
    whenToChooseIcons: {
      importExport: "globe",
      crossBorder: "route",
      documentation: "quote",
      regulated: "shield",
      timeSensitive: "speed",
      complete: "flex",
    },
    capabilityKeys: ["documentation", "compliance", "faster", "coordination", "crossBorder", "doorToDoor"],
    capabilityIcons: {
      documentation: "quote",
      compliance: "customs",
      faster: "speed",
      coordination: "route",
      crossBorder: "globe",
      doorToDoor: "route",
    },
    useCaseKeys: ["import", "export", "crossBorder", "documentation", "regulated", "endToEnd"],
    processKeys: [
      "shareInfo",
      "review",
      "prepare",
      "coordinate",
      "monitor",
      "complete",
    ],
    processIcons: {
      shareInfo: "quote",
      review: "search",
      prepare: "quote",
      coordinate: "customs",
      monitor: "eye",
      complete: "check",
    },
    whyAlfsKeys: ["documentation", "compliance", "movement", "coordination"],
    relatedKeys: ["seaFreight", "landFreight", "airFreight", "warehousing"],
    relatedRoutes: {
      seaFreight: "sea-freight",
      landFreight: "land-freight",
      airFreight: "air-freight",
      warehousing: "warehousing",
    },
    relatedIcons: {
      seaFreight: "ship",
      landFreight: "truck",
      airFreight: "plane",
      warehousing: "warehouse",
    },
    secondaryCtaHref: siteAnchors.contact,
  },
};

export const serviceDetailPaths = Object.keys(servicePageConfigs) as ServiceSlug[];

export function getServiceConfig(slug: ServiceSlug) {
  return servicePageConfigs[slug];
}

export function isServiceDetailSlug(pathname: string) {
  const normalized = pathname.replace(/\/$/, "");
  const slug = normalized.split("/").pop();
  return serviceDetailPaths.includes(slug as ServiceSlug);
}
