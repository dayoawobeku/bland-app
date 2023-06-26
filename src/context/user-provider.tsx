'use client';

import {createContext, useState, Dispatch, SetStateAction} from 'react';
import {User} from 'firebase/auth';
import {useAuth} from '@/hooks';
import {getCookie} from '@/helpers/cookies';

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const {user: authUser, ...auth} = useAuth();
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = getCookie('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  return (
    <UserContext.Provider value={{user, setUser, ...auth}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
