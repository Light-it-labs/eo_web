import { useEffect, useState } from "react";

export const useWindowHeight = (onChange: (height: number) => void) => {
  const [height, setHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0,
  );

  useEffect(() => {
    const eventHandler = () => {
      if (height !== window.innerHeight) {
        onChange(window.innerHeight);
      }
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", eventHandler);
    return () => window.removeEventListener("resize", eventHandler);
  }, [height, onChange]);

  return height;
};
