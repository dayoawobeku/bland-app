export interface CardProps {
  id: number;
  heading: string;
  paragraph: string;
  active: boolean;
  handleCardClick?: (id: number, isActive: boolean) => void;
}
