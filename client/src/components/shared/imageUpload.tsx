import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Image from 'next/image'
import { PlusIcon, UploadCloudIcon } from 'lucide-react'


interface ImageUploadProps {
    images: File[] | string[]
    handleUploadImage: () => void
    handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void
    refFile: React.RefObject<HTMLInputElement> | null
    isUploadingImages: boolean
}

const ImageUpload = ({ images, handleUploadImage, handleChangeFile, refFile, isUploadingImages }: ImageUploadProps) => {
    console.log("hình ảnh trong store", images);
    return (
        <div className='flex flex-col gap-2'>
            <Label>Hình ảnh</Label>
            <div onClick={handleUploadImage} ref={refFile} className='border border-dashed border-gray-300 rounded-md p-4 h-20 bg-[#e4f5f1] flex flex-col items-center justify-center cursor-pointer gap-2'>
                <UploadCloudIcon size={80} className="text-gray-500" />
                <p>Click to upload</p>
            </div>
            <Input ref={refFile} className='hidden' type='file' multiple onChange={handleChangeFile} />
            <div className='grid grid-cols-3 gap-4'>
                {images.length > 0 && images.map((image) => (
                    <Image
                        key={image instanceof File ? image.name : image}
                        className={`rounded-md object-cover w-30 h-30 ${isUploadingImages ? 'animate-pulse' : ''}`}
                        src={image instanceof File ? URL.createObjectURL(image) : image}
                        alt="Uploaded image" width={100} height={20} />
                ))}
            </div>
        </div>
    )
}

export default React.memo(ImageUpload)