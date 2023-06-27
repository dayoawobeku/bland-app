export interface Keyword {
  label: string;
  value: string;
}

export interface OptionType {
  whatYouProvideFor?: string;
  whatYouProvide?: string;
  businessVision?: string;
  firstName?: string;
  lastName?: string;
  value: string;
  label: string;
  keywords?: (string | Keyword)[];
  inputType?: string;
  inputTextType?: string;
}

export interface PostDataRequestBody {
  companyType: string;
  industry: string;
  whatYouProvide: string;
  whatYouProvideFor: string;
  seedWords: string;
}

export interface ProductName {
  name: string;
  domain: string;
  extensions: string[];
}

export enum LoadingState {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
}

export interface NameData {
  id: number;
  userCheckText: string;
  funFact: string;
  question: string;
  instruction: string;
  options?: OptionType[];
  inputType: string;
  inputTextType: string;
  width: string;
}
