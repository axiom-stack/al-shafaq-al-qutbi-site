import type {Metadata} from "next";

import {ServiceDetailPage} from "@/components/services/ServiceDetailPage";
import {generateServiceMetadata} from "@/lib/service-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata("land-freight");
}

export default function LandFreightPage() {
  return <ServiceDetailPage slug="land-freight" />;
}
