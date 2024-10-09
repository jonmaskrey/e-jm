import { sleep } from "./sleep";

export function addRetries<T, A extends unknown[]>(callbackToRetry: (...args: A) => Promise<T>): (...args: A) => Promise<T> {
  return async (...args: A): Promise<T> => {
    let retryCount = 0;
    let newError: Error | null = null;
    while (retryCount < 3) {
      try {
        const result = await callbackToRetry(...args);
        return result;
      } catch (error) {
        retryCount++;
        newError = error as Error;
        if (retryCount < 3) {
          await sleep(200 * retryCount);
        }
      }
    }
    if (newError) {
      throw newError;
    }
  throw new Error("Function did not return a result");
};
}
