import type {Metadata} from "next";

import {ServiceDetailPage} from "@/components/services/ServiceDetailPage";
import {generateServiceMetadata} from "@/lib/service-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata("cargo-consolidation");
}

export default function CargoConsolidationPage() {
  return <ServiceDetailPage slug="cargo-consolidation" />;
}
