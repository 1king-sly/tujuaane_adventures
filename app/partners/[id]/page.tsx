"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock partner data (replace with actual data fetching)
const partner = {
  id: 1,
  name: 'Kenya Wildlife Service',
  logo: '/images/partner1.png',
  description: 'Kenya Wildlife Service is the state corporation that conserves and manages Kenya\'s wildlife for the Kenyan people and the world.',
  events: [
    { id: 1, title: 'Tsavo National Park Safari', date: '2023-07-15', image: '/images/event1.jpg' },
    { id: 2, title: 'Amboseli Elephant Watch', date: '2023-08-01', image: '/images/event2.jpg' },
  ],
  testimonials: [
    { id: 1, text: 'Tujuane has been an excellent partner in promoting wildlife conservation through responsible tourism.', author: 'John Doe, KWS Director' },
    { id: 2, text: 'Our collaboration with Tujuane has significantly increased awareness about Kenya\'s national parks.', author: 'Jane Smith, KWS Marketing Manager' },
  ]
}

export default function PartnerDetailPage() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <Image src={partner.logo} alt={partner.name} width={200} height={100} className="mx-auto" />
          <CardTitle className="text-3xl font-bold text-center mt-4">{partner.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center">{partner.description}</CardDescription>
        </CardContent>
      </Card>

      <Tabs defaultValue="events">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partner.events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => setSelectedImage(event.image)}
                />
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="testimonials">
          <div className="space-y-4">
            {partner.testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <CardDescription>"{testimonial.text}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative">
            <Image src={selectedImage} alt="Full-size image" width={800} height={600} className="max-w-full max-h-full" />
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}