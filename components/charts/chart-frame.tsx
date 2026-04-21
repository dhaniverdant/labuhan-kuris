'use client';

import { useEffect, useRef, useState } from 'react';

type ChartFrameProps = {
  height?: number;
  children: (size: { width: number; height: number }) => React.ReactNode;
};

export default function ChartFrame({
  height = 320,
  children,
}: ChartFrameProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const updateSize = () => {
      const width = Math.floor(element.getBoundingClientRect().width);
      if (width > 0) {
        setSize({ width, height });
      }
    };

    updateSize();

    const observer = new ResizeObserver(() => {
      updateSize();
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [height]);

  return (
    <div ref={ref} className="h-80 w-full min-w-0">
      {size.width > 0 ? (
        children(size)
      ) : (
        <div className="h-full w-full rounded-2xl bg-slate-100" />
      )}
    </div>
  );
}
