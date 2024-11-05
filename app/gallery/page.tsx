"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

// Mock data (replace with actual data from your API/database)
const pastEvents = [
  {
    id: 1,
    title: 'Mount Kenya Expedition 2023',
    date: '2023-06-15',
    images: [
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
      'https://images.unsplash.com/photo-1682687220063-4742bd7c98d7',
      'https://images.unsplash.com/photo-1682687220208-22d7a2543e88',
    ],
    totalImages: 12
  },
  // Add more past events...
]

const partners = [
  {
    id: 1,
    name: 'Kenya Wildlife Service',
    images: [
      'https://images.unsplash.com/photo-1682687220199-d0124f48f95b',
      'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae',
      'https://images.unsplash.com/photo-1682687220067-dced0a5865c5',
    ],
    totalImages: 15
  },
  // Add more partners...
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const ImageGallery = ({ 
    images, 
    totalImages, 
    linkTo 
  }: { 
    images: string[], 
    totalImages: number,
    linkTo: string 
  }) => (
    <div className="space-y-4">
      <div className="gallery-grid">
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover"
            />
            {index === 3 && totalImages > 4 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <p className="text-white text-xl font-bold">+{totalImages - 4} more</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {totalImages > 4 && (
        <div className="flex justify-end">
          <Button asChild variant="ghost">
            <Link href={linkTo} className="flex items-center">
              View all photos
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>
      
      <Tabs defaultValue="events" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="events">Past Events</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <div className="space-y-12">
            {pastEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageGallery 
                    images={event.images} 
                    totalImages={event.totalImages}
                    linkTo={`/events/${event.id}/gallery`}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="partners">
          <div className="space-y-12">
            {partners.map((partner) => (
              <Card key={partner.id}>
                <CardHeader>
                  <CardTitle>{partner.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageGallery 
                    images={partner.images} 
                    totalImages={partner.totalImages}
                    linkTo={`/partners/${partner.id}/gallery`}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full aspect-video">
            <Image
              src={selectedImage}
              alt="Full size image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}