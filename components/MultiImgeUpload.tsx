import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MultiImageUploadProps {
  onImagesSelect: (files: File[]) => void
  maxFiles?: number
}

export default function MultiImageUpload({ 
  onImagesSelect, 
  maxFiles = 10 
}: MultiImageUploadProps) {
  const [previews, setPreviews] = useState<Array<{ file: File; preview: string }>>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPreviews = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setPreviews(prev => [...prev, ...newPreviews])
    onImagesSelect(acceptedFiles)
  }, [onImagesSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles,
    multiple: true
  })

  const removeImage = (index: number) => {
    setPreviews(prev => {
      const newPreviews = [...prev]
      URL.revokeObjectURL(newPreviews[index].preview)
      newPreviews.splice(index, 1)
      onImagesSelect(newPreviews.map(p => p.file))
      return newPreviews
    })
  }

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={cn(
          "border-2 border-dashed rounded-lg p-4 transition-all duration-200 cursor-pointer",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          previews.length > 0 && "border-solid"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center p-4">
          <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
          <p className="text-sm text-center text-muted-foreground">
            {isDragActive ? (
              "Drop the images here"
            ) : (
              <>
                Drag & drop images here, or click to select
                <br />
                <span className="text-xs">
                  Supports: JPG, PNG, WEBP (Max {maxFiles} files)
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={preview.preview} className="relative aspect-square group">
              <Image
                src={preview.preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}