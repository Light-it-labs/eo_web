import { Button, Typography } from '@eo/ui'
import React from 'react'

export const EOInYourInbox = () => {
  return (
    <section className="w-full bg-white px-6 py-12 md:px-[50px] md:py-[100px]">
      <div className="flex flex-col items-center">
        <Typography
          font="bold"
          className="mb-4 text-center text-[32px] leading-[40px] text-skunk"
        >
          eo in your inbox
        </Typography>
        <Typography className="text-center text-skunk-mid">
          Rollouts in new markets, new partnerships, research initiatives and
          special offers are all coming soon.
        </Typography>
        <div className="mt-[30px] flex w-full flex-col justify-items-end gap-4 md:w-auto md:flex-row">
          <input
            className="h-[49px] w-full rounded-[40px] border border-solid border-black bg-white py-3 pl-4 pr-2 text-black placeholder:text-gray-300 md:w-[327px]"
            placeholder="Enter your email..."
          />
          <Button variant="black" font="semiBold">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  )
}
