import {useContext} from 'react';
import {updateDoc, doc, getFirestore} from 'firebase/firestore';
import {isBefore} from 'date-fns';
import {User, getAuth} from 'firebase/auth';
import firebase from '@/helpers/firebase';
import {TrialCountContext} from '@/context';

getAuth(firebase);
const db = getFirestore();

export const useTrialCount = (user: User | null, resetTime: Date) => {
  const {trialCount, setTrialCount} = useContext(TrialCountContext);

  const handleConsumeTrial = async (): Promise<void> => {
    if (user && trialCount > 0 && isBefore(new Date(), resetTime)) {
      // Decrement trialCount
      const updatedTrialCount = trialCount - 1;
      setTrialCount(updatedTrialCount);

      // Update user document in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        trialCount: updatedTrialCount,
      });
    } else {
      console.log(
        'Cannot consume trial. No more trials available or trial count reset time exceeded.',
      );
    }
  };

  return {handleConsumeTrial};
};
