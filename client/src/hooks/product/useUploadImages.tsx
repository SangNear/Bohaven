import bookService from "@/services/book.service"
import { useUploadImagesStore } from "@/store/useUploadImagesStore"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUploadImages = () => {
    const { setImagesUploaded, setIsUploadingImages } = useUploadImagesStore()
    return useMutation({
        mutationFn: async (images: File[]) => {
            setIsUploadingImages(true);
            return bookService.uploadImages(images);
        },
        onSuccess: (data) => {
            setImagesUploaded(data.data);
            toast.success("Tải lên hình ảnh thành công")
        },
        onSettled: () => {
            setIsUploadingImages(false);
        },
    });
}