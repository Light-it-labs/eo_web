import { Typography, icons } from "@eo/ui";
import { EOInYourInbox } from "~/components/EOInYourInbox";
import { NumberedStep } from "~/components/NumberedStep";
import { WEB_APP_URL } from "~/configs/env";
import { LayoutDefault } from "~/layouts";
import { FooterFull } from "~/layouts/FooterFull";

export const StartPlan = () => {

  return (
    <LayoutDefault >
      <section className="pt-2 pb-[48px] lg:pt-[60px] lg:pb-[100px] self-center flex-col flex items-center px-6 md:px-10">
        <Typography
          font="bold"
          className="text-center text-[32px] leading-[40px] mb-[40px] max-w-[857px]"
        >
          When you’re ready to begin, just follow these steps:
        </Typography>
        <Typography
          className="text-center text-lg leading-[30px] lg:text-[22px] lg:leading-[36px] lg:mb-20 mb-10 max-w-[857px] text-gray-950 lg:text-black"
        >
          It’s important for us to understand when you begin your care plan. Note that you should have all of your recommended products in-hand before beginning.
        </Typography>

        <div className="lg:flex-row flex-col gap-10 flex mb-10 lg:mb-[100px]">
          <NumberedStep number={1} title="Log into your account">
            <Typography
              className="text-center text-skun-mid text-sm lg:text-lg leading-[24px] lg:leading-[30px]"
            >
              Go to <a href={`${WEB_APP_URL}/login`} className="underline">{WEB_APP_URL}/login</a> to log into your account. To access your care plan, you’ll need the ID and password you created when you set-up your eo account.
            </Typography>
          </NumberedStep>
          <NumberedStep number={2} title="Click the blue button">
            <Typography
              className="text-center text-skun-mid text-sm lg:text-lg leading-[24px] lg:leading-[30px]"
            >
              On the Home screen, you’ll see a blue button that looks like the one below. Click the button to let us know you’re ready to begin.
            </Typography>
            <div className="bg-electric-blue rounded-3xl px-5 py-2.5 flex flex-row gap-3 items-center">
              <Typography
                font="semiBold"
                className="text-xl text-white"
              >
                Begin care plan
              </Typography>
              <icons.LinkIcon />
            </div>
          </NumberedStep>
          <NumberedStep number={3} title="Begin your care!">
            <Typography
              className="text-center text-skun-mid text-sm lg:text-lg leading-[24px] lg:leading-[30px]"
            >
              Follow the instructions on the white dose cards that are shown in your Home screen. You can track whether you have taken each dose within this card as well.
            </Typography>
          </NumberedStep>
        </div>

        <Typography
          variant="base"
          font="regular"
          className="max-w-[750px] text-center text-sm md:text-[22px] font-normal leading-[24px] md:leading-[36px]"
        >
          Have a question? We’re here to help. Email support@eo.care, call 888-823-6143, or{" "}
          <a
            className="underline"
            href={WEB_APP_URL}
            target="_blank"
          >
            log in to message us
          </a>.
        </Typography>
      </section>
      <EOInYourInbox />
      <FooterFull />
    </LayoutDefault>
  );
};
