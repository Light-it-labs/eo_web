import { useEffect, useRef, useState } from "react";

import { jotformScript } from "~/helpers/jotform_script";
import { useMount } from "~/hooks/useMount";

interface JotformFrameProps {
  formId: string | number;
  searchParam?: URLSearchParams;
}

const Iframe = ({ formId, searchParam }: JotformFrameProps) => {
  const ref = useRef<HTMLIFrameElement>(null);
  useMount(() => {
    setTimeout(() => {
      jotformScript(formId);
    }, 400);
    setTimeout(() => {
      if (ref?.current) {
        ref.current.style.opacity = "100";
      }
    }, 3500);
  }, [formId, searchParam]);

  return (
    <iframe
      ref={ref}
      src={`https://form.jotform.com/${formId}?${searchParam ? searchParam.toString().replace("+", "%20") : ""
        }`}
      id={`JotFormIFrame-${formId}`}
      title=""
      onLoad={() => {
        window.parent.scrollTo(0, 0);
      }}
      allow="geolocation; microphone; camera"
      allowFullScreen={true}
      className="h-full w-full min-w-full border-none opacity-0"
    ></iframe>
  );
};

const Loading = () => {
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
    }, 3000);
  });

  return (
    <>
      {showLoading && (
        <div
          className="right-[calc(50%-20px)] top-1/2 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-1000"
          style={{
            position: "absolute",
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
