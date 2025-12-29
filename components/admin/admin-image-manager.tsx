"use client"

const MAX_IMAGE_SIZE_MB = 2;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

import { useState } from "react"
import { Trash2, Upload } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

interface AdminImageManagerProps {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

const AdminImageManager = ({ images, setImages }: AdminImageManagerProps) => {
  const [newImage, setNewImage] = useState<File | null>(null)

  const handleImageUpload = () => {
    if (newImage) {
      const reader = new FileReader()
      reader.onload = () => {
        const newImages = [...images, reader.result as string]
        setImages(newImages)
        localStorage.setItem("adminImages", JSON.stringify(newImages))
        setNewImage(null)
      }
      reader.readAsDataURL(newImage)
    }
  }

  const handleImageDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    localStorage.setItem("adminImages", JSON.stringify(newImages))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Management (Upload less than 2 mb)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files?.[0] || null)}
            />
            <Button onClick={handleImageUpload} disabled={!newImage}>
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`Uploaded image ${index + 1}`} className="rounded-lg object-cover w-full h-full" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => handleImageDelete(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        {images.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No images uploaded yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AdminImageManager
