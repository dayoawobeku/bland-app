'use client';

import {useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {Button} from '@/components';
import Card from './card';
import {CardProps} from './types';

const CARDS: CardProps[] = [
  {
    id: 1,
    heading: 'Get a Free AI-Name',
    paragraph:
      'Save time and generate unique names with available domain. Instantly, using the power of AI',
    active: false,
  },
  {
    id: 2,
    heading: 'Get AI-Human Service',
    paragraph:
      'Combine AI efficiency with human expertise to get the best possible name that aligns with your brand.',
    active: false,
  },
];

export default function Main() {
  const router = useRouter();
  const pathname = usePathname();
  const [cards, setCards] = useState<CardProps[]>(CARDS);

  const handleCardClick = (id: number, isActive: boolean) => {
    setCards(prevCards => {
      const updatedCards = prevCards.map(card => {
        if (card.id === id) {
          return {
            ...card,
            active: !isActive,
          };
        }
        return {
          ...card,
          active: false,
        };
      });
      return updatedCards;
    });
  };

  const activeCard = cards.find(card => card.active) || null;

  const handleNavigation = () => {
    if (activeCard?.id === 1) {
      return router.push(pathname + '/free-ai-name');
    }
    return router.push(pathname + '/ai-human-service');
  };

  return (
    <main className="mt-[84px]">
      <section className="mx-auto max-w-[655px] text-center">
        <h1 className="font-unbounded text-lg font-medium">
          Hello 👋🏽, get started by selecting your preferred naming method
        </h1>
        <p className="mt-4 font-manrope font-light max-w-[412px] mx-auto">
          Your Bland membership is now active! Use the free{' '}
          <span className="inline-block">
            AI-Name-Generator or get a paid service from an expert.
          </span>
        </p>
      </section>
      <section className="mt-16 flex flex-col items-center gap-6">
        <div className="mx-auto grid max-w-[654px] grid-cols-2 gap-11">
          {cards.map(card => (
            <Card key={card.id} handleCardClick={handleCardClick} {...card} />
          ))}
        </div>
        <Button
          size="large"
          disabled={!activeCard}
          onClick={handleNavigation}
        />
      </section>
    </main>
  );
}
