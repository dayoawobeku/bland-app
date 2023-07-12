'use client';

import {useEffect, useState} from 'react';
import {TrialCountContext} from './trial-count-context';
import {doc, getFirestore, onSnapshot} from 'firebase/firestore';
import {initialCount} from '@/helpers';
import {useAuth} from '@/hooks';
import {Loader} from '@/components';

const db = getFirestore();

const TrialCountProvider = ({children}: {children: React.ReactNode}) => {
  const {user: authUser} = useAuth();
  const [trialCount, setTrialCount] = useState(initialCount);

  useEffect(() => {
    if (authUser) {
      const unsubscribe = onSnapshot(doc(db, 'users', authUser.uid), doc => {
        if (doc.exists()) {
          const {trialCount} = doc.data();
          setTrialCount(trialCount);
        }
      });

      return () => unsubscribe();
    }
  }, [authUser]);

  return (
    <TrialCountContext.Provider value={{trialCount, setTrialCount}}>
      {children}
    </TrialCountContext.Provider>
  );
};

export default TrialCountProvider;
