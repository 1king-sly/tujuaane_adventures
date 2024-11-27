import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'


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

export default function SingleEvent({event}:{event:Event}) {
  return (
    <Card className="mb-8">
    <CardHeader>
      <CardTitle className="text-3xl">{event.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Image src={event.logo} alt={event.name} width={400} height={300} className="rounded-lg" />
        <div>
          <p className="text-lg mb-2">{event.description}</p>
          <p className="font-semibold">Date: {new Date(event.date).toLocaleDateString()}</p>
          <p className="font-semibold">Price: KES. {event.pricePerPerson}</p>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}
