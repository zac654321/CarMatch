import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, Trophy, Target } from 'lucide-react';

interface GameStatsProps {
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  isGameComplete: boolean;
  onRestart: () => void;
  gameTime: number;
}

const GameStats: React.FC<GameStatsProps> = ({
  moves,
  matchedPairs,
  totalPairs,
  isGameComplete,
  onRestart,
  gameTime
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <Card className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="font-semibold">Moves: {moves}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">Matches: {matchedPairs}/{totalPairs}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              <span className="font-semibold">Time: {formatTime(gameTime)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isGameComplete && (
              <div className="flex items-center gap-2 text-green-400 font-bold">
                <Trophy className="w-6 h-6" />
                <span>Game Complete!</span>
              </div>
            )}
            <Button
              onClick={onRestart}
              variant="outline"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Game
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GameStats;
