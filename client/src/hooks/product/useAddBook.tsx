import bookService from '@/services/book.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

const useAddBook = () => {
    const queryClient = useQueryClient()
    return (
        useMutation({
            mutationFn: bookService.createBook,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["books"] })
            },
            onError: (error: any) => {
                toast.error(error.response.data.message)
            },
        })
    )
}

export default useAddBook