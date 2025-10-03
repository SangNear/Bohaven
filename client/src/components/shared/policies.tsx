import { policyList } from '@/config'
import { Truck } from 'lucide-react'
import React from 'react'

const Policies = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1230px] mx-auto mt-5 max-md:px-4'>
      {policyList.map(item => (
        <div className='border border-mainColor rounded-md px-4 py-4 flex items-center justify-center gap-2 md:gap-4 max-w-[270px] min-h-[92px]'>
          <Truck className='text-mainColor ' />
          <p className='uppercase text-mainColor text-center font-bold  text-sm md:text-[16px] md:max-w-[170px]'>{item.label}</p>

        </div>
      ))}
    </div>
  )
}

export default Policies