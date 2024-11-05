"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data (replace with actual API call)
const getPartnerGallery = (id: string) => ({
  id,
  name: 'Kenya Wildlife Service',
  images: [
    'https://images.unsplash.com/photo-1682687220199-d0124f48f95b',
    'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae',
    'https://images.unsplash.com/photo-1682687220067-dced0a5865c5',
    // Add more images...
  ]
})

export default function PartnerGalleryPage() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const partner = getPartnerGallery(id as string)

  return (
    <div className="container mx-auto px-4 py-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{partner.name} Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gallery-grid">
            {partner.images.map((image, index) => (
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