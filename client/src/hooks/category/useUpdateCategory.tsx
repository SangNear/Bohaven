import { CategoryPayload, categoryService } from '@/services/category.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

interface UpdateCategoryPayload {
    id: string
    payload: CategoryPayload
}

const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    return (
        useMutation({
            mutationFn: ({ id, payload }: UpdateCategoryPayload) => categoryService.updateCategory(id, payload),
            onSuccess: (_data, variables) => {
                queryClient.invalidateQueries({ queryKey: ["categories"] })
                queryClient.invalidateQueries({ queryKey: ["category", variables.id] })
            },
            onError: (error: any) => {
                toast.error(error.response.data.message)
            },
            
        })
    )
}

export default useUpdateCategory