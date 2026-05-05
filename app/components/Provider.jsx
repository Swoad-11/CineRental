"use client";

import { useState, useEffect } from "react";

const Provider = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Standard practice to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return <div className="dark">{children}</div>;
};

export default Provider;
