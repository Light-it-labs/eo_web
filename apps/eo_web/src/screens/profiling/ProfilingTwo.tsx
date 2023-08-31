import { useEffect } from "react";

import { PROFILE_TWO_ID } from "~/configs/env";
import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";





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
