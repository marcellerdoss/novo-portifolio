'use client';

import { createContext, useContext } from 'react';

interface CaseViewContextValue {
  view: 'overview' | 'detailed';
  switchView: (v: 'overview' | 'detailed') => void;
}

export const CaseViewContext = createContext<CaseViewContextValue>({
  view: 'overview',
  switchView: () => {},
});

export function useCaseView() {
  return useContext(CaseViewContext);
}
