'use client';

import { useState, useEffect } from 'react';

export default function Timestamp() {
  const [time, setTime] = useState<number | null>(null);
  useEffect(() => {
    // You can determine when and how often to update
    // the time here. In this example we update it only once
    setTime(new Date().getFullYear());
  }, []);
  if (!time) {
    return null;
  }
  return <span>{time}</span>;
}
