import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Maximize2, Save } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import { SoundEffect } from '../services/SoundService';
import { GameSave, GameSaveSlot, saveGameService } from '../services/SaveGameService';
import { GameDifficulty } from './DifficultySelector';
import SaveGameManager from './SaveGameManager';
import DifficultySelector from './DifficultySelector';
import { games } from './GameList';

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { playSound } = useSound();
  const [difficulty, setDifficulty] = useState<GameDifficulty>(GameDifficulty.MEDIUM);
  const [gameState, setGameState] = useState<any>(null);
  const [showSaveManager, setShowSaveManager] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const game = games.find(g => g.id === Number(id));

  useEffect(() => {
    if (!game) {
      navigate('/games');
    }
  }, [game, navigate]);

  if (!game) {
    return null;
  }

  const handleFullscreen = () => {
    playSound(SoundEffect.BUTTON_CLICK);
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const handleDifficultyChange = (newDifficulty: GameDifficulty) => {
    setDifficulty(newDifficulty);
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'DIFFICULTY_CHANGE',
        difficulty: newDifficulty
      }, '*');
    }
  };

  const handleSaveGame = (slot: number) => {
    if (!gameState) return;

    saveGameService.saveGame(game.id, slot, {
      score: gameState.score || 0,
      level: gameState.level || 1,
      data: gameState
    });

    playSound(SoundEffect.BUTTON_CLICK);
    setShowSaveManager(false);
  };

  const handleLoadGame = (save: GameSaveSlot) => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'LOAD_GAME',
        data: save.save.data
      }, '*');
    }

    playSound(SoundEffect.GAME_START);
    setShowSaveManager(false);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    playSound(SoundEffect.GAME_START);
    
    // 自动获取焦点
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.focus();
      // 自动全屏
      if (!isFullscreen) {
        handleFullscreen();
      }
    }
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIsLoading(false);
  };

  // 监听来自游戏的消息
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'GAME_STATE_UPDATE') {
        setGameState(event.data.state);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 监听全屏变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/games')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="返回"
          >
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </button>
          <h1 className="text-2xl font-bold text-white">{game.name[language]}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400">★</span>
          <span className="text-white">{game.rating}</span>
          <span className="text-gray-400">({game.players})</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            <div className="absolute top-4 right-4 z-10 flex space-x-4">
              <button
                onClick={() => setShowSaveManager(true)}
                className="p-2 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 rounded-lg transition-colors"
                title="存档管理"
              >
                <Save className="w-6 h-6 text-cyan-400" />
              </button>
              <button
                onClick={handleFullscreen}
                className="p-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors flex items-center space-x-2"
                title="全屏"
              >
                <Maximize2 className="w-6 h-6 text-white" />
                <span className="text-white font-medium hidden md:inline">
                  {language === 'en' ? 'Fullscreen' : '全屏模式'}
                </span>
              </button>
            </div>
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
              </div>
            )}

            {iframeError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-red-500 text-xl mb-4">游戏加载失败</div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
                >
                  重试
                </button>
              </div>
            ) : (
              <iframe
                id="game-iframe"
                src={`${game.url}?difficulty=${difficulty}`}
                className="w-full aspect-video border-0"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                tabIndex={0}
              />
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <DifficultySelector
            currentDifficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
          />
          
          {showSaveManager && (
            <SaveGameManager
              gameId={game.id}
              onSave={handleSaveGame}
              onLoad={handleLoadGame}
            />
          )}
        </div>
      </div>
    </div>
  );
} 