import React from 'react';
import { useSound } from '../context/SoundContext';
import { SoundEffect } from '../services/SoundService';

export enum GameDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

interface DifficultySelectorProps {
  currentDifficulty: GameDifficulty;
  onDifficultyChange: (difficulty: GameDifficulty) => void;
}

const difficultyInfo = {
  [GameDifficulty.EASY]: {
    label: '简单',
    description: '适合新手玩家，游戏节奏较慢',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/30',
    hoverColor: 'hover:bg-green-400/20'
  },
  [GameDifficulty.MEDIUM]: {
    label: '中等',
    description: '适合有经验的玩家，游戏节奏适中',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/30',
    hoverColor: 'hover:bg-yellow-400/20'
  },
  [GameDifficulty.HARD]: {
    label: '困难',
    description: '适合专家玩家，游戏节奏快',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/30',
    hoverColor: 'hover:bg-red-400/20'
  }
};

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  onDifficultyChange
}) => {
  const { playSound } = useSound();

  const handleDifficultyChange = (difficulty: GameDifficulty) => {
    playSound(SoundEffect.BUTTON_CLICK);
    onDifficultyChange(difficulty);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">难度选择</h3>
      <div className="space-y-3">
        {Object.values(GameDifficulty).map(difficulty => {
          const info = difficultyInfo[difficulty];
          const isSelected = currentDifficulty === difficulty;
          
          return (
            <button
              key={difficulty}
              onClick={() => handleDifficultyChange(difficulty)}
              className={`w-full p-4 rounded-lg border transition-all duration-200
                ${info.bgColor} ${info.borderColor} ${info.hoverColor}
                ${isSelected ? 'ring-2 ring-cyan-400' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className={`text-lg font-medium ${info.color}`}>
                    {info.label}
                  </div>
                  <div className="text-sm text-gray-400">
                    {info.description}
                  </div>
                </div>
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultySelector; 