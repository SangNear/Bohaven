
import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { Textarea } from '../ui/textarea'

export interface InputsCategory {
    name: string
    description?: string
}
interface Category {
    _id: string
    name: string
    description?: string
    slug: string
    isActive: boolean
}
interface ModalAddCategoryProps {
    open: boolean
    onSubmit: (data: z.infer<typeof formSchema>) => void
    onOpenChange: (open: boolean) => void
    category: Category | null
    isAddingCategory: boolean
}


const formSchema = z.object({
    name: z.string().min(1, { message: "Tên danh mục phải có ít nhất 1 ký tự" }),
    description: z.string().optional(),
})

const ModalAddCategory = ({ open, onSubmit, onOpenChange, category, isAddingCategory }: ModalAddCategoryProps) => {
    console.log(category);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: category
            ? { name: category.name, description: category.description ?? "" }
            : { name: "", description: "" },
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm danh mục</DialogTitle>
                </DialogHeader>

                <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-2'>
                        <Label>Tên danh mục</Label>
                        <Input {...form.register('name')} />
                        <p className='text-red-500'>{form.formState.errors.name?.message}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Mô tả</Label>
                        <Textarea placeholder='Mô tả danh mục' rows={4} {...form.register('description')} />
                        <p className='text-red-500'>{form.formState.errors.description?.message}</p>
                    </div>
                    <Button type="submit">

                        {category ? "Cập nhật danh mục" : isAddingCategory ? <Loader2 className='w-4 h-4 animate-spin' /> : 'Thêm danh mục'}
                    </Button>
                </form>

            </DialogContent>



        </Dialog>
    )
}

export default ModalAddCategory