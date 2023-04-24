import { useEffect, useRef } from "react";

type Destructor = void | (() => void);
type MountFn = () => Destructor;

export const useOnMount = (onMount: MountFn) => {
  const done = useRef(false);
  useEffect(() => {
    if (!done.current) {
      done.current = true;
      return onMount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
