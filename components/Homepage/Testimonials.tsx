import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Quote } from "lucide-react";


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


export default function Testimonials() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    useEffect(() => {

    
        const interval = setInterval(() => {
          setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);        
        return () => clearInterval(interval);
      },5000)}, []);

  return (
    <>
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
    
    </>
)
}
