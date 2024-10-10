import { render, cleanup } from '@testing-library/react';
import {useRunOnUnmount} from '../useRunOnUnmount';

const TestComponent = ({ callback }: { callback: () => void }) => {
  useRunOnUnmount(callback);
  return <div>Test Component</div>;
};

describe('useRunOnUnmount', () => {
  afterEach(cleanup);

  it('should execute callback only on unmount', () => {
    const callback = jest.fn();
    const { unmount } = render(<TestComponent callback={callback} />);
    expect(callback).not.toHaveBeenCalled();
    unmount();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not execute callback on re-renders', () => {
    const callback = jest.fn();
    const { rerender, unmount } = render(<TestComponent callback={callback} />);
    expect(callback).not.toHaveBeenCalled();
    rerender(<TestComponent callback={callback} />);
    expect(callback).not.toHaveBeenCalled();
    unmount();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not have a stale callback on unmount', () => {
    let callback = jest.fn();
    const { rerender, unmount } = render(<TestComponent callback={callback} />);
    callback = jest.fn(() => console.log('Updated callback'));
    rerender(<TestComponent callback={callback} />);
    unmount();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});