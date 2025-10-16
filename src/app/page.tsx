"use client";
import TopNav from "@/components/TopNav";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const images = [
    "/assets/images/c2.jpg",
    "/assets/images/c3.jpg",
    "/assets/images/c4.jpg",
    "/assets/images/c5.jpg",
    "/assets/images/c6.jpg",
  ];

  const { data: session, status } = useSession();

  console.log("session data", session);

  const router = useRouter();

  return (
    <main>
      <TopNav />
      <div className="w-full flex justify-center items-center min-h-[400px]">
        <Carousel
          opts={{
            align: "center", // Align properly for smooth transitions
            // loop: true,
          }}
          className="w-full h-full" // Prevents excessive width on large screens
        >
          <CarouselContent className="relative flex flex-shrink-0">
            {" "}
            {/* Ensures proper transition */}
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                className="relative w-full flex-shrink-0 h-[200px] md:h-[500px] "
              >
                {/* Prevents shrinking issues */}
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70" />
          <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70" />
        </Carousel>
      </div>

      {/* Selective products */}
      <div></div>
    </main>
  );
};

export default Home;
