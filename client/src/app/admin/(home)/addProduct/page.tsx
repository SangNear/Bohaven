"use client"
import ImageUpload from '@/components/shared/imageUpload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, PlusIcon, SaveIcon, TrashIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useUploadImages } from '@/hooks/product/useUploadImages'
import { useUploadImagesStore } from '@/store/useUploadImagesStore'
import SelectedCategories from '@/components/shared/selectedCategories'

const bookSchema = z.object({
  title: z.string().min(1, { message: "Tên sách phải có ít nhất 1 ký tự" }),
  author: z.string().min(2, { message: "Tên Tác giả phải có ít nhất 2 ký tự" }),
  publishedYear: z.string().min(1, { message: "Năm xuất bản phải có ít nhất 1 ký tự" }),
  size: z.string().min(1, { message: "Kích thước phải có ít nhất 1 ký tự" }),
  format: z.string().min(1, { message: "Định dạng phải có ít nhất 1 ký tự" }),
  content: z.string(),
  price: z.string().min(1, { message: "Giá phải có ít nhất 1 ký tự" }),
  stock: z.string().min(1, { message: "Số lượng phải có ít nhất 1 ký tự" }),
  categories: z.array(z.string()).min(1, { message: "Phải có ít nhất 1 thể loại" })
})
export type BookSchemaValues = z.infer<typeof bookSchema>

const categories = ["Trinh thám", "Văn học", "Tiểu thuyết", "Kinh dị", "Truyện tranh"]
const AddProduct = () => {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([categories[0]]);
  const [images, setImages] = React.useState<File[]>([]);
  const { mutate: uploadImagesMutation } = useUploadImages()
  const { isUploadingImages } = useUploadImagesStore()

  const { register, handleSubmit, formState: { errors, isSubmitting } , setValue } = useForm<BookSchemaValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      publishedYear: "",
      size: "",
      format: "",
      content: "",
      price: "",
      stock: "",
      categories: [categories[0]]

    },
  })

  const refFile = React.useRef<HTMLInputElement | null>(null);
  const handleUploadImage = () => {
    refFile.current?.click();

  }
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(Array.from(files));


    }

  }
  useEffect(() => {
    if (images.length > 0) {
      uploadImagesMutation(images)
    }
  }, [images])




  const onSubmit = (data: BookSchemaValues) => {
    const convertedData = {
      ...data,
      publishedYear: Number(data.publishedYear),
      price: Number(data.price),
      stock: Number(data.stock),
    }
    console.log(convertedData);
  }
  return (
    <div className='px-4 md:px-6 py-4  w-full'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-semibold max-md:text-xl'>Thêm sản phẩm</h1>
        <div className='ml-auto flex items-center gap-2'>

          <Button variant={"outline"} className="">
            <SaveIcon className='size-4' />
            <span className='hidden md:block'>Lưu nháp</span>

          </Button>
          <Button variant={"destructive"} className="">
            <TrashIcon />
            <span className='hidden md:block'>Xóa</span>
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col md:flex-row gap-4 mt-4 '>
        <div className='flex-[2] border border-gray-200 rounded-md p-6 '>
          <h2 className='text-lg font-semibold'>Thông tin sách</h2>
          <div className='flex flex-col gap-4 mt-5'>
            {/* 1. Tên sách */}
            <div className='flex flex-col gap-2'>
              <Label>Tên sách<span className='text-red-500'>*</span></Label>
              <Input
                className='bg-secondaryColor'
                type='text'
                placeholder='Nhập tên sách'
                {...register('title')}
              />
              <p className='text-red-500'>{errors.title?.message}</p>
            </div>

            {/* 2. Thông tin sách */}
            <div className='grid grid-cols-2 gap-4 mt-5'>
              <div className='flex flex-col gap-2'>
                <Label>Tác giả</Label>
                <Input
                  type='text'

                  placeholder='Nhập tác giả'
                  {...register('author')}
                />
                <p className='text-red-500'>{errors.author?.message}</p>
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Năm xuất bản</Label>
                <Input
                  type='text'
                  placeholder='Nhập năm xuất bản'
                  {...register('publishedYear')}
                />
                <p className='text-red-500'>{errors.publishedYear?.message}</p>
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Kích thước</Label>
                <Input
                  type='text'
                  placeholder='Nhập kích thước'
                  {...register('size')}

                />
                <p className='text-red-500'>{errors.size?.message}</p>
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Định dạng</Label>
                <Input
                  type='text'
                  placeholder='Nhập định dạng'
                  {...register('format')}
                />
                <p className='text-red-500'>{errors.format?.message}</p>
              </div>
            </div>

            {/* 3. Mô tả */}
            <div className='flex flex-col gap-2 mt-10'>
              <Label>Mô tả</Label>
              <Textarea placeholder='Nhập mô tả' rows={8} {...register('content')} />
              <p className='text-red-500'>{errors.content?.message}</p>
            </div>

            {/* 4. Giá và hàng tồn kho */}
            <div className='flex gap-4 mt-5'>
              <div className='flex flex-[2] flex-col gap-2'>
                <Label>Giá</Label>
                <Input
                  type='text'
                  placeholder='Nhập giá'

                  {...register('price')}
                />
                <p className='text-red-500'>{errors.price?.message}</p>
              </div>
              <div className='flex flex-[3] flex-col gap-2'>
                <Label>Hàng tồn kho</Label>
                <Input type='text' placeholder='Nhập số lượng' {...register('stock')} />
                <p className='text-red-500'>{errors.stock?.message}</p>
              </div>

            </div>

            {/* 5. Thể loại */}
            <SelectedCategories
              errors={errors}
              categories={categories}
              setValue={setValue}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />

            <Button
              type='submit'
              className=' hidden md:flex bg-mainColor text-white cursor-pointer'
            >
              <PlusIcon className='size-4' />
              <span className='hidden md:block'>Thêm sản phẩm</span>
            </Button>

          </div>
        </div>
        <div className='flex-[1] border border-gray-200 rounded-md p-4 overflow-y-hidden '>
          <ImageUpload
            refFile={refFile as React.RefObject<HTMLInputElement>}
            images={images}
            handleUploadImage={handleUploadImage}
            handleChangeFile={handleChangeFile}
            isUploadingImages={isUploadingImages}
          />
        </div>

        <Button disabled={isSubmitting} type='submit' className=' md:hidden flex w bg-mainColor text-white'>
          <PlusIcon className='size-4' />
          <span >{isSubmitting ? <Loader2 className='size-4 animate-spin' /> : 'Thêm sản phẩm'}</span>
        </Button>
      </form>
    </div>
  )
}

export default AddProduct