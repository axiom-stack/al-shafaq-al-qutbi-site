import type {Metadata} from "next";

import {ServiceDetailPage} from "@/components/services/ServiceDetailPage";
import {generateServiceMetadata} from "@/lib/service-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata("air-freight");
}

export default function AirFreightPage() {
  return <ServiceDetailPage slug="air-freight" />;
}
