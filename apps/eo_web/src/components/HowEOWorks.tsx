import { Typography } from '@eo/ui'
import React from 'react'
import { EoCarousel } from './Carousel'
import { CarrouselItems } from '~/copy/copy'

export const HowEOWorks = () => {
  return (
    <section className="bg-white px-6 py-12 md:px-[50px] md:py-[100px] ">
      <Typography font="bold" variant="large" className="mb-20 text-center">
        How eo care plans work
      </Typography>
      <EoCarousel>
        {CarrouselItems.map(({ title, content, step, icon: Icon }) => (
          <article
            key={step}
            className="mx-auto my-0 flex h-auto w-auto max-w-[361px] flex-col items-center justify-center gap-2 md:flex-none md:items-start"
          >
            <div className="flex h-[70.13px] w-[70.13px] flex-row items-center justify-center rounded-full bg-electric-blue fill-gray-50">
              <Icon className="h-9 w-[37px]" />
            </div>

            <Typography className="text-[16px] uppercase leading-4 tracking-[.8px]">
              STEP {step}
            </Typography>
            <Typography font="bold" className="text-xl">
              {title}
            </Typography>
            <Typography className="text-center text-lg md:text-left">
              {content}
            </Typography>
          </article>
        ))}
      </EoCarousel>
    </section>
  )
}
