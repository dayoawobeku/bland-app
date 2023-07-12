import {NameData, OptionType} from '@/types';

const nameTypeData: OptionType[] = [
  {value: 'business', label: 'Business'},
  {value: 'digital_product', label: 'Digital Product (App, Software etc)'},
  {value: 'book', label: 'Book'},
  {value: 'event', label: 'Event'},
  {value: 'portfolio', label: 'Portfolio'},
];

const FREE_AI_NAME_DATA: NameData[] = [
  {
    id: 1,
    userCheckText: 'Choose name',
    funFact:
      'The word "brand" originally referred to a burning mark on livestock to indicate ownership.',
    question: 'What type of name do you need?',
    instruction: '',
    options: nameTypeData,
    inputType: 'dropdown',
    inputTextType: 'name-type',
    width: '25%',
  },
  {
    id: 2,
    userCheckText: 'Choose name',
    funFact:
      'The word "brand" originally referred to a burning mark on livestock to indicate ownership.',
    question: 'Fill the blanks to describe your business briefly.',
    instruction: '',
    inputType: 'text',
    inputTextType: 'business-description',
    width: '50%',
  },
  {
    id: 3,
    userCheckText: 'Choose name',
    funFact:
      'The word "brand" originally referred to a burning mark on livestock to indicate ownership.',
    question: 'Add up to 5 keywords for name generation',
    instruction: '',
    inputType: 'keywords',
    inputTextType: 'keywords',
    width: '75%',
  },
  {
    id: 4,
    userCheckText: 'Create account',
    funFact:
      'The word "brand" originally referred to a burning mark on livestock to indicate ownership.',
    question: 'Why does this business exist?',
    instruction:
      'Share the vision of your company or the story behind how you decided to build this.',
    inputType: 'textarea',
    inputTextType: 'business-vision',
    width: '100%',
  },
];

const AI_HUMAN_NAME_DATA: NameData[] = [
  {
    id: 1,
    userCheckText: 'Create account',
    funFact:
      'The word "brand" originally referred to a burning mark on livestock to indicate ownership.',
    question: 'What type of name do you need?',
    instruction: "Select what you're looking to get a name for.",
    options: nameTypeData,
    inputType: 'dropdown',
    inputTextType: 'name-type',
    width: '25%',
  },
  {
    id: 2,
    userCheckText: 'Create account',
    funFact:
      'The word "brand" originally referred to a burning mark on livestock to indicate ownership.',
    question: 'Fill the blanks to describe your business briefly.',
    instruction: '',
    inputType: 'text',
    inputTextType: 'business-description',
    width: '50%',
  },
  {
    id: 3,
    userCheckText: 'Create account',
    funFact:
      'The word "brand" originally referred to a burning mark on livestock to indicate ownership.',
    question: 'Why does this business exist?',
    instruction:
      'Share the vision of your company or the story behind how you decided to build this.',
    inputType: 'textarea',
    inputTextType: 'business-vision',
    width: '75%',
  },
  {
    id: 4,
    userCheckText: 'Create account',
    funFact:
      'The word "brand" originally referred to a burning mark on livestock to indicate ownership.',
    question: "What's your name?",
    instruction: '',
    inputType: 'text',
    inputTextType: 'user-name',
    width: '100%',
  },
];

export {FREE_AI_NAME_DATA, AI_HUMAN_NAME_DATA, nameTypeData};
