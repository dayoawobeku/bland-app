'use client';

import {Dispatch, SetStateAction, createContext, useState} from 'react';
import {OptionType} from '@/types';

interface SelectedOptionsContextType {
  selectedOptions: OptionType[];
  setSelectedOptions: Dispatch<SetStateAction<OptionType[] | []>>;
}

export const SelectedOptionsContext = createContext<SelectedOptionsContextType>(
  {
    selectedOptions: [],
    setSelectedOptions: () => {},
  },
);

const SelectedOptionsProvider = ({children}: {children: React.ReactNode}) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  return (
    <SelectedOptionsContext.Provider
      value={{selectedOptions, setSelectedOptions}}
    >
      {children}
    </SelectedOptionsContext.Provider>
  );
};

export default SelectedOptionsProvider;
