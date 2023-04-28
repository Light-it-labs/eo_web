import { useEffect } from "react";

import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";

export const ProfilingOne = () => {
  useEffect(() => {
    jotformScript();
  });
  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        <iframe
          id="JotFormIFrame-231014818128147"
          title="Clone of Profiling 1"
          onLoad={() => window.parent.scrollTo(0, 0)}
          allowTransparency={true}
          allowFullScreen={true}
          allow="geolocation; microphone; camera"
          src="https://form.jotform.com/231014818128147?isuser=Yes"
          className="h-full w-full"
        ></iframe>
      </div>
    </LayoutDefault>
  );
};
