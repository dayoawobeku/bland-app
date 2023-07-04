'use client';

import {Dispatch, SetStateAction, createContext} from 'react';
import {User} from 'firebase/auth';

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
