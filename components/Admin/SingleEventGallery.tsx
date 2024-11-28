"use client";

import { useState, useEffect } from "react";
import Image from 'next/image'

import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/imageUpload";


import { useToast } from "@/hooks/use-toast";
import MultiImageUpload from "../MultiImgeUpload";



export default function SingleEventGallery({
  images,id
}: {
    images: string[],id:string;
}) {
  const [uploadedImages, setImages] = useState<string[]>(images);

    const [newImages, setNewImages] = useState<File[]>([])
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false)


  const handleDelete = async (id: string) => {
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted.",
    });
  };

  const handleImagesSelect = async (files: File[]) => {
    if (files.length === 0) return

    setNewImages(files)

  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  const handleSaveGallery = async () => {

    try {
      setIsUploading(true)
        const formData = new FormData();

        if (newImages) {
          newImages.forEach(image => {
            formData.append('images', image)
          })        }
        const response = await fetch(`${API_URL}/events/${id}/upload`, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tujuane_access_token"),
          },
          body: formData,
        });
  
        const data = await response.json()  
        if (response.ok) {
          setNewImages([])
          handleImagesSelect([])
          setIsUploading(false)
          setImages(data.images)

          toast({
            title: "Images Uploaded Successfully",
            description: `Gallery has been successfully updated.`,
          });

        } else {
          toast({
            title: "Failed",
            description: ` could not update gallery.`,
            variant: "destructive",
          });
          setIsUploading(false)

        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update gallery. Please try again.",
          variant: "destructive",
        });
        setIsUploading(false)

      }

  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery</h1>
      </div>

      <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {uploadedImages?.map((image, index) => (
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
                  <MultiImageUpload 
                  onImagesSelect={handleImagesSelect}
                  maxFiles={5}
                  clearOnSuccess={newImages.length === 0}
                /> {newImages.length > 0 && (
                    <div className="flex justify-end">
                      <Button onClick={handleSaveGallery} disabled={isUploading}>
                        Save New Images
                      </Button>
                    </div>
                  )}
                </div>
              </div>
    </div>
  );
}
