'use client';

import {useState, useEffect} from 'react';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import {useAuth} from '@/hooks';
import {UserContext} from './user-context';

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const {user: authUser, ...auth} = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (authUser && !user) {
      setUser(authUser);
    }
  }, [authUser, user]);

  return (
    <UserContext.Provider value={{user, setUser, ...auth}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
