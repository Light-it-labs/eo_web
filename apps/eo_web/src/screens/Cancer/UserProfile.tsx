import { useEffect } from "react";

import { CANCER_USER_PROFILE } from "~/configs/env";
import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";





export const UserProfile = () => {
  useEffect(() => {
    jotformScript(CANCER_USER_PROFILE);
  }, []);
  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        <iframe
          id={`JotFormIFrame-${CANCER_USER_PROFILE}`}
          title=""
          onLoad={() => window.parent.scrollTo(0, 0)}
          allow="geolocation; microphone; camera"
          allowTransparency={true}
          allowFullScreen={true}
          src={`https://form.jotform.com/${CANCER_USER_PROFILE}`}
          className="h-full w-full"
          style={{
            minWidth: "100%",
            height: "539px",
            border: "none",
          }}
        ></iframe>
      </div>
    </LayoutDefault>
  );
};
