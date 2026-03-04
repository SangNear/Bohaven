import { categoryService } from "@/services/category.service"
import { create } from "zustand"

interface CategoryFilters {
    page: number
    limit: number
    search: string
    isActive: boolean
    setPage: (page: number) => void
    setLimit: (limit: number) => void
    setSearch: (search: string) => void
    setIsActive: (isActive: boolean | undefined) => void
    reset: () => void
}

export const useCategoryStore = create<CategoryFilters>((set) => ({
    page: 1,
    limit: 10,
    search: "",
    isActive: true,
    setPage: (page: number) => set({ page }),
    setLimit: (limit: number) => set({ limit }),
    setSearch: (search: string) => set({ search }),
    setIsActive: (isActive: boolean | undefined) => set({ isActive }),
    reset: () => set({ page: 1, limit: 10, search: "", isActive: true }),
}))