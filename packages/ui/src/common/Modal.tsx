import { Fragment, type PropsWithChildren, type RefObject } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { tw } from "@eo/shared";

import { icons } from "./Icons";
import { Overlay } from "./Overlay";


export const Modal = ({
  isOpen,
  onClose,
  initialFocus,
  className,
  children,
  onPressX,
  controller,
}: PropsWithChildren<{
  isOpen: boolean;
  onClose?: () => void;
  initialFocus?: RefObject<HTMLButtonElement>;
  className?: string;
  onPressX?: () => void;
  controller: (val: boolean) => void;
}>) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={initialFocus}
        onClose={() => (onClose ? onClose() : null)}
      >
        <Overlay />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:scale-95"
            >
              <Dialog.Panel
                className={tw(
                  "relative flex h-auto w-auto flex-row transition-all md:min-h-[176px] md:max-w-[780px]",
                  className,
                )}
              >
                <icons.XMarkIcon
                  className="strike-20 right-0 m-4 h-10 w-10"
                  style={{
                    position: "absolute",
                  }}
                  onClick={() => {
                    onPressX ? onPressX() : null;
                    controller(false);
                  }}
                />
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
