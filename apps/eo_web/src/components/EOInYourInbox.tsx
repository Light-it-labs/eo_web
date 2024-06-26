import { Button, Typography } from '@eo/ui'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { subscribeToEoEmailPost } from '~/api/email'
import { toast } from 'react-toastify'

export const EOInYourInbox = () => {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const { mutate, isLoading } = useMutation({
    mutationFn: subscribeToEoEmailPost,
    onSuccess: () => setSubmitted(true),
    onError: () => toast.error("Something went wrong, try again.")
  });

  return (
    <section className="w-full bg-white px-6 py-12 md:px-[50px] md:py-[100px]">
      <div className="flex flex-col items-center">
        <Typography
          font="bold"
          className="mb-4 text-center text-[32px] leading-[40px] text-skun"
        >
          EO in your inbox
        </Typography>
        <Typography className="text-center text-skun-mid">
          Rollouts in new markets, new partnerships, research initiatives and
          special offers are all coming soon.
        </Typography>
        {!submitted ?
          (<form onSubmit={
            (e) => {
              e.preventDefault()
              mutate(email)
            }} className="mt-[30px] flex w-full flex-col justify-items-end gap-4 md:w-auto md:flex-row">
            <input
              className="h-[49px] w-full rounded-[40px] border border-solid border-black bg-white py-3 pl-4 pr-2 text-black placeholder:text-gray-300 md:w-[327px]"
              placeholder="Enter your email..."
              type='email'
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <Button type='submit' variant="black" font="semiBold" disabled={isLoading || !email}>
              Subscribe
            </Button>
          </form>
          ) : (
            <div className="mt-[30px] px-6 py-12 lg:px-32 lg:py-18 rounded-lg border-2 border-black">
              <Typography font="semiBold" className="text-center text-lg  ">
                Thank you! <br />
                Your submission has been received!
              </Typography>
            </div>
          )}
      </div>
    </section >
  )
}
