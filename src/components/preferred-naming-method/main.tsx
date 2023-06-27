'use client';

import {useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {Button} from '@/components';
import Card from './card';
import {CardProps} from './types';
import {useAuth} from '@/hooks';

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
  const {user} = useAuth();
  const [error, setError] = useState('');
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
    } else if (activeCard?.id === 2) {
      return router.push(pathname + '/ai-human-service');
    } else {
      setError('Please select a naming method');
      return;
    }
  };

  return (
    <main className="mt-14 md:mt-[84px]">
      <section className="mx-auto sm:max-w-[70%] text-center">
        <h1 className="font-unbounded text-md2 sm:text-lg font-medium">
          {user !== null
            ? `Hello ${
                user?.displayName?.split(' ')[0]
              }👋🏽, get started by selecting your preferred naming method`
            : 'Get started by selecting your preferred naming method'}
        </h1>
        <p className="mt-4 font-manrope font-light max-w-[412px] mx-auto">
          Your Bland membership is now active! Use the free{' '}
          <span className="sm:inline-block">
            AI-Name-Generator or get a paid service from an expert.
          </span>
        </p>
      </section>
      <section className="mt-10 sm:mt-16 flex flex-col items-center gap-6">
        <div className="mx-auto grid max-w-[654px] grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-11">
          {cards.map(card => (
            <Card key={card.id} handleCardClick={handleCardClick} {...card} />
          ))}
        </div>
        {error && activeCard === null && (
          <p className="text-primary font-manrope text-sm">{error}</p>
        )}
        <Button
          size="large"
          onClick={handleNavigation}
          className="w-full sm:w-fit"
        />
      </section>
    </main>
  );
}
