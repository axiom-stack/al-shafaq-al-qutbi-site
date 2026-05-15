import type {Metadata} from "next";

import {ServiceDetailPage} from "@/components/services/ServiceDetailPage";
import {generateServiceMetadata} from "@/lib/service-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata("customs-clearance");
}

export default function CustomsClearancePage() {
  return <ServiceDetailPage slug="customs-clearance" />;
}
