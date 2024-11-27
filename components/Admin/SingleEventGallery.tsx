"use client";

import { useState, useEffect } from "react";
import Image from 'next/image'

import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/imageUpload";


import { useToast } from "@/hooks/use-toast";



export default function SingleEventGallery({
  images,
}: {
    images: string[];
}) {
    const [newImages, setNewImages] = useState<File[]>([])
    const { toast } = useToast();

  const handleDelete = async (id: string) => {
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted.",
    });
  };

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery</h1>
      </div>

      <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {images?.map((image, index) => (
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
    </div>
  );
}
