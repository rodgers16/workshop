import React, { useEffect, useState } from 'react';
import { MemoryCard } from '../types';
import { Card } from './Card';
import './cards.css';

export interface CardGridProps {
  memoryCards: MemoryCard[];
}

export function CardGrid({ memoryCards }: CardGridProps) {
  const [cards, setCards] = useState(memoryCards);
  const [score, setScore] = useState('0');

  function handleClick(card: MemoryCard) {
    const selectedCard = cards.find(
      ({ type, id }) => type === card.type && id === card.id
    );
    const selectedCardCopy = { ...selectedCard, flipped: true };
    const index = cards.indexOf(selectedCard);
    const memoryCardsCopy = [...cards];
    memoryCardsCopy[index] = selectedCardCopy;
    setCards(memoryCardsCopy);
  }

  useEffect(() => {
    const typesFlipped = cards
      .filter((card) => card.flipped)
      .map(({ type }) => type);

    const nonMatches = typesFlipped.filter(
      (type) => typesFlipped.indexOf(type) == typesFlipped.lastIndexOf(type)
    );

    if (nonMatches.length === 2) {
      const cardsToFlipBack = cards.map((card) => {
        if (nonMatches.includes(card.type)) {
          return { ...card, flipped: false };
        }
        return card;
      });

      setTimeout(() => {
        setCards(cardsToFlipBack);
      }, 1000);
    }
    const score = typesFlipped.length - new Set(typesFlipped).size;
    if (score === cards.length / 2) {
      setScore("Congrats You've Won!");
    } else {
      setScore(score.toString());
    }
  }, [cards]);

  return (
    <>
      <div className="card-grid">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              flipped={card.flipped}
              type={card.type}
              onClick={() => handleClick(card)}
            />
          );
        })}
      </div>
      <h1>
        {score.length < 2 && 'Score:'}
        {score}
      </h1>
    </>
  );
}
