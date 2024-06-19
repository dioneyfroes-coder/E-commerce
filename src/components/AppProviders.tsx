// src/components/AppProviders.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default AppProviders;
