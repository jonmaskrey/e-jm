import { useEffect } from "react";

export const useRunOnUnmount = <T extends () => unknown>(callback: T) => {
  useEffect(() => {
    return () => {
      callback();
    };
  }, [callback]);
};
