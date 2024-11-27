"use client"

import { useState,useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


import SingleEvent from '@/components/Admin/SingleEvent';
import SingleEventBookings from '@/components/Admin/SingleEventBookings';
import SingleEventGallery from '@/components/Admin/SingleEventGallery';
import SingleEventTestimonial from '@/components/Admin/SingleEventTestimonial';



interface Event{
    id:string,
    name:string,
    date:string,
    pricePerPerson:number,
    logo:string,
    bookings:[
        {
            id:string,
            user:{
                name:string,
                email:string
            },
            people:number,
            totalCost:number,
        }
    ],
    testimonials:[
        {
            id:string,
            user:{
                name:string
            },
            content:string,
            rating:number
        }
    ]
    images:string[]
    description:string
  }

export default function AdminEventDetailPage({params}:{params:{id:string}}) {
  const [event,setEvent] = useState<Event>()

  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  useEffect(()=>{

    const fetchEvent =async()=>{
      const response =await fetch(`${API_URL}/events/${params.id}`, {
        method: "GET",
        headers: {
          'Content-Type':"application/json"
        },
    
      })

      const data = await response.json()

      if(response.ok){
        setEvent(data)
      }

    
    }

    fetchEvent()

 
  }, [API_URL, params.id])




  return (
    event?(
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Single Event Management</h1>
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <SingleEvent event={event}/>
        </TabsContent>
        <TabsContent value="bookings">
          <SingleEventBookings bookings={event.bookings} />
        </TabsContent>
        <TabsContent value="gallery">
          <SingleEventGallery images={event.images} id={event.id}/>
        </TabsContent>
        <TabsContent value="testimonials">
        <SingleEventTestimonial testimonials={event.testimonials} />
        </TabsContent>
      </Tabs>


      </div>

    ): null
  )
}