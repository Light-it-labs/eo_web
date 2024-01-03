import { Typography } from '@eo/ui'
import React from 'react'
import { faqs } from '~/copy/copy'
import { Collapsible } from './Collapsible'

export const FAQs = () => {
  return (
    <section className="px-6 py-12 md:mx-0 md:my-[100px]">
      <div className="mx-auto my-0 flex max-w-[900px] flex-col">
        <Typography
          font="bold"
          variant="large"
          className="mb-[50px] text-center"
        >
          FAQs
        </Typography>
        <div className="flex flex-col gap-6">
          {faqs.map(({ title, content }) => (
            <Collapsible key={title} title={title} active={false}>
              <Typography className="text-[18px] leading-[26px] text-gray-800">
                {content}
              </Typography>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  )
}
