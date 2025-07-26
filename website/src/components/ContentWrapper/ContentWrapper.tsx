"use client";

import { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * Simplified content wrapper that:
 * - Provides proper spacing from fixed NavBar (ml-64)
 * - Allows full-screen backgrounds to extend behind NavBar
 * - Maintains content positioning without background restrictions
 */
export default function ContentWrapper({
  children,
  className = "",
}: ContentWrapperProps) {
  return <div className={`ml-64 ${className}`}>{children}</div>;
}
