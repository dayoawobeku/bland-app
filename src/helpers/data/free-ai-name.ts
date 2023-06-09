import {OptionType} from '@/types';

const nameTypeData: OptionType[] = [
  {value: 'business', label: 'Business'},
  {value: 'digital_product', label: 'Digital Product (App, Software etc)'},
  {value: 'book', label: 'Book'},
  {value: 'event', label: 'Event'},
  {value: 'portfolio', label: 'Portfolio'},
];

const businessIndustryData: OptionType[] = [
  {value: 'tech', label: 'Tech'},
  {value: 'fashion', label: 'Fashion'},
  {value: 'food', label: 'Food'},
  {value: 'finance', label: 'Finance'},
  {value: 'real_estate', label: 'Real Estate, Rental and Leasing'},
];

export const FREE_AI_NAME_DATA = [
  {
    id: 1,
    userCheckText: 'Choose name',
    funFact:
      'The word "brand" originally referred to a burning mark on livestock to indicate ownership.',
    question: 'What type of name do you need?',
    options: nameTypeData,
    inputType: 'dropdown',
  },
  {
    id: 2,
    userCheckText: 'Choose name',
    funFact:
      'The word "brand" originally referred to a burning mark on livestock to indicate ownership.',
    question: 'Which of these industries does your business fit in?',
    options: businessIndustryData,
    inputType: 'dropdown',
  },
  {
    id: 3,
    userCheckText: 'Choose name',
    funFact:
      'The word "brand" originally referred to a burning mark on livestock to indicate ownership.',
    question: 'Fill the blanks to describe your business briefly.',
    inputType: 'text',
  },
  {
    id: 4,
    userCheckText: 'Choose name',
    funFact:
      'The word "brand" originally referred to a burning mark on livestock to indicate ownership.',
    question: 'Add up to 5 keywords for name generation',
    inputType: 'keywords',
  },
];
