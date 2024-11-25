import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const heroImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpeg",
  "/images/hero3.jpeg",
  "/images/hero4.jpeg",
  "/images/hero5.jpeg",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="mb-16">
        <div className="relative h-[80vh]">
          {heroImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`BabyGal hero image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className={`transition-opacity duration-2000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Discover East Africa
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Unforgettable adventures await
              </p>
              <Button size="lg" asChild>
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
