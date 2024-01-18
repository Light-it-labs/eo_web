import { Typography } from '@eo/ui'
import type { ReactNode } from "react";

interface AllDonePanelProps {
  children?: ReactNode
}

export const AllDonePanel = ({ children }: AllDonePanelProps) => {
  return (
    <section className="flex h-auto flex-col items-center justify-center px-[20%] md:min-h-[479px] pb-10">
      <Typography
        variant="large"
        className="text-[42px] font-bold leading-[55px]"
      >
        All done!
      </Typography>

      <br />
      {children}
    </section>
  )
}
