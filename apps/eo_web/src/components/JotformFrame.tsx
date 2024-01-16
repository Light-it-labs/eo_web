import { useEffect, useRef, useState } from "react";

import { jotformScript } from "~/helpers/jotform_script";
// import { forwardRef } from "@eo/shared";
import { useMount } from "~/hooks/useMount";

interface JotformFrameProps {
  formId: string | number;
  searchParam?: URLSearchParams;
}

const Iframe = ({ formId, searchParam }: JotformFrameProps) => {
  const ref = useRef<HTMLIFrameElement>(null);
  useMount(() => {
    jotformScript(formId);
    setTimeout(() => {
      if (ref?.current?.hidden) ref.current.hidden = false;
    }, 1700);
  }, [formId, searchParam]);

  return (
    <iframe
      ref={ref}
      src={`https://form.jotform.com/${formId}?${
        searchParam ? searchParam.toString() : ""
      }`}
      id={`JotFormIFrame-${formId}`}
      title=""
      onLoad={() => {
        window.parent.scrollTo(0, 0);
      }}
      allow="geolocation; microphone; camera"
      allowFullScreen={true}
      className="h-full w-full"
      style={{
        minWidth: "100%",
        height: "539px",
        border: "none",
      }}
      hidden
    ></iframe>
  );
};

const Loading = () => {
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
    }, 1200);
  });

  return (
    <>
      {showLoading && (
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-1000"
          style={{
            position: "absolute",
            top: "50%",
            right: "calc(50% - 20px)",
          }}
        />
      )}
    </>
  );
};

export const JotformFrame = ({ formId, searchParam }: JotformFrameProps) => {
  return (
    <>
      <Loading />
      <Iframe formId={formId} searchParam={searchParam} />
    </>
  );
};
