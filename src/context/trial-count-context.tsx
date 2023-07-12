'use client';

import {Dispatch, SetStateAction, createContext} from 'react';

interface TrialCountContextType {
  trialCount: number;
  setTrialCount: Dispatch<SetStateAction<number>>;
}

export const TrialCountContext = createContext<TrialCountContextType>({
  trialCount: 0,
  setTrialCount: () => {},
});
