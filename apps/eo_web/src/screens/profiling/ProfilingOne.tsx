import { useEffect } from "react";

import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";

const PROFILE_ONE_ID = window.data.PROFILE_ONE_ID || 231014818128147;

export const ProfilingOne = () => {
  useEffect(() => {
    jotformScript(PROFILE_ONE_ID);
  });
  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        <iframe
          id={`JotFormIFrame-${PROFILE_ONE_ID}`}
          title="Clone of Profiling 1"
          onLoad={() => window.parent.scrollTo(0, 0)}
          allowTransparency={true}
          allowFullScreen={true}
          allow="geolocation; microphone; camera"
          src={`https://form.jotform.com/${PROFILE_ONE_ID}?isuser=Yes`}
          className="h-full w-full"
        ></iframe>
      </div>
    </LayoutDefault>
  );
};
