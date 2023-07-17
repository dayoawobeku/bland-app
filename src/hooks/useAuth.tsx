'use client';

import {useContext, useEffect, useState} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAdditionalUserInfo,
  deleteUser,
} from 'firebase/auth';
import {doc, getDoc, getFirestore, setDoc, updateDoc} from 'firebase/firestore';
import firebase from '@/helpers/firebase';
import {UserContext} from '@/context';
import {removeCookie, setCookie} from '@/helpers/cookies';
import {LoadingState} from '@/types';

const auth = getAuth(firebase);
const db = getFirestore();

export const useAuth = () => {
  const {user, setUser} = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();
  const [trialCount, setTrialCount] = useState<number | null>(null);
  const [status, setStatus] = useState(LoadingState.Idle);

  useEffect(() => {
    const fetchUserData = async (uid: string) => {
      try {
        const userDocRef = doc(db, 'users', uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setTrialCount(userData?.trialCount ?? null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user && user.uid) {
      fetchUserData(user.uid);
    }
  }, [user]);

  const handleSignUp = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const {user} = result;
      setStatus(LoadingState.Loading);

      const userData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        trialCount: 3,
      };

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, userData);

      setCookie('user', JSON.stringify(user));
      setUser(user);
      router.push('/preferred-naming-method');
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.Error);
    } finally {
      setStatus(LoadingState.Idle);
    }
  };

  const handleLogin = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const {user} = result;
      if (user) {
        const additionalUserInfo = getAdditionalUserInfo(result);
        const isNewUser = additionalUserInfo?.isNewUser;
        if (isNewUser) {
          console.log(
            'New user. Prompt them to complete additional steps or provide more information.',
          );
          console.error(
            'An account with this Google sign in was not found. Please try a different sign in method or contact support if you are unable to access your account.',
          );
          await deleteUser(user);
          return;
        } else {
          setStatus(LoadingState.Loading);
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          const userData = userDocSnap.data();
          setUser(user);
          setCookie('user', JSON.stringify(user));
          setTrialCount(userData?.trialCount || 0);
          router.push('/preferred-naming-method');
        }
      } else {
        console.error('User does not exist. Please sign up with Google.');
      }
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.Error);
    } finally {
      setStatus(LoadingState.Idle);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      removeCookie('user');
      setUser(null);
      if (pathname === '/') {
        router.refresh();
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaidUserDetails = async (
    userId: string,
    planDetails: any,
  ): Promise<void> => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, planDetails);
      console.log('Plan details updated for user:', userId);
    } catch (error) {
      console.error('Error updating plan details:', error);
    }
  };

  return {
    user,
    trialCount,
    handleSignUp,
    handleLogin,
    handleLogout,
    handlePaidUserDetails,
    status,
  };
};
