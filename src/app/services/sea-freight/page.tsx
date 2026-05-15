import type {Metadata} from "next";

import {ServiceDetailPage} from "@/components/services/ServiceDetailPage";
import {generateServiceMetadata} from "@/lib/service-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata("sea-freight");
}

export default function SeaFreightPage() {
  return <ServiceDetailPage slug="sea-freight" />;
}
