"use client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function ProjectPreviewCarousel({ previews }: { previews: { imageUrl: string; imageAlt?: string }[] }) {
    return (
        <Carousel className="w-full shadow-lg rounded-lg" plugins={[Autoplay({ delay: 5000 })]}>
            <CarouselContent>
                {previews.map((preview, index) => (
                    <CarouselItem key={index}>
                        <Card className="rounded-xl overflow-hidden">
                            <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                                <Image src={preview.imageUrl} alt={preview.imageAlt || ""} fill className="object-cover" />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
