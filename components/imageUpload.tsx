"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  defaultImage?: string
}

export default function ImageUpload({ onImageSelect, defaultImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
      onImageSelect(file)
    }
  }, [onImageSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    multiple: false
  })

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setPreview(null)
  }

  return (
    <div className="space-y-2">
      <div 
        {...getRootProps()} 
        className={`image-upload-preview ${isDragActive ? 'border-primary' : ''}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative h-full">
            <Image
              src={preview}
              alt="Upload preview"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
              <p className="text-white">Click or drag to replace</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-4">
            <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
            <p className="text-sm text-center text-muted-foreground">
              {isDragActive ? (
                "Drop the image here"
              ) : (
                <>
                  Drag & drop an image here, or click to select
                  <br />
                  <span className="text-xs">
                    Supports: JPG, PNG, WEBP
                  </span>
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}