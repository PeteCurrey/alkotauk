'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import React, { Component, ErrorInfo, ReactNode } from 'react';

class SafeBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("Auth provider warning:", error);
  }
  render() {
    return this.props.children;
  }
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <SafeBoundary>
      <NextAuthSessionProvider basePath="/api/auth" refetchOnWindowFocus={false}>
        {children}
      </NextAuthSessionProvider>
    </SafeBoundary>
  );
}
