import { Button, Typography, icons } from "@eo/ui";

import { WEB_APP_URL } from "~/configs/env";

export const SurveyResponded = () => (
  <div className="mx-6 flex flex-col-reverse justify-between lg:ml-8 lg:flex-row xl:mx-0 xl:ml-[155px] xl:mt-[144px] xl:w-[979px] xl:items-center">
    <section className="mt-4 flex flex-col gap-[35px] lg:mt-0">
      <Typography
        variant="large"
        className="!text-[48px] font-extrabold !leading-[120%]"
      >
        Survey already <br />
        responded!
      </Typography>
      <Typography className="text-[20px] text-gray-800" font="regular">
        Thank you for answering our survey! <br />
        Your insights are greatly appreciated and will help us improve.
      </Typography>
      <div>
        <a href={WEB_APP_URL}>
          <Button variant="black">
            <span className="hidden lg:block">Go Back Home</span>
            <span className="lg:hidden">Go Back</span>
          </Button>
        </a>
      </div>
    </section>
    <icons.SurveyIcon className="mt-0 lg:mt-6" />
  </div>
);
