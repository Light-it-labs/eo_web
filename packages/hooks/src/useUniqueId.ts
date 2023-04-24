import { useRef } from "react";
import { v4 as uuid } from "uuid";

export const useUniqueId = (id?: string) => {
  const uniqueName = useRef(uuid());
  return id || uniqueName.current;
};
