import { useEffect } from "react";

import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";

const PROFILE_TWO_ID = window.data.PROFILE_TWO_ID || 231015554139147;
export const ProfilingTwo = () => {
  useEffect(() => {
    jotformScript(PROFILE_TWO_ID);
  });
  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        <iframe
          id={`JotFormIFrame-${PROFILE_TWO_ID}`}
          title="Clone of Profiling 1"
          onLoad={() => window.parent.scrollTo(0, 0)}
          allowTransparency={true}
          allowFullScreen={true}
          allow="geolocation; microphone; camera"
          src={`https://form.jotform.com/${PROFILE_TWO_ID}`}
          className="h-full w-full"
        ></iframe>
      </div>
    </LayoutDefault>
  );
};
