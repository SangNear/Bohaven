import api from "@/lib/axios"

interface CategoryParams {
    page: number
    limit: number
    search: string
    isActive?: boolean
}

export interface CategoryPayload {
    name: string
    description?: string
}

export const categoryService = {
    getCategories: async (params: CategoryParams) => {
        const res = await api.get("/categories", { params })
        return res.data
    },
    createCategory: async (payload: CategoryPayload) => {
        const res = await api.post("/categories/create", payload)
        return res.data
    },
    getCategoryById: async (id: string) => {
        const res = await api.get(`/categories/${id}`)
        return res.data
    },
    updateCategory: async(id:string, payload: CategoryPayload) => {
        const res = await api.put(`/categories/update/${id}`, payload)
        return res.data
    },
    deleteCategory: async(id:string) => {
        const res = await api.put(`/categories/soft-delete/${id}`)
        return res.data
    }
}