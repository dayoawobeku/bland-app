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
