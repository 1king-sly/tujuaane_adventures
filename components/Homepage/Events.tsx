import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


interface Event{
    id:string
    name:string,
    date:string
    location:string
    logo:string
  }

export default function Events() {
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
              <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {events.map((event) => (
                  <Card key={event.id}>
                    <Image src={event.logo} alt={event.name} width={400} height={200} className="rounded-t-lg  object-cover h-[200px]  " />
                    <CardHeader>
                      <CardTitle>{event.name}</CardTitle>
                      <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
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
    </>
)
}
