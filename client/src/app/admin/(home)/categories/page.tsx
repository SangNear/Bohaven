"use client"
import CardCustom from '@/components/shared/cardCustom'
import CategoryTable from '@/components/shared/categoryTable'
import ModalAddCategory, { InputsCategory } from '@/components/shared/modalAddCategory'
import ModalDeleteCategory from '@/components/shared/modalDeleteCategory'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAddCategory } from '@/hooks/category/useAddCategory'
import { useCategories } from '@/hooks/category/useCategories'
import useDeleteCategory from '@/hooks/category/useDeleteCategory'
import useGetCategoryById from '@/hooks/category/useGetCategoryById'
import useUpdateCategory from '@/hooks/category/useUpdateCategory'
import { useCategoryStore } from '@/store/useCategoryStore'
import { Loader2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const AdminCategories = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const { data, isLoading } = useCategories()
  const { mutate: createCategory, isPending: isAddingCategory } = useAddCategory()
  const { mutate: updateCategory, isPending: isUpdatingCategory } = useUpdateCategory()
  const { mutate: deleteCategory, isPending: isDeletingCategory } = useDeleteCategory()
  const { data: category, isLoading: isLoadingCategory } = useGetCategoryById(categoryId || "")
  const { page, limit, search, isActive, setPage, setLimit, setSearch, setIsActive } = useCategoryStore()
  const [searchInput, setSearchInput] = useState(search)
  const [isOpenModelCategory, setIsOpenModelCategory] = useState(false)
  const [isOpenModelDeleteCategory, setIsOpenModelDeleteCategory] = useState(false)

  const handleSubmit = (data: InputsCategory) => {
    if (categoryId) {
      updateCategory({
        id: categoryId,
        payload: {
          name: data.name,
          description: data.description,
        },
      },
        {
          onSuccess: () => {
            toast.success("Cập nhật danh mục thành công")
            setIsOpenModelCategory(false)
          },
          onError: (error: any) => {
            console.log(error);
            toast.error(error.response.data.message)
          }
        }
      )
    }
    else {
      createCategory({
        name: data.name,
        description: data.description,
      },
        {
          onSuccess: () => {
            toast.success("Thêm danh mục thành công")
            setIsOpenModelCategory(false)
          },
          onError: (error: any) => {
            console.log(error);
            toast.error(error.response.data.message)
          }
        }
      )
    }

  }
  const handleSubmitDeleteCategory = () => {
    console.log("delete category", categoryId)
    deleteCategory({ id: categoryId || "" }, {
      onSuccess: () => {
        toast.success("Xóa danh mục thành công")
        setIsOpenModelDeleteCategory(false)
      },
      onError: (error: any) => {
        toast.error(error.response.data.message)
      },
    })
    setIsOpenModelDeleteCategory(false)
  }
  const handleOpenModelCategory = () => {
    setCategoryId(null)
    setIsOpenModelCategory(true)
  }
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput)
    }, 500)

    return () => clearTimeout(handler)
  }, [searchInput, setSearch])

  useEffect(() => {
    const params = new URLSearchParams()
    params.set("page", page.toString())
    params.set("limit", limit.toString())
    params.set("search", search)
    params.set("isActive", isActive ? "true" : "false")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })

  }, [page, limit, search, isActive, pathname, router])


  return (
    <div className="p-4">
      {/*  4 Cards statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <CardCustom title="Tổng số danh mục" value="100" />
        <CardCustom title="Danh mục đang hoạt động" value="100" />
        <CardCustom title="Danh mục đang hoạt động" value="100" />
        <CardCustom title="Danh mục đang hoạt động" value="100" />
      </div>

      {/* Action bar */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Tìm theo tên danh mục..."
          className="max-w-sm"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <Select value={isActive ? "true" : "false"} onValueChange={(value) => setIsActive(value === "true" ? true : false)}>
          <SelectTrigger>
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="true">Hoạt động</SelectItem>
            <SelectItem value="false">Không hoạt động</SelectItem>
          </SelectContent>
        </Select>

        <Button className="bg-blue-600 text-white ml-auto cursor-pointer" onClick={handleOpenModelCategory}>
          + Thêm danh mục
        </Button>

        {isOpenModelCategory &&
          <ModalAddCategory
            isAddingCategory={isAddingCategory}
            category={category?.data || null}
            open={isOpenModelCategory}
            onOpenChange={setIsOpenModelCategory}
            onSubmit={handleSubmit}
          />}
        {isOpenModelDeleteCategory &&
          <ModalDeleteCategory
            open={isOpenModelDeleteCategory}
            onOpenChange={setIsOpenModelDeleteCategory}
            onSubmit={handleSubmitDeleteCategory}
            categoryId={categoryId || ""}
          />}
      </div>

      {/* table for categories */}
      <div className="border rounded-md">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <CategoryTable setIsOpenModelDeleteCategory={setIsOpenModelDeleteCategory} setCategoryId={setCategoryId} setIsOpenModelCategory={setIsOpenModelCategory} data={data?.data || []} />
        )}
      </div>
    </div>
  )
}

export default AdminCategories