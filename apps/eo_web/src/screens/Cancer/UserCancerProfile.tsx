import { useEffect } from "react";

import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";





const CANCER_USER_PROFILE = window.data.CANCER_USER_DATA || 232256418562659;
export const UserCancerProfile = () => {
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
