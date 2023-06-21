'use client';

import {JSX} from 'react';
import Image from 'next/image';
import {
  DropdownIndicatorProps,
  GroupBase,
  MultiValueRemoveProps,
  components,
  StylesConfig,
} from 'react-select';
import {dropdownIndicator, multiValueRemove} from '@/assets/images';

const DropdownIndicator = (
  props: JSX.IntrinsicAttributes &
    DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>,
) => (
  <components.DropdownIndicator {...props}>
    <Image src={dropdownIndicator} alt="" width={30} height={30} />
  </components.DropdownIndicator>
);

const MultiValueRemove = (
  props: JSX.IntrinsicAttributes &
    MultiValueRemoveProps<unknown, boolean, GroupBase<unknown>>,
) => (
  <components.MultiValueRemove {...props}>
    <Image src={multiValueRemove} alt="" width={12} height={12} />
  </components.MultiValueRemove>
);

const customStyles: StylesConfig = {
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
    paddingLeft: state.selectProps.menuIsOpen ? '0 !important' : undefined,
    transition: 'all 300ms linear',
  }),
  control: base => ({
    ...base,
    fontFamily: 'var(--font-manrope)',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  }),
};

export {DropdownIndicator, customStyles, MultiValueRemove};
