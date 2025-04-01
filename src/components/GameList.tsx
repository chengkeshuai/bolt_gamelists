import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const games = [
  {
    id: 1,
    name: {
      en: '2048 Neon',
      zh: '2048 霓虹版'
    },
    description: {
      en: 'A cyberpunk twist on the classic puzzle game',
      zh: '经典数字益智游戏的赛博朋克风格版本'
    },
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80',
    rating: 4.8,
    rank: 1,
    url: 'https://play2048.co/'
  },
  {
    id: 2,
    name: {
      en: 'Snake.io',
      zh: '贪吃蛇大作战'
    },
    description: {
      en: 'Multiplayer online version of the classic Snake game',
      zh: '经典贪吃蛇游戏的多人在线版本'
    },
    thumbnail: 'https://images.unsplash.com/photo-1615680022647-99c397cbcb46?auto=format&fit=crop&q=80',
    rating: 4.6,
    rank: 2,
    url: 'https://slither.io/'
  },
  {
    id: 3,
    name: {
      en: 'Tetris',
      zh: '俄罗斯方块'
    },
    description: {
      en: 'The timeless classic Tetris with multiple game modes',
      zh: '永恒经典的俄罗斯方块，支持多种游戏模式'
    },
    thumbnail: 'https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&q=80',
    rating: 4.9,
    rank: 3,
    url: 'https://tetris.com/play-tetris'
  },
  {
    id: 4,
    name: {
      en: 'Gomoku',
      zh: '五子棋'
    },
    description: {
      en: 'Traditional Gomoku game with AI opponent',
      zh: '传统五子棋游戏，支持人机对战'
    },
    thumbnail: 'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&q=80',
    rating: 4.5,
    rank: 4,
    url: 'https://gomoku.yjyao.com/'
  },
  {
    id: 5,
    name: {
      en: 'Minesweeper',
      zh: '扫雷'
    },
    description: {
      en: 'Classic Minesweeper with multiple difficulty levels',
      zh: '经典扫雷游戏，支持多种难度'
    },
    thumbnail: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80',
    rating: 4.3,
    rank: 5,
    url: 'https://minesweeper.online/'
  }
];

export default function GameList() {
  const { language, t } = useLanguage();

  return (
    <section id="games" className="py-20 bg-black/80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <div 
              key={game.id} 
              className="card-wrapper"
            >
              <div className="bg-gradient-to-r from-gray-900 to-black p-[1px] rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-glow group">
                <div className="bg-black rounded-xl overflow-hidden">
                  <div className="relative">
                    <img 
                      src={game.thumbnail} 
                      alt={game.name[language]} 
                      className="w-full h-40 object-cover" 
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{game.name[language]}</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-gray-300">{game.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-3 text-sm">{game.description[language]}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-cyan-400">{t('game.rank')} #{game.rank}</span>
                      <button 
                        onClick={() => window.open(game.url, '_blank', 'width=800,height=600')}
                        className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-xs font-semibold hover:from-cyan-600 hover:to-purple-700 transition-colors duration-300"
                      >
                        {t('game.playNow')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}