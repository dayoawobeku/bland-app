'use client';

import {Dispatch, SetStateAction, createContext} from 'react';
import {ProductName} from '@/types';

interface DataContextType {
  postData: ProductName[] | null;
  setPostData: Dispatch<SetStateAction<ProductName[] | null>>;
}

export const DataContext = createContext<DataContextType>({
  postData: null,
  setPostData: () => {},
});
