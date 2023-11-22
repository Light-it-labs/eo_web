import { type ComponentPropsWithoutRef } from "react";
import * as heroIcons from "@heroicons/react/24/outline";

import { tw } from "@eo/shared";





export type SVGProps = ComponentPropsWithoutRef<"svg">;

export const icons = {
  ...heroIcons,
  SpinnerIcon: ({ className, ...props }: SVGProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="arrow-alt-circle-up"
      role="img"
      className={tw(
        "h-32 w-32 flex-shrink-0 animate-spin stroke-current",
        className,
      )}
      {...props}
    >
      <path
        fill="currentColor"
        d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"
      />
    </svg>
  ),
  ProfileIcon: ({ className, ...props }: SVGProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      className={tw("h-32 w-32", className)}
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.49993 0.833374C6.75102 0.833374 5.33326 2.25114 5.33326 4.00004C5.33326 5.74894 6.75102 7.16671 8.49993 7.16671C10.2488 7.16671 11.6666 5.74894 11.6666 4.00004C11.6666 2.25114 10.2488 0.833374 8.49993 0.833374ZM6.33326 4.00004C6.33326 2.80342 7.30331 1.83337 8.49993 1.83337C9.69654 1.83337 10.6666 2.80342 10.6666 4.00004C10.6666 5.19666 9.69654 6.16671 8.49993 6.16671C7.30331 6.16671 6.33326 5.19666 6.33326 4.00004Z"
        fill="#535A63"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.49993 8.16671C6.95756 8.16671 5.53654 8.5173 4.48356 9.1096C3.44625 9.69309 2.66659 10.5774 2.66659 11.6667L2.66655 11.7347C2.6658 12.5092 2.66485 13.4814 3.51753 14.1757C3.93718 14.5175 4.52424 14.7605 5.3174 14.921C6.11277 15.082 7.14941 15.1667 8.49993 15.1667C9.85044 15.1667 10.8871 15.082 11.6825 14.921C12.4756 14.7605 13.0627 14.5175 13.4823 14.1757C14.335 13.4814 14.3341 12.5092 14.3333 11.7347L14.3333 11.6667C14.3333 10.5774 13.5536 9.69309 12.5163 9.1096C11.4633 8.5173 10.0423 8.16671 8.49993 8.16671ZM3.66659 11.6667C3.66659 11.0991 4.08085 10.4835 4.97382 9.98117C5.85112 9.48769 7.09678 9.16671 8.49993 9.16671C9.90308 9.16671 11.1487 9.48769 12.026 9.98117C12.919 10.4835 13.3333 11.0991 13.3333 11.6667C13.3333 12.5386 13.3064 13.0294 12.8509 13.4003C12.6038 13.6015 12.1909 13.7978 11.4841 13.9409C10.7794 14.0835 9.81608 14.1667 8.49993 14.1667C7.18378 14.1667 6.22042 14.0835 5.51579 13.9409C4.80894 13.7978 4.39601 13.6015 4.14899 13.4003C3.69347 13.0294 3.66659 12.5386 3.66659 11.6667Z"
        fill="#535A63"
      />
    </svg>
  ),
  LockIcon: ({ className, ...props }: SVGProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      className={tw("h-32 w-32", className)}
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.00016 6.20189V5.33337C4.00016 2.84809 6.01488 0.833374 8.50016 0.833374C10.9854 0.833374 13.0002 2.84809 13.0002 5.33337V6.20189C13.1514 6.21252 13.2939 6.22636 13.428 6.24439C14.0281 6.32507 14.5333 6.49766 14.9346 6.89894C15.3359 7.30022 15.5085 7.80547 15.5891 8.40554C15.6669 8.98352 15.6668 9.7184 15.6668 10.6301V10.7033C15.6668 11.615 15.6669 12.3499 15.5891 12.9279C15.5085 13.5279 15.3359 14.0332 14.9346 14.4345C14.5333 14.8358 14.0281 15.0083 13.428 15.089C12.85 15.1667 12.1151 15.1667 11.2034 15.1667H5.79692C4.88519 15.1667 4.15031 15.1667 3.57233 15.089C2.97226 15.0083 2.46701 14.8358 2.06573 14.4345C1.66445 14.0332 1.49186 13.5279 1.41118 12.9279C1.33347 12.3499 1.33348 11.615 1.3335 10.7033V10.6301C1.33348 9.7184 1.33347 8.98352 1.41118 8.40554C1.49186 7.80547 1.66445 7.30022 2.06573 6.89894C2.46701 6.49766 2.97226 6.32507 3.57233 6.24439C3.70641 6.22636 3.84894 6.21252 4.00016 6.20189ZM5.00016 5.33337C5.00016 3.40038 6.56717 1.83337 8.50016 1.83337C10.4332 1.83337 12.0002 3.40038 12.0002 5.33337V6.169C11.7511 6.1667 11.4858 6.1667 11.2034 6.16671H5.79691C5.51457 6.1667 5.24918 6.1667 5.00016 6.169V5.33337ZM2.77284 7.60605C2.95735 7.42154 3.21639 7.30124 3.70558 7.23547C4.20914 7.16777 4.87655 7.16671 5.8335 7.16671H11.1668C12.1238 7.16671 12.7912 7.16777 13.2948 7.23547C13.7839 7.30124 14.043 7.42154 14.2275 7.60605C14.412 7.79056 14.5323 8.0496 14.5981 8.53879C14.6658 9.04235 14.6668 9.70976 14.6668 10.6667C14.6668 11.6237 14.6658 12.2911 14.5981 12.7946C14.5323 13.2838 14.412 13.5429 14.2275 13.7274C14.043 13.9119 13.7839 14.0322 13.2948 14.0979C12.7912 14.1656 12.1238 14.1667 11.1668 14.1667H5.8335C4.87655 14.1667 4.20914 14.1656 3.70558 14.0979C3.21639 14.0322 2.95735 13.9119 2.77284 13.7274C2.58833 13.5429 2.46803 13.2838 2.40226 12.7946C2.33456 12.2911 2.3335 11.6237 2.3335 10.6667C2.3335 9.70976 2.33456 9.04235 2.40226 8.53879C2.46803 8.0496 2.58833 7.79056 2.77284 7.60605Z"
      />
    </svg>
  ),
  ClosedEye: ({ className, ...props }: SVGProps) => (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={tw("h-32 w-32", className)}
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.3637 4.20706C15.6176 4.31584 15.7351 4.60978 15.6264 4.86359L15.1668 4.66663C15.6264 4.86359 15.6264 4.86347 15.6264 4.86359L15.6259 4.86471L15.6252 4.86637L15.623 4.87127L15.6159 4.88733C15.6099 4.90075 15.6014 4.91956 15.5903 4.94335C15.5681 4.99092 15.5357 5.05846 15.4927 5.14274C15.4068 5.31117 15.2785 5.54709 15.1058 5.82428C14.8221 6.27963 14.4151 6.85174 13.8748 7.42008L14.5203 8.06564C14.7156 8.2609 14.7156 8.57748 14.5203 8.77274C14.3251 8.96801 14.0085 8.96801 13.8132 8.77274L13.1462 8.10569C12.7064 8.47415 12.202 8.81999 11.6302 9.10412L12.2525 10.0606C12.4031 10.2921 12.3376 10.6018 12.1061 10.7524C11.8747 10.903 11.565 10.8375 11.4144 10.606L10.6882 9.49006C10.1687 9.65974 9.60615 9.77504 9.00011 9.81638V11C9.00011 11.2761 8.77625 11.5 8.50011 11.5C8.22397 11.5 8.00011 11.2761 8.00011 11V9.81638C7.41276 9.77632 6.86623 9.66677 6.36004 9.50557L5.644 10.606C5.49339 10.8375 5.18367 10.903 4.95221 10.7524C4.72075 10.6018 4.65521 10.2921 4.80581 10.0607L5.41409 9.12581C4.83783 8.8444 4.32937 8.50008 3.88578 8.13214L3.24512 8.77279C3.04986 8.96805 2.73328 8.96805 2.53802 8.77279C2.34276 8.57753 2.34276 8.26095 2.53802 8.06568L3.15386 7.44984C2.60415 6.87671 2.19033 6.29767 1.90201 5.83641C1.72673 5.55599 1.59656 5.31706 1.50942 5.14643C1.46582 5.06105 1.4329 4.9926 1.41041 4.94439C1.39916 4.92028 1.39052 4.90122 1.38444 4.88762L1.37724 4.87136L1.37508 4.8664L1.37436 4.86472L1.37409 4.86409C1.37404 4.86397 1.37387 4.86359 1.83345 4.66663L1.37409 4.86409C1.26531 4.61027 1.38267 4.31584 1.63649 4.20706C1.89009 4.09837 2.18376 4.21566 2.29275 4.46905C2.29271 4.46896 2.29279 4.46913 2.29275 4.46905L2.29339 4.47051L2.29743 4.47965C2.30137 4.48845 2.30776 4.50257 2.31665 4.52162C2.33442 4.55972 2.36214 4.61747 2.4 4.69161C2.4758 4.84003 2.59191 5.05348 2.74998 5.30637C3.06705 5.81362 3.54788 6.47136 4.2039 7.08103C4.78117 7.6175 5.48856 8.11167 6.33459 8.43717C6.97092 8.68199 7.69041 8.8333 8.50011 8.8333C9.32792 8.8333 10.0615 8.67514 10.7084 8.42051C11.5494 8.08952 12.2519 7.59213 12.8246 7.05463C13.471 6.44794 13.9447 5.79674 14.2571 5.29543C14.4128 5.0455 14.5272 4.83481 14.6019 4.68841C14.6392 4.61527 14.6665 4.55834 14.684 4.5208C14.6927 4.50203 14.699 4.48812 14.7029 4.47946L14.7069 4.47047L14.7072 4.46967C14.7072 4.46974 14.7072 4.46961 14.7072 4.46967M15.3637 4.20706C15.11 4.09831 14.8161 4.21599 14.7072 4.46967L15.3637 4.20706ZM2.29275 4.46905C2.29271 4.46896 2.29279 4.46913 2.29275 4.46905V4.46905Z"
      />
    </svg>
  ),
};

export const IconWrapper = ({
  size = "md",
  className,
  style,
  children,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => (
  <div
    className={tw(
      "flex flex-row items-center",
      size === "sm" && "h-5 w-5",
      size === "md" && "h-6 w-6",
      size === "lg" && "h-10 w-10",
      className,
    )}
    style={style}
  >
    {children}
  </div>
);
