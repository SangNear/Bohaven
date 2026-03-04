import { categoryService } from '@/services/category.service'
import { useQuery } from '@tanstack/react-query'


const useGetCategoryById = (id: string) => {
    return (
        useQuery({
            queryKey: ["category", id],
            queryFn: () => categoryService.getCategoryById(id),
            enabled: !!id,
        })
    )
}

export default useGetCategoryById