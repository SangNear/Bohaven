import { categoryService } from "@/services/category.service"
import { useCategoryStore } from "@/store/useCategoryStore"
import { useQuery } from "@tanstack/react-query"

export const useCategories = () => {
    const { page, limit, search, isActive } = useCategoryStore()

    return useQuery({
        queryKey: ["categories", page, limit, search, isActive],
        queryFn: () => categoryService.getCategories({ page, limit, search, isActive }),
        refetchOnWindowFocus: false,
        
    })

    
}