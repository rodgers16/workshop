import './style.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryCard } from './types';
import { CardGrid } from './components/CardGrid';

function Main() {
  const shuffle = (arr: MemoryCard[]) => {
    const usedIndexes = [];
    let i = arr.length - 1;
    while (i > 0) {
      const random = Math.floor(Math.random() * arr.length);
      if (!usedIndexes.includes(random)) {
        const temp = arr[i];
        arr[i] = arr[random];
        arr[random] = temp;
        usedIndexes.push(random);
        i--;
      }
    }
    return arr;
  };

  const genId = () => self.crypto.randomUUID();

  const memoryTypes = [
    'island',
    'mountains',
    'plains',
    'desert',
    'swamp',
    'space',
  ];

  const memoryCards: MemoryCard[] = shuffle(
    memoryTypes
      .map((type) => [
        { type, flipped: false, id: genId() },
        { type, flipped: false, id: genId() },
      ])
      .flat()
  );

  return <CardGrid memoryCards={memoryCards} />;
}

const root = createRoot(document.querySelector<HTMLDivElement>('#app')!);
root.render(<Main />);
