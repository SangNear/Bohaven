import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Image from 'next/image'
import { PlusIcon, Trash2Icon, UploadCloudIcon } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'


interface ImageUploadProps {
    imagesState: File[]
    imagesStore: string[]
    handleUploadImage: () => void
    handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void
    refFile: React.RefObject<HTMLInputElement> | null
    isUploadingImages: boolean
    handleDeleteImage: (image: string) => void
}

const ImageUpload = ({ imagesStore, imagesState, handleUploadImage, handleChangeFile, refFile, isUploadingImages, handleDeleteImage }: ImageUploadProps) => {

    return (
        <div className='flex flex-col gap-2'>

            <Label>Hình ảnh</Label>
            <div
                onClick={handleUploadImage}
                ref={refFile}
                className='border border-dashed border-gray-300 rounded-md p-4 h-20 bg-[#e4f5f1] flex flex-col items-center justify-center cursor-pointer gap-2'
            >
                <UploadCloudIcon size={80} className="text-gray-500" />
                <p>Click to upload</p>
            </div>
            <Input ref={refFile} className='hidden' type='file' multiple onChange={handleChangeFile} />
            <div className='grid grid-cols-3 gap-4'>
                {imagesStore.length > 0 && imagesStore.map((image: string) => (


                    <div key={image} className='relative group hover:scale-105 transition-all duration-300'>
                        <div className="aspect-square w-full min-h-[100px] bg-muted rounded-md overflow-hidden flex items-center justify-center">
                            <Image
                                key={image}
                                className="rounded-md object-contain w-full h-full"
                                src={image}
                                alt="Uploaded image"
                                width={100}
                                height={100}
                            />
                        </div>
                        <Trash2Icon className='size-5 cursor-pointer absolute top-2 right-2 text-red-500 bg-white p-1 rounded-full md:hidden group-hover:block' onClick={() => handleDeleteImage(image)} />
                    </div>
                ))}
                
                {isUploadingImages &&
                    Array.from({
                        length: Math.max(1, imagesState?.length ?? 0)
                    }).map((_, i) => (
                        <Skeleton
                            key={`skeleton-${i}`}
                            className="w-full aspect-square min-h-[80px]"
                        />
                    ))}
            </div>
        </div>
    )
}

export default React.memo(ImageUpload)