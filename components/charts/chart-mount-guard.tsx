'use client';

import { useEffect, useState } from 'react';

type ChartMountGuardProps = {
  children: React.ReactNode;
  height?: string;
};

export default function ChartMountGuard({
  children,
  height = 'h-80',
}: ChartMountGuardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`w-full min-w-0 ${height}`}>
      {mounted ? children : <div className="h-full w-full rounded-2xl bg-slate-100" />}
    </div>
  );
}
