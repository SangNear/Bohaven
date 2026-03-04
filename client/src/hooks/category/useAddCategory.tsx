import { categoryService } from "@/services/category.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useAddCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        
        mutationFn: categoryService.createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        },
        onError: (error: any) => {
            toast.error(error.response.data.message)
        },
    })
}