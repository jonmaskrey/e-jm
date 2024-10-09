import { dangerousFunction, noParallelCalls } from "../noParallelCalls";

describe("No Parallel function", () => {
  test("When several instances called in quick succession, they should return the same result", async () => {
    const fourCalls = [
      noParallelCalls(dangerousFunction),
      noParallelCalls(dangerousFunction),
      noParallelCalls(dangerousFunction),
      noParallelCalls(dangerousFunction),
    ];
    const fourResults = await Promise.allSettled(fourCalls);
    let prevResult = fourResults[0];
    for (const result of fourResults) {
      expect(result).toStrictEqual(prevResult);
      prevResult = result;
    }
  });
  test("When request called again after awaiting the first, the request should re-run.", async () => {
    const fourCalls = [
      noParallelCalls(dangerousFunction),
      noParallelCalls(dangerousFunction),
      noParallelCalls(dangerousFunction),
      noParallelCalls(dangerousFunction),
    ];
    const fourResults = await Promise.allSettled(fourCalls);
    let prevResult = fourResults[0];
    for (const result of fourResults) {
      expect(result).toStrictEqual(prevResult);
      prevResult = result;
    }
    const twoResults = await Promise.allSettled([
      noParallelCalls(dangerousFunction),
      noParallelCalls(dangerousFunction),
    ]);
    expect(twoResults[0]).toStrictEqual(twoResults[1]);
    expect(prevResult).not.toStrictEqual(twoResults[0]);
  });
});
