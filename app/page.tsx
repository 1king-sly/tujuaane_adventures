"use client";
import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Quote } from "lucide-react";

const heroImages = [
  '/images/hero1.jpg',
  '/images/hero2.jpeg',
  '/images/hero3.jpeg',
  '/images/hero4.jpeg',
  '/images/hero5.jpeg',
]

const services = [
  { title: 'Hiking', description: 'Explore breathtaking trails' },
  { title: 'Mountain Climbing', description: 'Conquer majestic peaks' },
  { title: 'Camping', description: 'Immerse in nature' },
  { title: 'Team Building', description: 'Strengthen bonds through adventure' },
  { title: 'Road Trips', description: 'Discover hidden gems' },
  { title: 'Park Adventures', description: 'Wildlife encounters' },
]

const upcomingEvents = [
  { title: 'Mount Kenya Expedition', date: '2023-08-15', image: '/images/hero1.jpg' },
  { title: 'Masai Mara Safari', date: '2023-09-01', image: '/images/hero2.jpeg' },
  { title: 'Coastal Beach Retreat', date: '2023-09-15', image: '/images/hero3.jpeg' },
]

const testimonials = [
  {
    name: "Breanna Astra",
    occupation: "CEO Safaricom",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    text: "The team building exercise was a great experience for the team, it really helped us in bonding.",
  },
  {
    name: "Emily Rodriguez",
    occupation: "Tourist",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    text: "I had never travelled outside my country for a holiday and I most definately didn't know what I wanted but what I got from here was definately the closest thing to Heaven.",
  },
  {
    name: "Ummi Mbarak",
    occupation: "PR - Tujuaane events & adventures",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    text: "We are dedicated to giving our users the best of experience as they explore the world with us, numbers don't lie but the best is yet to come.",
  },
];

const partners = [
  { id: 1, name: 'Kenya Wildlife Service', logo: '/images/kws.jpeg' },
  { id: 2, name: 'Serena Hotels', logo: '/images/serena.jpeg' },
  { id: 3, name: 'Kenya Airways', logo: '/images/KQ.png' },
  { id: 4, name: 'Safaricom', logo: '/images/saf.png' },
];


export default function Home() {

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentPartners, setCurrentPartners] = useState(partners.slice(0, 4));

  const [currentImage, setCurrentImage] = useState(0);



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setCurrentPartners((prev) => {
        const next = [...prev];
        next.push(partners[(partners.indexOf(next[3]) + 1) % partners.length]);
        next.shift();
        return next;
      });
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
 

  return (
    <div className="container mx-auto px-4 py-8">
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover East Africa</h1>
        <p className="text-xl md:text-2xl mb-8">Unforgettable adventures await</p>
        <Button size="lg" asChild>
          <Link href="/events">Explore Events</Link>
        </Button>
      </div>
    </div>
  </div>
</section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <Card key={index}>
              <Image src={event.image} alt={event.title} width={400} height={200} className="rounded-t-lg  object-cover h-[200px]  " />
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href={`/events/${index + 1}`}>Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
        <div className="relative h-96">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentTestimonial ? "opacity-100" : "opacity-0"
              }`}
            >
              <CardContent className="h-full flex flex-col items-center justify-center text-center p-8">
                <Quote className="h-10 w-10 mb-4" />
                <p className="text-lg mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm">{testimonial.occupation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
        <div className="flex justify-center items-center space-x-8">
          {currentPartners.map((partner, index) => (
            <div
              key={index}
              className="w-40 h-40 flex items-center justify-center bg-white rounded-lg shadow-md transition-all duration-500"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={120}
                objectFit="contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Add more sections for testimonials and partners here */}
    </div>
  )
}