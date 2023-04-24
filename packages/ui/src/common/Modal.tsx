import { Fragment, type PropsWithChildren, type RefObject } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { tw } from "@eo/shared";

import { Overlay } from "./Overlay";

export const Modal = ({
  isOpen,
  onClose,
  initialFocus,
  className,
  children,
}: PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  initialFocus?: RefObject<HTMLButtonElement>;
  className?: string;
}>) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={initialFocus}
        onClose={onClose}
      >
        <Overlay />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
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
                  "transition-all sm:my-8 sm:w-full sm:max-w-lg",
                  className,
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
