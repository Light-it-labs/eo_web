import React from "react";

import { Typography } from "@eo/ui";

import {
  CancerPilotCarrouselItems,
  CarrouselItems,
  InovaItems,
  type CarrouselItem,
} from "~/copy/copy";
import { Flows, type FlowType } from "~/stores/useProfilingStore";
import { EoCarousel } from "./Carousel";


interface HowEOWorksProps {
  flow?: FlowType;
}

export const HowEOWorks = ({ flow }: HowEOWorksProps) => {
  let carouselItems: CarrouselItem[] = [];
  switch (flow) {
    case Flows.cancer_pilot:
      carouselItems = CancerPilotCarrouselItems;
      break;
    case Flows.inova:
      carouselItems = InovaItems;
      break;
    default:
      carouselItems = CarrouselItems;
  }

  return (
    <section className="bg-white px-6 py-12 md:px-[50px] md:py-[100px] ">
      <Typography font="bold" variant="large" className="mb-20 text-center">
        {flow === Flows.cancer_pilot
          ? "How the EO Pilot Works"
          : "How EO Care Plans Work"}
      </Typography>
      <EoCarousel>
        {carouselItems.map(({ title, content, step, icon: Icon }) => (
          <article
            key={step}
            className="mx-auto my-0 flex h-auto w-auto max-w-[361px] flex-col items-center justify-center gap-2 md:flex-none md:items-start"
          >
            <div className="flex h-[70.13px] w-[70.13px] flex-row items-center justify-center rounded-full bg-electric-blue fill-gray-50">
              <Icon className="h-9 w-[37px]" />
            </div>

            <Typography className="text-[16px] uppercase leading-4 tracking-[.8px]">
              {step}
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
  );
};
