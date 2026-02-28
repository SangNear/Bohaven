import CardCustom from '@/components/shared/cardCustom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'
import React from 'react'

const AdminCategories = () => {
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
        />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Hoạt động</SelectItem>
            <SelectItem value="inactive">Không hoạt động</SelectItem>
          </SelectContent>
        </Select>

        <Button className="bg-blue-600 text-white ml-auto">
          + Thêm danh mục
        </Button>
      </div>

      {/* table for categories */}
      <div className="border rounded-md">
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
            <TableRow>
              <TableCell className="font-medium">Máy giặt</TableCell>
              <TableCell>may-giat</TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-700">
                  Active
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="icon" variant="ghost">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Tủ lạnh</TableCell>
              <TableCell>tu-lanh</TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-700">
                  Active
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="icon" variant="ghost">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminCategories