"use client";
import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Quote } from "lucide-react";
import Hero from "@/components/Homepage/Hero"
import Services from "@/components/Homepage/Services"
import Testimonials from "@/components/Homepage/Testimonials"
import Partners from "@/components/Homepage/Partners"

interface Event{
  id:string
  name:string,
  date:string
  location:string
  image:string
}



const partners = [
  { id: 1, name: 'Kenya Wildlife Service', logo: '/images/kws.jpeg' },
  { id: 2, name: 'Serena Hotels', logo: '/images/serena.jpeg' },
  { id: 3, name: 'Kenya Airways', logo: '/images/KQ.png' },
  { id: 4, name: 'Safaricom', logo: '/images/saf.png' },
];


export default function Home() {

  const [currentPartners, setCurrentPartners] = useState(partners.slice(0, 4));
  const [events,setEvents] = useState<Event[]>([])

  const API_URL = process.env.NEXT_PUBLIC_API_URL;




  useEffect(() => {

    const fetchEvents =async()=>{
      const response =await fetch(`${API_URL}/events/`, {
        method: "GET",
        headers: {
          'Content-Type':"application/json"
        },
    
      })

      const data = await response.json()

      if(response.ok){
        setEvents(data)
      }

    
    }

    fetchEvents()

    const interval = setInterval(() => {
      setCurrentPartners((prev) => {
        const next = [...prev];
        next.push(partners[(partners.indexOf(next[3]) + 1) % partners.length]);
        next.shift();
        return next;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
 

  return (
    <div className="container mx-auto px-4 py-8">
    <Hero/>
    <Services/>

     

      {events && events.length > 0 && (
              <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {events.map((event) => (
                  <Card key={event.id}>
                    <Image src={event.image} alt={event.name} width={400} height={200} className="rounded-t-lg  object-cover h-[200px]  " />
                    <CardHeader>
                      <CardTitle>{event.name}</CardTitle>
                      <CardDescription>{new Date(event.date).toLocaleString()}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild>
                        <Link href={`/events/${event.id}`}>Book Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
      )}

      <Testimonials/>
      <Partners/>





 

    </div>
  )
}