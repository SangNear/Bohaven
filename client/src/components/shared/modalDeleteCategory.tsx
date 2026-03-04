import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

interface ModalDeleteCategoryProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: () => void
    categoryId: string
}

const ModalDeleteCategory = ({ open, onOpenChange, onSubmit, categoryId }: ModalDeleteCategoryProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Bạn có chắc chắn muốn xóa danh mục này không?</DialogTitle>
                </DialogHeader>

                <Button variant="destructive" onClick={onSubmit}>
                    Xóa danh mục
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Hủy
                </Button>
            </DialogContent>



        </Dialog>
    )
}

export default ModalDeleteCategory