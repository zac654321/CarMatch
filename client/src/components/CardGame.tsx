import React, { useEffect, useState } from 'react';
import { useCardGame } from '@/lib/stores/useCardGame';
import { useAudio } from '@/lib/stores/useAudio';
import Card from './Card';
import GameStats from './GameStats';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import '../styles/card-animations.css';

const CardGame: React.FC = () => {
  const {
    cards,
    flippedCards,
    matchedPairs,
    moves,
    isGameComplete,
    gameStarted,
    initializeGame,
    flipCard,
    resetGame
  } = useCardGame();

  const { isMuted, toggleMute } = useAudio();
  const [gameTime, setGameTime] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameStarted && !isGameComplete) {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, isGameComplete]);

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Reset timer when game resets
  useEffect(() => {
    if (!gameStarted) {
      setGameTime(0);
    }
  }, [gameStarted]);

  const handleRestart = () => {
    resetGame();
    setGameTime(0);
  };

  const handleCardClick = (cardId: string) => {
    flipCard(cardId);
  };

  const isClickDisabled = flippedCards.length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" style={{fontFamily: 'Orbitron, monospace', fontWeight: '900', letterSpacing: '0.15em', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', transform: 'rotate(-2deg)'}}>
            SUPERCAR GUESS
          </h1>
          <p className="text-gray-300 text-lg">Memory Card Game - Match the Supercars</p>
          
          {/* Sound toggle */}
          <div className="mt-4">
            <Button
              onClick={toggleMute}
              variant="outline"
              size="sm"
              className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="ml-2">{isMuted ? 'Unmute' : 'Mute'}</span>
            </Button>
          </div>
        </div>

        {/* Game Stats */}
        <GameStats
          moves={moves}
          matchedPairs={matchedPairs}
          totalPairs={8}
          isGameComplete={isGameComplete}
          onRestart={handleRestart}
          gameTime={gameTime}
        />

        {/* Game Board */}
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-2xl w-full">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                onCardClick={handleCardClick}
                disabled={isClickDisabled}
              />
            ))}
          </div>
        </div>

        {/* Game Complete Message */}
        {isGameComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border-2 border-yellow-400 text-center max-w-md mx-4">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">Congratulations!</h2>
              <p className="text-white mb-4">
                You completed the game in <strong>{moves}</strong> moves and <strong>{formatTime(gameTime)}</strong>!
              </p>
              <Button
                onClick={handleRestart}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2"
              >
                Play Again
              </Button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-400 max-w-2xl mx-auto">
          <p className="text-sm">
            Click on cards to flip them over and find matching pairs of supercars. 
            Complete the game by matching all 8 pairs!
          </p>
        </div>
      </div>
    </div>
  );

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
};

export default CardGame;
