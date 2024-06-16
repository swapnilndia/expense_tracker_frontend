import { useEffect, useState } from "react";

const useThrottle = (value: string, delay: number) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const [lastExecuted, setLastExecuted] = useState(0);

  useEffect(() => {
    const now = Date.now();
    if (now - lastExecuted > delay) {
      setThrottledValue(value);
      setLastExecuted(now);
    }
  }, [value, delay, lastExecuted]);

  return throttledValue;
};
export default useThrottle;
