import Image from "next/image";
import { Certification } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";
import { StarHeading } from "./star-heading";
import { ExternalLink, Calendar, Building2 } from "lucide-react";

interface CertificationSectionProps {
  certifications: Certification[];
}

export function CertificationSection({ certifications }: CertificationSectionProps) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 px-6 max-w-6xl mx-auto">
      <StarHeading title="Certifications" className="mb-12" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div 
            key={cert._id} 
            className="group relative flex flex-col bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative h-48 w-full bg-muted overflow-hidden">
              {cert.image && (
                <Image
                  src={urlFor(cert.image).url()}
                  alt={cert.title}
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 {cert.link && (
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-background/90 text-foreground px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-background transition-colors"
                    >
                      View Credential <ExternalLink size={14} />
                    </a>
                 )}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-lg leading-tight line-clamp-2">{cert.title}</h3>
              </div>
              
              <div className="flex flex-col gap-2 mt-1 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 size={14} />
                  <span>{cert.company}</span>
                </div>
                {cert.issueDate && (
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>
                      Issued {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                )}
              </div>
              
              {cert.description && (
                <p className="text-sm text-muted-foreground mb-4">
                  {cert.description}
                </p>
              )}

              {/* Skills/Tags */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="mt-auto pt-4 border-t flex flex-wrap gap-2">
                  {cert.skills.map((skill, index) => (
                     <span key={index} className="text-xs px-2 py-1 bg-secondary rounded-md text-secondary-foreground font-medium">
                       {skill}
                     </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
