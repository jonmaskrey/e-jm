import { sleep } from "./sleep";

export const dangerousFunction = async () => {
  await sleep(100 + Math.random() * 50);
  const hasErrored = Math.random() > 0.5;
  if (hasErrored) {
    throw new Error(`Unknown error at ${new Date().toISOString()}`);
  }
  return { message: `Success at ${new Date().toISOString()}` };
};

export const noParallelCalls = (() => {
  let callOngoing: Promise<unknown> | null = null;

  return async <T extends () => Promise<unknown>>(dangerousCallBack: T) => {
    // If there's already a call in progress, return the same promise
    if (callOngoing) {
      return callOngoing;
    }

    // Execute the dangerous callback and store the promise
    callOngoing = dangerousCallBack();

    try {
      // Wait for the result of the dangerous function
      const result = await callOngoing;
      return result;
    } finally {
      // Always reset callOngoing to allow new calls after completion or error
      callOngoing = null;
    }
  };
})();
