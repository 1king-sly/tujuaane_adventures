"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data (replace with actual API call)
const getEventGallery = (id: string) => ({
  id,
  title: 'Mount Kenya Expedition 2023',
  date: '2023-06-15',
  images: [
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    'https://images.unsplash.com/photo-1682687220063-4742bd7c98d7',
    'https://images.unsplash.com/photo-1682687220208-22d7a2543e88',
    // Add more images...
  ]
})

export default function EventGalleryPage() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const event = getEventGallery(id as string)

  return (
    <div className="container mx-auto px-4 py-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{event.title} Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gallery-grid">
            {event.images.map((image, index) => (
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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