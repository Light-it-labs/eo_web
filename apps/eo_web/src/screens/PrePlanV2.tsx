import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Button, Typography, icons } from "@eo/ui";

import { ThcProductPreferencesEnum, TimeToUse } from "~/api/PrePlanTypes";
import { useElixirApi } from "~/api/useElixirApi";
import { usePrePlan } from "~/api/usePrePlan";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";

const Edible = () => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 164 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.92656 147.34C14.8215 158.174 40.4865 163.667 81.1941 163.667C104.713 163.667 123.648 161.654 137.417 157.761C147.949 154.808 155.479 150.575 159.79 145.403C161.05 144.072 162.041 142.495 162.706 140.764C163.371 139.033 163.697 137.183 163.664 135.321C163.191 124.778 162.183 114.268 160.645 103.834C157.243 79.8335 151.787 60.0649 144.511 45.0174C132.488 20.0574 115.772 9.26088 103.876 4.59617C96.4487 1.54077 88.4923 0.100139 80.5029 0.364065C72.5868 0.592629 64.7822 2.35349 57.4935 5.55544C45.816 10.5211 29.864 21.3741 19.478 44.8293C10.0923 65.9898 5.39948 89.5015 3.10764 105.489C1.63849 115.377 0.715404 125.343 0.342871 135.34C0.266507 137.559 0.634231 139.77 1.42299 141.835C2.21174 143.9 3.40453 145.774 4.92656 147.34ZM59.6762 11.8754C66.2296 8.96617 73.2482 7.33985 80.3756 7.079V7.24828H80.9212C88.0885 6.98588 95.2303 8.26693 101.893 11.0101C108.8 13.7827 115.165 17.8226 120.683 22.9353C128.191 30.0319 134.315 38.5491 138.727 48.0269C155.388 82.4104 157.207 135.133 157.207 135.66V135.904C156.993 138.028 156.02 139.994 154.479 141.415C149.24 147.227 132.742 156.952 81.1941 156.952C59.7126 156.952 42.451 155.391 29.8822 152.344C20.0964 149.955 13.2936 146.72 9.65577 142.732C8.73849 141.824 8.01535 140.727 7.5329 139.512C7.05045 138.297 6.8194 136.991 6.85462 135.678V135.547C6.85462 135.058 8.03692 86.8118 25.3349 47.6131C32.9198 30.4778 44.47 18.4586 59.6762 11.8754ZM44.7634 44.1274C45.2627 44.4383 45.8336 44.6048 46.4165 44.6097C46.952 44.6028 47.478 44.4624 47.9498 44.2005C48.4216 43.9385 48.8253 43.5627 49.1267 43.1049C55.2816 34.6476 64.1146 28.6958 74.0824 26.2894C74.4968 26.1893 74.8881 26.0059 75.234 25.7494C75.5798 25.493 75.8735 25.1687 76.0981 24.7949C76.3227 24.4211 76.474 24.0052 76.5432 23.571C76.6124 23.1368 76.5983 22.6927 76.5015 22.2642C76.4048 21.8356 76.2274 21.431 75.9794 21.0733C75.7314 20.7156 75.4177 20.412 75.0563 20.1797C74.6948 19.9474 74.2927 19.791 73.8728 19.7194C73.4529 19.6478 73.0235 19.6625 72.609 19.7625C60.9982 22.4967 50.7337 29.4772 43.7063 39.4183C43.3904 39.9249 43.2118 40.5098 43.1892 41.1121C43.1666 41.7144 43.3007 42.312 43.5776 42.8423C43.8545 43.3727 44.264 43.8165 44.7634 44.1274Z"
        fill="black"
      />
      <path
        d="M4.92656 147.34L5.11125 147.172L5.10584 147.166L4.92656 147.34ZM137.417 157.761L137.35 157.52L137.349 157.52L137.417 157.761ZM159.79 145.403L159.608 145.231L159.603 145.237L159.598 145.243L159.79 145.403ZM162.706 140.764L162.939 140.854L162.706 140.764ZM163.664 135.321L163.914 135.317L163.914 135.31L163.664 135.321ZM160.645 103.834L160.397 103.869L160.397 103.871L160.645 103.834ZM144.511 45.0174L144.286 45.1259L144.286 45.1263L144.511 45.0174ZM103.876 4.59617L103.781 4.8274L103.785 4.82891L103.876 4.59617ZM80.5029 0.364065L80.5101 0.613963L80.5111 0.613928L80.5029 0.364065ZM57.4935 5.55544L57.5913 5.78552L57.594 5.78433L57.4935 5.55544ZM19.478 44.8293L19.7065 44.9307L19.7066 44.9306L19.478 44.8293ZM3.10764 105.489L3.35493 105.526L3.35511 105.525L3.10764 105.489ZM0.342871 135.34L0.0930433 135.331L0.0930188 135.331L0.342871 135.34ZM1.42299 141.835L1.18944 141.924H1.18944L1.42299 141.835ZM80.3756 7.079H80.6256V6.81968L80.3664 6.82916L80.3756 7.079ZM59.6762 11.8754L59.7755 12.1048L59.7776 12.1039L59.6762 11.8754ZM80.3756 7.24828H80.1256V7.49828H80.3756V7.24828ZM80.9212 7.24828V7.49845L80.9304 7.49811L80.9212 7.24828ZM101.893 11.0101L101.798 11.2413L101.8 11.2422L101.893 11.0101ZM120.683 22.9353L120.855 22.7536L120.853 22.7519L120.683 22.9353ZM138.727 48.0269L138.5 48.1324L138.502 48.1359L138.727 48.0269ZM157.207 135.904L157.456 135.929L157.457 135.917V135.904H157.207ZM154.479 141.415L154.309 141.232L154.301 141.239L154.293 141.248L154.479 141.415ZM29.8822 152.344L29.8229 152.586L29.8233 152.586L29.8822 152.344ZM9.65577 142.732L9.84069 142.563L9.83167 142.554L9.65577 142.732ZM7.5329 139.512L7.30055 139.604L7.5329 139.512ZM6.85462 135.678L7.10462 135.685V135.678H6.85462ZM25.3349 47.6131L25.1063 47.5119L25.1062 47.5122L25.3349 47.6131ZM46.4165 44.6097L46.4144 44.8597L46.4197 44.8597L46.4165 44.6097ZM47.9498 44.2005L48.0711 44.419L47.9498 44.2005ZM49.1267 43.1049L48.9243 42.9577L48.9179 42.9675L49.1267 43.1049ZM74.0824 26.2894L74.0237 26.0464L74.0237 26.0464L74.0824 26.2894ZM75.234 25.7494L75.3829 25.9503V25.9503L75.234 25.7494ZM76.0981 24.7949L76.3124 24.9237L76.0981 24.7949ZM75.0563 20.1797L75.1915 19.9694V19.9694L75.0563 20.1797ZM73.8728 19.7194L73.9148 19.473L73.8728 19.7194ZM72.609 19.7625L72.6663 20.0059L72.6677 20.0056L72.609 19.7625ZM43.7063 39.4183L43.5022 39.274L43.498 39.2799L43.4942 39.286L43.7063 39.4183ZM43.1892 41.1121L42.9394 41.1027L43.1892 41.1121ZM43.5776 42.8423L43.7992 42.7266L43.5776 42.8423ZM81.1941 163.417C60.8493 163.417 44.2756 162.044 31.5579 159.322C18.8323 156.598 10.0053 152.53 5.11116 147.172L4.74196 147.509C9.74275 152.984 18.6958 157.08 31.4533 159.811C44.2188 162.543 60.8313 163.917 81.1941 163.917V163.417ZM137.349 157.52C123.611 161.405 104.702 163.417 81.1941 163.417V163.917C104.723 163.917 123.684 161.904 137.485 158.001L137.349 157.52ZM159.598 145.243C155.333 150.36 147.858 154.573 137.35 157.52L137.485 158.001C148.039 155.042 155.625 150.791 159.982 145.563L159.598 145.243ZM162.473 140.675C161.819 142.375 160.845 143.924 159.608 145.231L159.971 145.575C161.254 144.22 162.263 142.615 162.939 140.854L162.473 140.675ZM163.414 135.325C163.446 137.156 163.126 138.974 162.473 140.675L162.939 140.854C163.616 139.093 163.947 137.211 163.914 135.317L163.414 135.325ZM160.397 103.871C161.935 114.296 162.942 124.798 163.414 135.332L163.914 135.31C163.441 124.758 162.432 114.24 160.892 103.798L160.397 103.871ZM144.286 45.1263C151.547 60.1428 156.998 79.8842 160.397 103.869L160.892 103.799C157.489 79.7828 152.027 59.9869 144.736 44.9086L144.286 45.1263ZM103.785 4.82891C115.628 9.47311 132.293 20.2287 144.286 45.1259L144.736 44.9089C132.683 19.8862 115.915 9.04865 103.967 4.36342L103.785 4.82891ZM80.5111 0.613928C88.465 0.351177 96.3862 1.78538 103.781 4.82737L103.971 4.36496C96.5112 1.29616 88.5196 -0.150899 80.4946 0.114201L80.5111 0.613928ZM57.594 5.78433C64.8535 2.59525 72.6263 0.841591 80.5101 0.61396L80.4957 0.114169C72.5472 0.343667 64.711 2.11173 57.3929 5.32655L57.594 5.78433ZM19.7066 44.9306C30.0628 21.5426 45.9621 10.7306 57.5913 5.7855L57.3957 5.32538C45.6699 10.3116 29.6652 21.2056 19.2494 44.7281L19.7066 44.9306ZM3.35511 105.525C5.64556 89.5467 10.3343 66.0609 19.7065 44.9307L19.2494 44.728C9.85033 65.9188 5.1534 89.4563 2.86017 105.454L3.35511 105.525ZM0.592698 135.349C0.964888 125.362 1.88712 115.405 3.35492 105.526L2.86035 105.453C1.38985 115.35 0.465919 125.325 0.0930443 135.331L0.592698 135.349ZM1.65653 141.746C0.879739 139.712 0.517502 137.534 0.592723 135.348L0.0930188 135.331C0.0155122 137.583 0.388723 139.828 1.18944 141.924L1.65653 141.746ZM5.10584 147.166C3.60778 145.625 2.43332 143.779 1.65653 141.746L1.18944 141.924C1.99017 144.021 3.20128 145.924 4.74729 147.514L5.10584 147.166ZM80.3664 6.82916C73.2071 7.09119 66.1572 8.72482 59.5748 11.6469L59.7776 12.1039C66.3021 9.20753 73.2894 7.58851 80.3847 7.32883L80.3664 6.82916ZM80.6256 7.24828V7.079H80.1256V7.24828H80.6256ZM80.9212 6.99828H80.3756V7.49828H80.9212V6.99828ZM101.989 10.779C95.2926 8.02222 88.1153 6.73474 80.9121 6.99845L80.9304 7.49811C88.0618 7.23703 95.168 8.51165 101.798 11.2413L101.989 10.779ZM120.853 22.7519C115.313 17.6187 108.922 13.5622 101.987 10.7781L101.8 11.2422C108.678 14.0032 115.018 18.0265 120.513 23.1186L120.853 22.7519ZM138.953 47.9214C134.529 38.4153 128.386 29.8722 120.855 22.7536L120.511 23.1169C127.996 30.1917 134.102 38.6828 138.5 48.1324L138.953 47.9214ZM157.457 135.66C157.457 135.383 157.001 122.058 154.462 104.504C151.924 86.9516 147.299 65.1446 138.952 47.9179L138.502 48.1359C146.815 65.2927 151.431 87.0387 153.967 104.575C155.235 113.341 155.983 121.05 156.413 126.599C156.628 129.374 156.764 131.609 156.847 133.166C156.888 133.945 156.915 134.554 156.933 134.977C156.941 135.188 156.947 135.352 156.951 135.468C156.953 135.526 156.955 135.571 156.956 135.604C156.956 135.62 156.956 135.633 156.957 135.643C156.957 135.648 156.957 135.652 156.957 135.655C156.957 135.656 156.957 135.657 156.957 135.658C156.957 135.659 156.957 135.659 156.957 135.66H157.457ZM157.457 135.904V135.66H156.957V135.904H157.457ZM154.648 141.599C156.235 140.135 157.235 138.113 157.456 135.929L156.958 135.879C156.75 137.944 155.805 139.852 154.309 141.232L154.648 141.599ZM81.1941 157.202C132.752 157.202 149.349 147.48 154.664 141.583L154.293 141.248C149.131 146.975 132.733 156.702 81.1941 156.702V157.202ZM29.8233 152.586C42.4197 155.64 59.7037 157.202 81.1941 157.202V156.702C59.7214 156.702 42.4822 155.141 29.9411 152.101L29.8233 152.586ZM9.47108 142.9C13.1607 146.945 20.0245 150.195 29.8229 152.586L29.9415 152.101C20.1683 149.715 13.4266 146.494 9.84046 142.563L9.47108 142.9ZM7.30055 139.604C7.79556 140.851 8.53777 141.977 9.47986 142.91L9.83167 142.554C8.93921 141.671 8.23513 140.603 7.76525 139.42L7.30055 139.604ZM6.60471 135.672C6.56859 137.018 6.80555 138.358 7.30055 139.604L7.76525 139.42C7.29535 138.236 7.07021 136.964 7.10453 135.685L6.60471 135.672ZM6.60462 135.547V135.678H7.10462V135.547H6.60462ZM25.1062 47.5122C7.78667 86.7596 6.60462 135.048 6.60462 135.547H7.10462C7.10462 135.067 8.28717 86.8639 25.5636 47.7141L25.1062 47.5122ZM59.5769 11.646C44.3053 18.2575 32.7131 30.3272 25.1063 47.5119L25.5635 47.7143C33.1266 30.6284 44.6346 18.6598 59.7755 12.1048L59.5769 11.646ZM46.4186 44.3597C45.8822 44.3552 45.3562 44.202 44.8955 43.9152L44.6312 44.3397C45.1693 44.6746 45.7851 44.8545 46.4144 44.8597L46.4186 44.3597ZM47.8284 43.9819C47.3925 44.2239 46.9071 44.3534 46.4133 44.3597L46.4197 44.8597C46.9969 44.8522 47.5634 44.7009 48.0711 44.419L47.8284 43.9819ZM48.9179 42.9675C48.6383 43.3921 48.2644 43.7398 47.8284 43.9819L48.0711 44.419C48.5788 44.1372 49.0123 43.7333 49.3355 43.2424L48.9179 42.9675ZM74.0237 26.0464C63.997 28.467 55.1136 34.4536 48.9246 42.9578L49.3288 43.252C55.4496 34.8417 64.2323 28.9246 74.141 26.5324L74.0237 26.0464ZM75.0851 25.5486C74.7659 25.7853 74.4052 25.9543 74.0237 26.0464L74.141 26.5324C74.5884 26.4244 75.0103 26.2265 75.3829 25.9503L75.0851 25.5486ZM75.8838 24.6661C75.6758 25.0122 75.4043 25.3119 75.0851 25.5486L75.3829 25.9503C75.7554 25.6741 76.0711 25.3251 76.3124 24.9237L75.8838 24.6661ZM76.2963 23.5317C76.2321 23.9345 76.0918 24.32 75.8838 24.6661L76.3124 24.9237C76.5536 24.5222 76.7159 24.076 76.7901 23.6104L76.2963 23.5317ZM76.2577 22.3192C76.3474 22.7168 76.3605 23.1288 76.2963 23.5317L76.7901 23.6104C76.8643 23.1448 76.8491 22.6687 76.7454 22.2091L76.2577 22.3192ZM75.7739 21.2157C76.0034 21.5468 76.1679 21.9217 76.2577 22.3192L76.7454 22.2091C76.6416 21.7495 76.4513 21.3152 76.1848 20.9309L75.7739 21.2157ZM74.9211 20.39C75.2546 20.6043 75.5445 20.8848 75.7739 21.2157L76.1848 20.9309C75.9184 20.5465 75.5809 20.2197 75.1915 19.9694L74.9211 20.39ZM73.8308 19.9659C74.2172 20.0317 74.5877 20.1757 74.9211 20.39L75.1915 19.9694C74.802 19.7191 74.3682 19.5503 73.9148 19.473L73.8308 19.9659ZM72.6677 20.0056C73.0492 19.9135 73.4443 19.9 73.8308 19.9659L73.9148 19.473C73.4614 19.3957 72.9977 19.4115 72.5504 19.5195L72.6677 20.0056ZM43.9104 39.5626C50.9035 29.6702 61.1162 22.7257 72.6663 20.0059L72.5517 19.5192C60.8802 22.2676 50.564 29.2842 43.5022 39.274L43.9104 39.5626ZM43.439 41.1215C43.46 40.5623 43.6259 40.0198 43.9184 39.5506L43.4942 39.286C43.155 39.8299 42.9636 40.4573 42.9394 41.1027L43.439 41.1215ZM43.7992 42.7266C43.5426 42.2351 43.418 41.6807 43.439 41.1215L42.9394 41.1027C42.9151 41.7481 43.0588 42.3888 43.356 42.958L43.7992 42.7266ZM44.8955 43.9152C44.4347 43.6283 44.0558 43.2182 43.7992 42.7266L43.356 42.958C43.6532 43.5273 44.0933 44.0047 44.6312 44.3397L44.8955 43.9152Z"
        fill="black"
      />
    </svg>
  );
};

const getImageForForm = (
  type:
    | "patch"
    | "sublingual"
    | "topical lotion or patch"
    | "inhalation method"
    | "edible"
    | "capsule"
    | string,
) => {
  switch (type) {
    case "patch":
      return <icons.CheckIcon className="stroke-[5px]" />;
    case "sublingual":
      return (
        <svg
          width="15px"
          height="20px"
          viewBox="0 0 98 196"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M81.6664 82.1936C76.2634 82.1936 71.8664 77.9385 71.8664 72.7097V69.5484H75.1331C76.9363 69.5484 78.3998 68.1353 78.3998 66.3871V53.7419C78.3998 51.9937 76.9363 50.5806 75.1331 50.5806H71.8664V34.7742C71.8664 33.026 70.403 31.6129 68.5998 31.6129H58.7998V9.48387C58.7998 4.2551 54.4028 0 48.9998 0C43.5967 0 39.1998 4.2551 39.1998 9.48387V31.6129H29.3998C27.5966 31.6129 26.1331 33.026 26.1331 34.7742V50.5806H22.8664C21.0632 50.5806 19.5998 51.9937 19.5998 53.7419V66.3871C19.5998 68.1353 21.0632 69.5484 22.8664 69.5484H26.1331V72.7097C26.1331 77.9385 21.7362 82.1936 16.3331 82.1936C7.32689 82.1936 -0.000244141 89.2843 -0.000244141 98V177.032C-0.000244141 187.493 8.79036 196 19.5998 196H78.3998C89.2092 196 97.9998 187.493 97.9998 177.032V98C97.9998 89.2843 90.6726 82.1936 81.6664 82.1936ZM45.7331 9.48387C45.7331 7.73884 47.1998 6.32258 48.9998 6.32258C50.7997 6.32258 52.2664 7.73884 52.2664 9.48387V31.6129H45.7331V9.48387ZM32.6664 37.9355H65.3331V50.5806H32.6664V37.9355ZM26.1331 56.9032H29.3998H68.5998H71.8664V63.2258H26.1331V56.9032ZM91.4664 177.032C91.4664 184.006 85.606 189.677 78.3998 189.677H19.5998C12.3935 189.677 6.53309 184.006 6.53309 177.032V98C6.53309 92.7712 10.93 88.5161 16.3331 88.5161C25.3393 88.5161 32.6664 81.4254 32.6664 72.7097V69.5484H65.3331V72.7097C65.3331 81.4254 72.6602 88.5161 81.6664 88.5161C87.0695 88.5161 91.4664 92.7712 91.4664 98V177.032Z"
            fill="black"
          />
        </svg>
      );
    case "topical lotion or patch":
      return (
        <svg
          width="130"
          height="164"
          viewBox="0 0 130 164"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M114.249 57.1081C127.383 72.9966 132.256 93.7575 127.595 114.095C122.935 133.585 110.012 149.473 92.4289 157.735C83.7432 161.76 74.6339 163.667 65.1008 163.667C55.5677 163.667 46.2465 161.548 37.7726 157.735C19.7657 149.473 6.84314 133.585 2.39437 114.095C-2.26624 93.9693 2.60621 72.9966 15.7407 57.1081L60.652 2.23999C62.7705 -0.302164 67.0074 -0.302164 68.914 2.23999L114.249 57.1081ZM64.8889 152.863C72.9391 152.863 80.5655 151.168 87.7683 147.99C102.598 141.211 113.402 127.865 117.215 111.553C121.24 94.6049 117.003 77.0217 105.987 63.6754L64.8889 13.8915L23.7908 63.6754C12.7748 77.0217 8.5379 94.6049 12.563 111.553C16.3762 127.865 27.1804 141.211 42.0096 147.99C49.2123 151.168 56.8388 152.863 64.8889 152.863ZM97.7159 99.9199C97.7159 96.9541 100.046 94.6238 103.012 94.6238C105.978 94.6238 108.308 97.1659 108.308 99.9199C108.308 121.105 91.1487 138.264 69.9641 138.264C66.9982 138.264 64.6679 135.934 64.6679 132.968C64.6679 130.002 66.9982 127.672 69.9641 127.672C85.217 127.672 97.7159 115.173 97.7159 99.9199Z"
            fill="black"
          />
        </svg>
      );
    case "inhalation method":
      return (
        <svg
          width="15"
          height="30"
          viewBox="0 0 98 196"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M81.6664 82.1936C76.2634 82.1936 71.8664 77.9385 71.8664 72.7097V69.5484H75.1331C76.9363 69.5484 78.3998 68.1353 78.3998 66.3871V53.7419C78.3998 51.9937 76.9363 50.5806 75.1331 50.5806H71.8664V34.7742C71.8664 33.026 70.403 31.6129 68.5998 31.6129H58.7998V9.48387C58.7998 4.2551 54.4028 0 48.9998 0C43.5967 0 39.1998 4.2551 39.1998 9.48387V31.6129H29.3998C27.5966 31.6129 26.1331 33.026 26.1331 34.7742V50.5806H22.8664C21.0632 50.5806 19.5998 51.9937 19.5998 53.7419V66.3871C19.5998 68.1353 21.0632 69.5484 22.8664 69.5484H26.1331V72.7097C26.1331 77.9385 21.7362 82.1936 16.3331 82.1936C7.32689 82.1936 -0.000244141 89.2843 -0.000244141 98V177.032C-0.000244141 187.493 8.79036 196 19.5998 196H78.3998C89.2092 196 97.9998 187.493 97.9998 177.032V98C97.9998 89.2843 90.6726 82.1936 81.6664 82.1936ZM45.7331 9.48387C45.7331 7.73884 47.1998 6.32258 48.9998 6.32258C50.7997 6.32258 52.2664 7.73884 52.2664 9.48387V31.6129H45.7331V9.48387ZM32.6664 37.9355H65.3331V50.5806H32.6664V37.9355ZM26.1331 56.9032H29.3998H68.5998H71.8664V63.2258H26.1331V56.9032ZM91.4664 177.032C91.4664 184.006 85.606 189.677 78.3998 189.677H19.5998C12.3935 189.677 6.53309 184.006 6.53309 177.032V98C6.53309 92.7712 10.93 88.5161 16.3331 88.5161C25.3393 88.5161 32.6664 81.4254 32.6664 72.7097V69.5484H65.3331V72.7097C65.3331 81.4254 72.6602 88.5161 81.6664 88.5161C87.0695 88.5161 91.4664 92.7712 91.4664 98V177.032Z"
            fill="black"
          />
        </svg>
      );
    case "edible":
      return <Edible />;
    case "capsule":
      return <Edible />;
    default:
      return <icons.CheckIcon className="stroke-[5px]" />;
  }
};

export const PrePlanV2 = () => {
  const [searchParams] = useSearchParams();

  const submissionId = searchParams.get("submission_id");
  const union = searchParams.get("union");
  // when have time connect to backend
  const { getSubmissionById } = useElixirApi();
  const { data } = useQuery({
    queryFn: async () => getSubmissionById(submissionId as string),
    queryKey: ["getSubmission", submissionId],
    enabled: !!submissionId,
  });

  const values = data?.data.values;

  console.log(values?.workday_allow_intoxication_nonworkday_allow_intoxi);
  const useInWorkdayTime = () => {
    return (
      values?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.WorkDayEvenings,
      ) ||
      values?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.WorkDayMornings,
      ) ||
      values?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.WorkDayAfternoons,
      ) ||
      values?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.WorkDayBedtimes,
      )
    );
  };

  const useInNonWorkDayTime = () => {
    return (
      values?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.NonWorkDayEvenings,
      ) ||
      values?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.NonWorkDayMornings,
      ) ||
      values?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.NonWorkDayAfternoons,
      ) ||
      values?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.NonWorkDayBedtimes,
      )
    );
  };

  const { nonWorkdayPlan, workdayPlan, whyRecommended } = usePrePlan(
    !values
      ? {
          avoidPresentation: [],
          currentlyUsingCannabisProducts: false,
          openToUseThcProducts: [],
          reasonToUse: [],
          symptomsWorseTimes: [],
          thcTypePreferences: ThcProductPreferencesEnum.notSure,
        }
      : {
          avoidPresentation: values.areThere,
          currentlyUsingCannabisProducts:
            values.usingCannabisProducts === "Yes",
          openToUseThcProducts:
            values.workday_allow_intoxication_nonworkday_allow_intoxi,
          reasonToUse: values.whatBrings,
          symptomsWorseTimes: values.symptoms_worse_times,
          thcTypePreferences: values.thc_type_preferences,
        },
  );

  const workDayData = [
    {
      title: "IN THE MORNINGS",
      label: workdayPlan.dayTime.result,
      description: "",
      form: workdayPlan.dayTime.form,
      type: workdayPlan.dayTime.type,
    },
    {
      title: "IN THE EVENING",
      label: workdayPlan.evening.result,
      description: "",
      form: workdayPlan.evening.form,
      type: workdayPlan.evening.type,
    },
    {
      title: "AT BEDTIME",
      label: workdayPlan.bedTime.result,
      description: "",
      form: workdayPlan.bedTime.form,
      type: workdayPlan.bedTime.type,
    },
  ];

  const nonWorkdayData = [
    {
      title: "IN THE MORNINGS",
      label: nonWorkdayPlan.dayTime.result,
      description: "",
      form: nonWorkdayPlan.dayTime.form,
      type: nonWorkdayPlan.dayTime.type,
    },
    {
      title: "IN THE EVENING",
      label: nonWorkdayPlan.evening.result,
      description: "",
      form: nonWorkdayPlan.evening.form,
      type: nonWorkdayPlan.evening.type,
    },
    {
      title: "AT BEDTIME",
      label: nonWorkdayPlan.bedTime.result,
      description: "",
      form: nonWorkdayPlan.bedTime.form,
      type: nonWorkdayPlan.bedTime.type,
    },
  ];

  return (
    <LayoutDefault>
      <div className="flex  flex-col items-center gap-0 px-2 md:gap-20">
        <div className="w-full max-w-[1211px] lg:w-3/5">
          <header>
            <Typography
              variant="large"
              font="bold"
              className="my-10 font-nobel"
            >
              Initial Recommendations:
            </Typography>
          </header>
          <section className="flex flex-col items-center justify-center gap-10 bg-cream-200 px-0 py-7 md:px-10 lg:flex-row">
            <article className="flex flex-row items-center justify-center gap-4">
              <div className="h-14 w-14 rounded-full bg-cream-300 p-3">
                <icons.CheckIcon className="stroke-[5px]" />
              </div>
              <div className="flex w-full flex-col md:w-[316px]">
                <Typography variant="large" font="bold" className="font-nobel">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  What's included:
                </Typography>
                <Typography variant="base" className="underline">
                  Product types/forms.
                </Typography>
                <Typography variant="base" className="underline">
                  Starting doses.
                </Typography>
                <Typography variant="base" className="underline">
                  Times of uses.
                </Typography>
                <Button
                  variant="white"
                  right={<icons.ArrowRightIcon />}
                  className="mt-6"
                  onClick={() => {
                    window.location.href = `/${union}/account?submission_id=${submissionId}&union=${union}`;
                  }}
                >
                  Save Recommendations
                </Button>
              </div>
            </article>
            <article className="flex-wor flex items-center justify-center gap-4">
              <div>
                <div className="h-14 w-14 rounded-full bg-cream-300 p-2">
                  <icons.XMarkIcon className="stroke-[3px]" />
                </div>
              </div>
              <div className="flex w-[316px] flex-col">
                <Typography
                  variant="large"
                  font="bold"
                  className="whitespace-nowrap font-nobel"
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  What's not included:
                </Typography>
                <Typography variant="base" className="underline">
                  Local dispensary inventory match.
                </Typography>
                <Typography variant="base" className="underline">
                  Clinician review & approval.
                </Typography>
                <Typography variant="base" className="underline">
                  Ongoing feedback & optimization.
                </Typography>
                <Button
                  variant="white"
                  right={<icons.ArrowRightIcon />}
                  className="mt-6"
                  onClick={() => {
                    window.location.href = `/${union}/account?submission_id=${submissionId}&union=${union}`;
                  }}
                >
                  Continue & Get Care Plan
                </Button>
              </div>
            </article>
          </section>
          {useInWorkdayTime() && (
            <section>
              <header>
                <Typography
                  variant="large"
                  font="bold"
                  className="mb-8 mt-4 font-nobel"
                >
                  On Workdays
                </Typography>
              </header>
              <main className="flex flex-col gap-14">
                {workDayData.map(({ title, label, description, type, form }) =>
                  type ? (
                    <article
                      className="gap-4 divide-y divide-gray-300"
                      key={title}
                    >
                      <Typography className="text-gray-300">{title}</Typography>
                      <div className="flex flex-col items-center gap-4 pt-4 md:flex-row">
                        <div className="w-14">
                          <div className="flex h-10 w-10 flex-row items-center justify-center rounded-full bg-cream-300 p-2">
                            {getImageForForm(form)}
                          </div>
                        </div>
                        <div>
                          <Typography font="semiBold" className="font-nobel">
                            {label}
                          </Typography>
                          <Typography className="hidden md:block">
                            {description}
                          </Typography>
                        </div>
                      </div>
                    </article>
                  ) : (
                    <></>
                  ),
                )}
              </main>
            </section>
          )}

          {useInNonWorkDayTime() && (
            <section>
              <Typography
                variant="large"
                font="bold"
                className="mb-8 mt-12 font-nobel"
              >
                On Non- Workdays
              </Typography>
              <main className="flex flex-col gap-14">
                {nonWorkdayData.map(
                  ({ title, label, description, type, form }) =>
                    type ? (
                      <article
                        className="gap-4 divide-y divide-gray-300"
                        key={title}
                      >
                        <Typography className="text-gray-300">
                          {title}
                        </Typography>
                        <div className="flex flex-col items-center gap-4 pt-4 md:flex-row">
                          <div className="w-14">
                            <div className="flex h-10 w-10 flex-row items-center justify-center rounded-full bg-cream-300 p-2">
                              {getImageForForm(form)}
                            </div>
                          </div>
                          <div>
                            <Typography font="semiBold" className="font-nobel">
                              {label}
                            </Typography>
                            <Typography className="hidden md:block">
                              {description}
                            </Typography>
                          </div>
                        </div>
                      </article>
                    ) : (
                      <></>
                    ),
                )}
              </main>
            </section>
          )}

          <section>
            <header>
              <Typography
                variant="large"
                font="bold"
                className="mb-8 mt-12 font-nobel"
              >
                Why recommended
              </Typography>
              <Typography className="mb-8 mt-12">{whyRecommended}</Typography>
            </header>
          </section>
          <footer>
            <Typography className="mb-8 mt-12">
              These recommendations were created using our proprietary data
              model which leverages the latest cannabis research and the wisdom
              of over 18,000 patient interactions. Note that these
              recommendations should be informed by a more complete
              understanding of your current symptoms, specific diagnoses,
              medications, or medical history, and have not been reviewed or
              approved by an eo clinician. To most responsibly define and
              maintain an optimal cannabis regimen,
              <a href={ROUTES.register} className="underline">
                get your eo care plan now.
              </a>
            </Typography>
          </footer>
        </div>
      </div>
    </LayoutDefault>
  );
};
