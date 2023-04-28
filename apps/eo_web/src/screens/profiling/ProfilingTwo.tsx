import { useEffect } from "react";

import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";

export const ProfilingTwo = () => {
  useEffect(() => {
    jotformScript();
  });
  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        <iframe
          id="JotFormIFrame-231015554139147"
          title="Clone of Profiling 1"
          onLoad={() => window.parent.scrollTo(0, 0)}
          allowTransparency={true}
          allowFullScreen={true}
          allow="geolocation; microphone; camera"
          src="https://form.jotform.com/231015554139147"
          className="h-full w-full"
        ></iframe>
      </div>
    </LayoutDefault>
  );
};
