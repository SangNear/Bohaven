import { create } from "zustand"

interface UploadImagesStore {
    imagesUploaded: string[]
    setImagesUploaded: (images: string[]) => void
    clearImagesUploaded: () => void
    isUploadingImages: boolean
    setIsUploadingImages: (isUploadingImages: boolean) => void
}

export const useUploadImagesStore = create<UploadImagesStore>((set) => ({
    imagesUploaded: [],
    setImagesUploaded: (images: string[]) => set({ imagesUploaded: images }),
    clearImagesUploaded: () => set({ imagesUploaded: [] }),
    isUploadingImages: false,
    setIsUploadingImages: (isUploadingImages: boolean) => set({ isUploadingImages }),
}))