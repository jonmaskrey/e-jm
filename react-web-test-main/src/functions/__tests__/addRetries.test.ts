import { addRetries } from '../addRetries';
import { sleep } from '../sleep';

jest.mock('../sleep', () => ({
  sleep: jest.fn(),
}));

describe('addRetries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the result when the callback succeeds on the first try', async () => {
    const callback = jest.fn().mockResolvedValue('success');
    const retriedCallback = addRetries(callback);

    const result = await retriedCallback();

    expect(result).toBe('success');
    expect(callback).toHaveBeenCalledTimes(1);
    expect(sleep).not.toHaveBeenCalled();
  });

  it('should retry the callback when it fails and eventually succeed', async () => {
    const callback = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce('success');
    const retriedCallback = addRetries(callback);

    const result = await retriedCallback();

    expect(result).toBe('success');
    expect(callback).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledTimes(1);
    expect(sleep).toHaveBeenCalledWith(200);
  });

  it('should retry the callback up to 3 times and then throw an error', async () => {
    const callback = jest.fn().mockRejectedValue(new Error('fail'));
    const retriedCallback = addRetries(callback);

    await expect(retriedCallback()).rejects.toThrow('fail');
    expect(callback).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledWith(200);
    expect(sleep).toHaveBeenCalledWith(400);
  });

  it('should throw a new error if no result is returned after retries', async () => {
    const callback = jest.fn().mockRejectedValue(new Error('fail'));
    const retriedCallback = addRetries(callback);

    await expect(retriedCallback()).rejects.toThrow('fail');
    expect(callback).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenCalledTimes(2);
  });
});