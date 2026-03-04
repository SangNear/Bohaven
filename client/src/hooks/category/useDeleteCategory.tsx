import { categoryService } from '@/services/category.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

interface DeleteCategoryPayload {
  id: string
}

const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  return (
    useMutation({
      mutationFn: (payload: DeleteCategoryPayload) => categoryService.deleteCategory(payload.id),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["categories"] })
        queryClient.invalidateQueries({ queryKey: ["category", variables.id] })
      },
      onError: (error: any) => {
        toast.error(error.response.data.message)
      },
      
    })
  )
}

export default useDeleteCategory