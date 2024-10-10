import { useEffect, useRef } from 'react';

export const useRunOnUnmount = <T extends () => unknown>(callback: T) => {
  const callbackRef = useRef(callback);

  // Update the ref if the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      callbackRef.current();
    };
  }, []);
};
