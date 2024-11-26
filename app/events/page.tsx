'use client'
import { useState, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Event{
  id:string
  name:string,
  date:string
  location:string
  logo:string
  discount:number
  pricePerPerson:number
  description:string
  bookings:number
  newPrice:number
  maxAttendees:number
}

export default function EventsPage() {

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

 
  }, [API_URL]);

  return (
    <>
    
    {events && events.length > 0 && (
              <section className="mb-16 container mx-auto px-4 py-8 ">
              <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {events.map((event) => (
                  <Card key={event.id}>
                    <Image src={event.logo} alt={event.name} width={400} height={200} className="rounded-t-lg  object-cover h-[200px]  " />
                    <CardHeader>
                      <CardTitle>{event.name}</CardTitle>
                      <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
              <p className="mb-2">{event.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  {event.newPrice > 0 ? (
                    <>
                      <span className="text-lg font-bold text-primary">KES. {event.pricePerPerson - event.discount}</span>
                      <span className="ml-2 text-sm line-through text-muted-foreground">KES. {event.pricePerPerson}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-primary">KES. {event.pricePerPerson}</span>
                  )}
                </div>
                <Badge variant="secondary">{event.bookings || 0}/{event.maxAttendees} booked</Badge>
              </div>
            </CardContent>
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
    </>
  )
}