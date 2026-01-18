import { CertificationSection } from "@/components/sections/certification-section";
import { certificationsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity.server";
import { Certification } from "@/types/sanity";
import { fallbackCertifications } from "@/lib/fallback-data";

export const revalidate = 60;

export default async function CertificationsPage() {
  const certifications = await sanityFetch<Certification[]>({
    query: certificationsQuery,
    fallback: fallbackCertifications,
    tags: ["certification"]
  });

  return (
    <div className="pt-24 pb-12">
      <div className="text-center mb-12 px-6">
        <h1 className="text-4xl font-bold tracking-tight mb-4">All Certifications</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A comprehensive list of my professional certifications, verified skills, and continuous learning milestones.
        </p>
      </div>
      <CertificationSection certifications={certifications || fallbackCertifications} />
    </div>
  );
}
