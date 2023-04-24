import { forwardRef, type HTMLProps } from "react";
import { useDropzone } from "react-dropzone";

import { tw } from "@eo/shared";

import UploadFileSvg from "../assets/UploadFile.svg";
import { Loading } from "../common/Loading";
import { Message, type FormErrorType } from "./Message";

interface DropzoneProps extends Omit<HTMLProps<HTMLInputElement>, "onDrop"> {
  onDrop?: (file: File[]) => void;
  loading?: boolean;
  containerClassName?: string;
  message?: string;
  compact?: boolean;
  error?: FormErrorType;
}

export const Dropzone = forwardRef<HTMLInputElement, DropzoneProps>(
  (
    {
      onDrop,
      children,
      loading,
      containerClassName,
      compact,
      error,
      message,
      ...props
    },
    ref,
  ) => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles: File[]) => {
        void onDrop?.(acceptedFiles);
      },
    });

    return (
      <div>
        <div
          {...getRootProps({
            className: tw(
              `dropzone text-center border focus-none border-gray-300 rounded border-dashed flex justify-center items-center w-fit py-20 px-20
             ${loading ? "pointer-events-none bg-gray-200" : ""}`,
              containerClassName,
            ),
          })}
        >
          <input
            ref={ref}
            {...getInputProps()}
            className="w-full"
            {...props}
            disabled={loading}
          />
          {children || (
            <div className="flex flex-col justify-center items-center">
              <img
                src={UploadFileSvg}
                className="h-12 w-12 text-gray-300"
                alt="Upload Icon"
              ></img>
              <div className="mt-4 flex flex-col text-sm leading-6 text-neutrals-medium-400">
                <div className="flex">
                  <span className="relative cursor-pointer rounded-md bg-white font-semibold text-neutrals-medium-400">
                    Click to upload
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <div className="text-xs leading-5 text-neutrals-medium-400">
                  PNG, JPG or GIF image.
                </div>
              </div>
            </div>
          )}
          {loading && <Loading />}
        </div>
        {!compact && <Message message={message} error={error} />}
      </div>
    );
  },
);

Dropzone.displayName = "Dropzone";
