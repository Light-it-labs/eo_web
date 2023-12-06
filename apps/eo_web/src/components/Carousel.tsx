// import Swiper core and required modules

import { type Swiper as SwiperType } from "swiper";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useIsDesktop, useIsMobile } from "~/hooks/useIsMobile";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import React, { Fragment, useRef } from "react";

import { tw } from "@eo/shared";
import { icons } from "@eo/ui";





export interface EoCarouselProps {
  children: React.ReactNode[];
}

export const EoCarousel = ({ children }: EoCarouselProps) => {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const swiperRef = useRef<SwiperType>();

  return (
    <div className="relative mx-auto my-0 flex flex-row items-center justify-center md:max-w-[1440px]">
      <button
        className={tw(
          "left-0 z-10 hidden h-14 w-14 flex-row items-center justify-center rounded-full bg-black md:flex",
        )}
        style={{
          position: "absolute",
        }}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <icons.EoLeftArrowIcon />
      </button>
      <div className="max-w-auto w-full md:max-w-[1211px]">
        <Swiper
          slidesPerGroup={isDesktop ? 3 : 1}
          loop
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={isDesktop ? 3 : 1}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={{
            enabled: isMobile,
            clickable: true,
            bulletClass: "swiper-pagination-bullet bg-black h-3 w-3",
          }}
          navigation={{
            enabled: isDesktop,
          }}
        >
          {children.map((item, key) => {
            return (
              <Fragment key={`${key}`}>
                <SwiperSlide>
                  <div className="mb-12">{item}</div>
                </SwiperSlide>
              </Fragment>
            );
          })}
        </Swiper>
      </div>
      <button
        className={tw(
          "right-0 z-10 flex h-14 w-14 flex-row items-center justify-center rounded-full bg-black",
          isMobile && "hidden",
        )}
        onClick={() => swiperRef.current?.slideNext()}
        style={{
          position: "absolute",
        }}
      >
        <icons.EoRightArrowIcon />
      </button>
    </div>
  );
};
