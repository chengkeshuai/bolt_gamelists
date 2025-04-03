import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import { SoundEffect } from '../services/SoundService';
import { Star, Users, Trophy, Maximize2, AlertCircle } from 'lucide-react';

export interface Game {
  id: number;
  name: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  thumbnail: string;
  rating: number;
  players: string;
  rank: number;
  url: string;
}

// 导出游戏列表以便其他组件使用
export const games: Game[] = [
  {
    id: 1,
    name: {
      en: '2048',
      zh: '2048'
    },
    description: {
      en: '经典2048游戏的霓虹风格版本',
      zh: '经典2048游戏的霓虹风格版本'
    },
    thumbnail: '/game-thumbnails/2048.png',
    rating: 4.8,
    players: '100K+',
    rank: 1,
    url: '/games/2048/index.html'
  },
  {
    id: 2,
    name: {
      en: '霓虹贪吃蛇',
      zh: '霓虹贪吃蛇'
    },
    description: {
      en: '经典贪吃蛇游戏的霓虹风格版本',
      zh: '经典贪吃蛇游戏的霓虹风格版本'
    },
    thumbnail: '/game-thumbnails/snake.png',
    rating: 4.6,
    players: '50K+',
    rank: 2,
    url: '/games/snake/index.html'
  },
  {
    id: 3,
    name: {
      en: '霓虹乒乓',
      zh: '霓虹乒乓'
    },
    description: {
      en: '经典乒乓球游戏的霓虹风格版本',
      zh: '经典乒乓球游戏的霓虹风格版本'
    },
    thumbnail: '/game-thumbnails/pong.png',
    rating: 4.7,
    players: '30K+',
    rank: 3,
    url: '/games/pong/index.html'
  },
  {
    id: 4,
    name: {
      en: '赛博打砖块',
      zh: '赛博打砖块'
    },
    description: {
      en: '经典打砖块游戏的赛博朋克版本',
      zh: '经典打砖块游戏的赛博朋克版本'
    },
    thumbnail: '/game-thumbnails/breakout.png',
    rating: 4.5,
    players: '40K+',
    rank: 4,
    url: '/games/breakout/index.html'
  },
  {
    id: 5,
    name: {
      en: '赛博跑酷',
      zh: '赛博跑酷'
    },
    description: {
      en: '霓虹风格的无尽跑酷游戏',
      zh: '霓虹风格的无尽跑酷游戏'
    },
    thumbnail: '/game-thumbnails/runner.png',
    rating: 4.9,
    players: '80K+',
    rank: 5,
    url: '/games/runner/index.html'
  },
  {
    id: 6,
    name: {
      en: '赛博俄罗斯方块',
      zh: '赛博俄罗斯方块'
    },
    description: {
      en: '经典俄罗斯方块的赛博朋克版本',
      zh: '经典俄罗斯方块的赛博朋克版本'
    },
    thumbnail: '/game-thumbnails/tetris.png',
    rating: 4.8,
    players: '90K+',
    rank: 6,
    url: '/games/tetris/index.html'
  },
  {
    id: 7,
    name: {
      en: '赛博记忆',
      zh: '赛博记忆'
    },
    description: {
      en: '霓虹风格的记忆配对游戏',
      zh: '霓虹风格的记忆配对游戏'
    },
    thumbnail: '/game-thumbnails/memory.png',
    rating: 4.4,
    players: '20K+',
    rank: 7,
    url: '/games/memory/index.html'
  },
  {
    id: 8,
    name: {
      en: '赛博弹珠台',
      zh: '赛博弹珠台'
    },
    description: {
      en: '赛博朋克风格的弹珠台游戏',
      zh: '赛博朋克风格的弹珠台游戏'
    },
    thumbnail: '/game-thumbnails/pinball.png',
    rating: 4.6,
    players: '35K+',
    rank: 8,
    url: '/games/pinball/index.html'
  },
  {
    id: 9,
    name: {
      en: '太空射击',
      zh: '太空射击'
    },
    description: {
      en: '赛博朋克风格的太空射击游戏',
      zh: '赛博朋克风格的太空射击游戏'
    },
    thumbnail: '/game-thumbnails/shooter.png',
    rating: 4.7,
    players: '60K+',
    rank: 9,
    url: '/games/shooter/index.html'
  }
];

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

// 默认游戏缩略图
const defaultThumbnail = '/game-thumbnails/placeholder.svg';

function GameCard({ game, onClick }: GameCardProps) {
  const { language } = useLanguage();
  const { playSound } = useSound();
  const [imgError, setImgError] = useState(false);

  const handleClick = () => {
    playSound(SoundEffect.BUTTON_CLICK);
    onClick();
  };

  return (
    <div 
      className="card-wrapper group/card cursor-pointer"
      onClick={handleClick}
    >
      <div className="bg-gradient-to-r from-gray-900 to-black p-[1px] rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-glow">
        <div className="bg-black rounded-xl overflow-hidden">
          <div className="relative">
            <img 
              src={imgError ? defaultThumbnail : game.thumbnail} 
              alt={game.name[language]} 
              className="w-full h-48 object-cover transition-transform duration-300 group-hover/card:scale-110"
              onError={() => setImgError(true)}
            />
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm">#{game.rank}</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-1">{game.name[language]}</h3>
            <p className="text-gray-400 text-sm mb-3">{game.description[language]}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white">{game.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-400 text-sm">{game.players}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GameDetailProps {
  game: Game;
}

function GameDetail({ game }: GameDetailProps) {
  const { language } = useLanguage();
  const { playSound } = useSound();
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleFullscreen = () => {
    playSound(SoundEffect.BUTTON_CLICK);
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    }
  };

  const handleIframeLoad = () => {
    playSound(SoundEffect.GAME_START);
  };

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="bg-black/90 rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← {language === 'en' ? 'Back' : '返回'}
            </button>
            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                {language === 'en' ? game.name.en : game.name.zh}
              </h2>
              <p className="text-gray-400 text-sm">
                {language === 'en' ? game.description.en : game.description.zh}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-yellow-400/10 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="ml-1 text-yellow-400 text-sm">{game.rating}</span>
              </div>
              <div className="flex items-center text-cyan-400/80 text-sm">
                <Users className="w-4 h-4 mr-1" />
                <span>{game.players}</span>
              </div>
            </div>
            <button
              onClick={handleFullscreen}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105 group"
              title={language === 'en' ? 'Fullscreen' : '全屏'}
            >
              <Maximize2 className="w-5 h-5 text-white mr-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-white font-medium">
                {language === 'en' ? 'Fullscreen' : '全屏模式'}
              </span>
            </button>
          </div>
        </div>
        <div className="relative w-full" style={{ height: 'calc(100vh - 200px)' }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
          )}
          {iframeError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
              <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
              <p className="text-white text-lg font-semibold mb-2">
                {language === 'en' ? 'Game Loading Error' : '游戏加载错误'}
              </p>
              <p className="text-gray-400 text-sm">
                {language === 'en' 
                  ? 'Sorry, the game is currently unavailable. Please try again later.' 
                  : '抱歉，游戏暂时无法加载。请稍后再试。'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
              >
                {language === 'en' ? 'Reload Game' : '重新加载'}
              </button>
            </div>
          ) : (
            <iframe
              id="game-iframe"
              src={game.url}
              className="w-full h-[600px] border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => setIframeError(true)}
              onLoad={handleIframeLoad}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function GameList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const isHomePage = location.pathname === '/';

  const handleGameClick = (game: Game) => {
    navigate(`/games/${game.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isHomePage && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-4">
            {language === 'en' ? 'Featured Games' : '精选游戏'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Experience our collection of cyberpunk-themed retro games, reimagined with modern twists and neon aesthetics.'
              : '体验我们的赛博朋克主题复古游戏合集，以现代风格重新演绎，融入霓虹美学。'
            }
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <GameCard 
            key={game.id} 
            game={game}
            onClick={() => handleGameClick(game)}
          />
        ))}
      </div>
    </div>
  );
}