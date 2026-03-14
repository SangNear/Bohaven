import api from "@/lib/axios"

interface BookPayload {
    title: string
    author: string
    publishedYear: number
    size: string
    format: string
    content: string
    price: number
    stock: number
    categories: string[]
    images: string[]
}

const bookService = {
    uploadImages: async (images: File[]) => {
        const formData = new FormData()
        images.forEach(image => {
            formData.append("images", image)
        })
        const res = await api.post("/books/upload", formData)
        
        return res.data
    },
    createBook: async (payload: BookPayload) => {
        const res = await api.post("/books/create", payload)
        return res.data
    }
}

export default bookService