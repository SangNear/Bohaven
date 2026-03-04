import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Pencil, Trash2 } from 'lucide-react'

interface Category {
    _id: string
    name: string
    slug: string
    isActive: boolean
}

interface CategoryTableProps {
    data: Category[]
    setIsOpenModelCategory: (open: boolean) => void
    setCategoryId: (id: string) => void
    setIsOpenModelDeleteCategory: (open: boolean) => void
}

const CategoryTable = ({ data, setCategoryId, setIsOpenModelCategory, setIsOpenModelDeleteCategory }: CategoryTableProps) => {

    const handleEditCategory = (id: string) => {
        setCategoryId(id)
        setIsOpenModelCategory(true)
    }
    const handleDeleteCategory = (id: string) => {
        setCategoryId(id)
        setIsOpenModelDeleteCategory(true)
    }

    return (

        <Table>
            <TableHeader>
                <TableRow className="bg-gray-50">
                    <TableHead className="w-[40%]">Tên danh mục</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data?.length > 0 ? (
                    data?.map((category: Category) => {
                        return (
                            <TableRow key={category._id}>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell>{category.slug}</TableCell>
                                <TableCell>
                                    <Badge className="bg-green-100 text-green-700">
                                        {category.isActive ? "Hoạt động" : "Không hoạt động"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button size="icon" variant="ghost" onClick={() => handleEditCategory(category._id)} >
                                        <Pencil className="w-4 h-4 cursor-pointer" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="text-red-500"
                                        onClick={() => handleDeleteCategory(category._id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">Không có dữ liệu</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
export default CategoryTable