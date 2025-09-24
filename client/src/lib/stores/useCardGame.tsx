import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { useAudio } from './useAudio';

export interface CardData {
  id: string;
  carName: string;
  isFlipped: boolean;
  isMatched: boolean;
  isCenter?: boolean;
}

interface CardGameState {
  cards: CardData[];
  flippedCards: string[];
  matchedPairs: number;
  moves: number;
  isGameComplete: boolean;
  gameStarted: boolean;
  
  // Actions
  initializeGame: () => void;
  flipCard: (cardId: string) => void;
  resetGame: () => void;
  checkForMatch: () => void;
}

const carNames = [
  'Bugatti Chiron',
  'Lamborghini Aventador',
  'Ferrari SF90 Stradale',
  'McLaren 720S',
  'Porsche 911 GT2 RS',
  'Koenigsegg Jesko',
  'Pagani Huayra',
  'Aston Martin DBS'
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateCards = (): CardData[] => {
  // Create pairs of cards (2 of each car)
  const cardPairs = carNames.flatMap((carName, index) => [
    {
      id: `${index}-1`,
      carName,
      isFlipped: false,
      isMatched: false
    },
    {
      id: `${index}-2`,
      carName,
      isFlipped: false,
      isMatched: false
    }
  ]);

  // Shuffle the pairs and return them directly for 4x4 grid
  return shuffleArray(cardPairs);
};

export const useCardGame = create<CardGameState>()(
  subscribeWithSelector((set, get) => ({
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    isGameComplete: false,
    gameStarted: false,

    initializeGame: () => {
      const cards = generateCards();
      set({
        cards,
        flippedCards: [],
        matchedPairs: 0,
        moves: 0,
        isGameComplete: false,
        gameStarted: false
      });
    },

    flipCard: (cardId: string) => {
      const { cards, flippedCards, gameStarted } = get();
      
      if (flippedCards.length >= 2) return;
      
      const card = cards.find(c => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched || card.isCenter) return;

      const newFlippedCards = [...flippedCards, cardId];
      
      set(state => ({
        cards: state.cards.map(c => 
          c.id === cardId ? { ...c, isFlipped: true } : c
        ),
        flippedCards: newFlippedCards,
        gameStarted: true
      }));

      // Play flip sound
      const audioStore = useAudio.getState();
      audioStore.playHit();

      // Check for match after a short delay if we have 2 flipped cards
      if (newFlippedCards.length === 2) {
        setTimeout(() => {
          get().checkForMatch();
        }, 1000);
      }
    },

    checkForMatch: () => {
      const { cards, flippedCards, matchedPairs } = get();
      
      if (flippedCards.length !== 2) return;

      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      if (!firstCard || !secondCard) return;

      const isMatch = firstCard.carName === secondCard.carName;
      const newMatchedPairs = isMatch ? matchedPairs + 1 : matchedPairs;

      if (isMatch) {
        // Match found
        const audioStore = useAudio.getState();
        audioStore.playSuccess();

        set(state => ({
          cards: state.cards.map(c => 
            c.id === firstCardId || c.id === secondCardId 
              ? { ...c, isMatched: true }
              : c
          ),
          flippedCards: [],
          matchedPairs: newMatchedPairs,
          moves: state.moves + 1,
          isGameComplete: newMatchedPairs === 8
        }));
      } else {
        // No match, flip cards back
        set(state => ({
          cards: state.cards.map(c => 
            c.id === firstCardId || c.id === secondCardId 
              ? { ...c, isFlipped: false }
              : c
          ),
          flippedCards: [],
          moves: state.moves + 1
        }));
      }
    },

    resetGame: () => {
      get().initializeGame();
    }
  }))
);
