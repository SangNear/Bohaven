"use client"
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username phải có ít nhất 1 ký tự" }),
  password: z.string().min(1, { message: "Password phải có ít nhất 1 ký tự" }),
})
type FormSchema = z.infer<typeof loginSchema>
const LoginPageAdmin = () => {
  const router = useRouter()
  const { login, user, loading } = useAuthStore()
  const form = useForm<FormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const onSubmit = async (data: FormSchema) => {
    try {
      const { username, password } = data
      await login(username, password)
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi đăng nhập")
      console.log(error)
    }
  }
  useEffect(() => {
    if (user) {
      router.push("/admin/dashboard")
    }
  }, [user])
  return (
    <div className='flex flex-col items-center justify-center h-screen max-md:px-4'>
      <div className='w-full max-w-md  flex flex-col border-2 p-4 rounded-md'>

        <h1 className='text-2xl font-bold mb-4 text-center'>Đăng nhập hệ thống quản trị</h1>


        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-3'>
            <Label>Username</Label>
            <Input
              type='text'
              placeholder='Nhap username'
              {...form.register('username')}
              className='border-2 border-gray-300 rounded-md p-2'
            />
            <p className='text-red-500'>{form.formState.errors.username?.message}</p>
          </div>

          <div className='flex flex-col gap-3'>
            <Label>Password</Label>
            <Input
              type='password'
              placeholder='Nhap password'
              {...form.register('password')}
            />
            <p className='text-red-500'>{form.formState.errors.password?.message}</p>
          </div>

          <Button type='submit' className='bg-blue-500 text-white rounded-md p-6 mt-3 w-full' disabled={loading}>Đăng nhập</Button>
          {loading && <div className='flex items-center justify-center'>
            <Loader2 className='w-4 h-4 animate-spin' />
          </div>}
        </form>
      </div>

    </div>
  )
}

export default LoginPageAdmin