import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface CardCustomProps {
  title: string;
  value: string;
}


const CardCustom = ({ title, value }: CardCustomProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

export default CardCustom