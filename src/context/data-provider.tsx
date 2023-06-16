'use client';

import {Dispatch, SetStateAction, createContext, useState} from 'react';
import {ProductName} from '@/types';

interface DataContextType {
  postData: ProductName[] | null;
  setPostData: Dispatch<SetStateAction<ProductName[] | null>>;
}

export const DataContext = createContext<DataContextType>({
  postData: null,
  setPostData: () => {},
});

const DataProvider = ({children}: {children: React.ReactNode}) => {
  const [postData, setPostData] = useState<ProductName[] | null>(null);

  return (
    <DataContext.Provider value={{postData, setPostData}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
