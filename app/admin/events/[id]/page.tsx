"use client"

import { useState,useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import ImageUpload from "@/components/imageUpload";
import { Star, Users, Image as ImageIcon } from 'lucide-react'

// Mock data (replace with API calls)
const event = {
  id: 1,
  title: 'Mount Kenya Expedition',
  description: 'Conquer Africa\'s second-highest peak',
  date: '2023-08-15',
  price: 500,
  image: '/images/event1.jpg',
  bookings: [
    { id: 1, user: 'John Doe', email: 'john@example.com', people: 2, total: 1000 },
    { id: 2, user: 'Jane Smith', email: 'jane@example.com', people: 1, total: 500 },
  ],
  testimonials: [
    { id: 1, user: 'Alice Johnson', rating: 5, comment: 'Amazing experience!' },
    { id: 2, user: 'Bob Wilson', rating: 4, comment: 'Great adventure, well organized.' },
  ],
  gallery: [
    '/images/event1.jpg',
    '/images/event2.jpg',
    '/images/event3.jpg',
  ]
}

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
  const [newImages, setNewImages] = useState<File[]>([])
  const { toast } = useToast()
  const [event,setEvent] = useState<Event>()

  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  useEffect(()=>{

    const fetchEvents =async()=>{
      const response =await fetch(`${API_URL}/events/${params.id}`, {
        method: "GET",
        headers: {
          'Content-Type':"application/json"
        },
    
      })

      const data = await response.json()
      console.log(data)

      if(response.ok){
        setEvent(data)
      }

    
    }

    fetchEvents()

 
  }, [API_URL, params.id])


  const handleImageUpload = (file: File) => {
    setNewImages(prev => [...prev, file])
  }

  const handleSaveGallery = async () => {
    // Add API call to save new images
    toast({
      title: "Gallery Updated",
      description: "New images have been added to the gallery.",
    })
  }

  return (
    event?(
        <div className="container mx-auto px-4 py-8">
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
  
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="bookings">
            <AccordionTrigger className="text-xl font-semibold">
              <Users className="mr-2" /> Bookings
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>People</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {event.bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.user.name}</TableCell>
                      <TableCell>{booking.user.email}</TableCell>
                      <TableCell>{booking.people}</TableCell>
                      <TableCell>${booking.totalCost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="testimonials">
            <AccordionTrigger className="text-xl font-semibold">
              <Star className="mr-2" /> Testimonials
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {event.testimonials.map((testimonial) => (
                  <Card key={testimonial.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="ml-2 font-semibold">{testimonial.user.name}</span>
                      </div>
                      <p>{testimonial.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="gallery">
            <AccordionTrigger className="text-xl font-semibold">
              <ImageIcon className="mr-2" /> Gallery
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {event.images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Add New Images</h3>
                  <ImageUpload onImageSelect={handleImageUpload} />
                  {newImages.length > 0 && (
                    <div className="flex justify-end">
                      <Button onClick={handleSaveGallery}>
                        Save New Images
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

    ): null
  )
}