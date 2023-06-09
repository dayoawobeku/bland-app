export interface Keyword {
  label: string;
  value: string;
}

export interface OptionType {
  value: string;
  label: string;
  keywords?: (string | Keyword)[];
}
