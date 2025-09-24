import React from 'react';
import { cn } from '@/lib/utils';

export interface CardData {
  id: string;
  carName: string;
  isFlipped: boolean;
  isMatched: boolean;
  isCenter?: boolean;
}

interface CardProps {
  card: CardData;
  onCardClick: (cardId: string) => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onCardClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched && !card.isCenter) {
      onCardClick(card.id);
    }
  };

  const getCarImage = (carName: string) => {
    const carImages: Record<string, string> = {
      'Bugatti Chiron': '/cars/Bugatti Chiron_1758684593100.jpg',
      'Lamborghini Aventador SVJ': '/cars/Lamborghini Aventador SVJ_1758684593103.jpg',
      'Ferrari SF90 Stradale': '/cars/Ferrari SF90 Stradale_1758684593102.avif',
      'McLaren 720S': '/cars/McLaren 720S_1758684593105.jpg',
      'Porsche 911 GT2 RS': '/cars/Porsche 911 GT2 RS_1758684593107.jpg',
      'Aston Martin Valkyrie': '/cars/Aston Martin Valkyrie_1758684593099.webp',
      'Koenigsegg Jesko': '/cars/Koenigsegg Jesko_1758684593103.webp',
      'Pagani Huayra': '/cars/Pagani Huayra_1758684593107.webp',
      'Lamborghini Huracán STO': '/cars/Lamborghini Huracán STO_1758684593104.jpg',
      'McLaren Artura': '/cars/McLaren Artura_1758684593106.jpg',
      'Ferrari 296 GTB': '/cars/Ferrari 296 GTB_1758684593101.jpg',
      'Aston Martin DBS Superleggera': '/cars/Aston Martin DBS Superleggera_1758684593097.webp'
    };
    return carImages[carName] || '';
  };

  const renderCardContent = () => {
    if (card.isCenter) {
      return (
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-red-500 to-orange-600 text-white">
          {/* Hot Wheels-style logo using SVG */}
          <svg className="w-12 h-12" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="25" cy="75" r="15" fill="black"/>
            <circle cx="75" cy="75" r="15" fill="black"/>
            <path d="M10 60 Q50 30 90 60 L90 75 L10 75 Z" fill="yellow"/>
            <path d="M20 50 Q50 35 80 50" stroke="red" strokeWidth="3" fill="none"/>
            <text x="50" y="45" textAnchor="middle" className="text-xs font-bold" fill="red">HW</text>
          </svg>
        </div>
      );
    }

    if (card.isFlipped || card.isMatched) {
      const carImageSrc = getCarImage(card.carName);
      return (
        <div className="relative h-full overflow-hidden">
          {carImageSrc ? (
            <img 
              src={carImageSrc}
              alt={card.carName}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                console.error(`Failed to load image for ${card.carName}:`, carImageSrc);
                // Fallback to a solid color background if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-600 to-gray-800 text-white">
              <span className="text-xs font-semibold text-center">
                {card.carName}
              </span>
            </div>
          )}
          {/* Car name overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-1">
            <span className="text-xs font-semibold text-center block leading-tight">
              {card.carName}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
          <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
        </svg>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "card-container aspect-square cursor-pointer select-none",
        card.isCenter && "cursor-default",
        disabled && !card.isCenter && "cursor-not-allowed opacity-50"
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          "card-inner w-full h-full relative",
          (card.isFlipped || card.isMatched) && "flipped"
        )}
      >
        <div className="card-face card-front absolute inset-0 rounded-lg border-2 border-gray-300 shadow-lg">
          {renderCardContent()}
        </div>
        <div className="card-face card-back absolute inset-0 rounded-lg border-2 border-gray-300 shadow-lg">
          {renderCardContent()}
        </div>
      </div>
    </div>
  );
};

export default Card;
