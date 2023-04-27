import { useEffect } from "react";
import { jotformScript } from "~/helpers/jotform_script";
export const Profiling1 = () => {
  useEffect(() => {
    jotformScript();
  })
  return (
    <div className="h-screen flex flex-col">
      <div className="h-20 w-full bg-red-400">This would be the banner</div>

      <iframe
        id="JotFormIFrame-231014818128147"
        title="Clone of Profiling 1"
        onLoad={() => window.parent.scrollTo(0, 0)}
        allowTransparency={true}
        allowFullScreen={true}
        allow="geolocation; microphone; camera"
        src="https://form.jotform.com/231014818128147"
        className="w-full h-full"
      >
      </iframe>
    </div >
  );
};
