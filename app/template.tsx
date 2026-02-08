"use client";

import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Instantly fade in when the page loads
    setOpacity(1);
  }, []);

  return (
    <div
      style={{
        opacity: opacity,
        transition: "opacity 0.5s ease-in-out", // Smooth 0.5s fade
      }}
    >
      {children}
    </div>
  );
}