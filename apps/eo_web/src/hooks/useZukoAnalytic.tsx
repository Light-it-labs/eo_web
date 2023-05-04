import { useEffect } from "react";

export const useZukoAnalytic = (zukoSlugId: string) => {
  const triggerCompletionEvent = () => {
    const implementScript = document.createElement("script");
    implementScript.type = "text/javascript";
    implementScript.textContent = `Zuko.trackForm({slug:'${zukoSlugId}'}).trackEvent(Zuko.COMPLETION_EVENT);`;
    setTimeout(() => {
      document.body.appendChild(implementScript);
    }, 2000);

    return () => {
      setTimeout(() => {
        document.body.removeChild(implementScript);
      }, 2000);
    };
  };

  const triggerViewEvent = () => {
    const implementScript = document.createElement("script");
    implementScript.type = "text/javascript";
    implementScript.textContent = `Zuko.trackForm({target:document.body,slug:"${zukoSlugId}"}).trackEvent(Zuko.FORM_VIEW_EVENT);`;
    setTimeout(() => {
      document.body.appendChild(implementScript);
    }, 2000);

    return () => {
      setTimeout(() => {
        document.body.removeChild(implementScript);
      }, 2000);
    };
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://assets.zuko.io/js/v2/client.min.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return {
    triggerCompletionEvent,
    triggerViewEvent,
  };
};
