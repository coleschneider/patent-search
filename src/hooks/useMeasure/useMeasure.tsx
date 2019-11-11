import { useState, useRef, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

const useMeasure = () => {
  const ref = useRef();
  const [bounds, set] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [{ ref }, bounds];
};

export default useMeasure;
