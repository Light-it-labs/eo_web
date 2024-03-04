import { Typography } from '@eo/ui'
import React from 'react'

interface NumberedStepProps {
  number: number
  title: string
  children: React.ReactNode
}

export const NumberedStep = ({ number, title, children }: NumberedStepProps) => {
  return (
    <div className="flex flex-col items-center gap-4 max-w-[360px]">
      <div className="rounded-full bg-electric-blue w-[70px] h-[70px] items-center justify-center flex">
        <span className="text-white font-bold text-[40px] ">{number}</span>
      </div>
      <Typography
        font="bold"
        className="text-center text-xl leading-[28px]"
      >
        {title}
      </Typography>
      {children}
    </div>
  )
}
