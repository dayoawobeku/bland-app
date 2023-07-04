'use client';

import {useState} from 'react';
import {ProductName} from '@/types';
import {DataContext} from './data-context';

const DataProvider = ({children}: {children: React.ReactNode}) => {
  const [postData, setPostData] = useState<ProductName[] | null>(null);

  return (
    <DataContext.Provider value={{postData, setPostData}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
