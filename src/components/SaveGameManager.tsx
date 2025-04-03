import React from 'react';
import { saveGameService, GameSaveSlot } from '../services/SaveGameService';
import { useSound } from '../context/SoundContext';
import { SoundEffect } from '../services/SoundService';
import { Save, Trash2, Download } from 'lucide-react';

interface SaveGameManagerProps {
  gameId: number;
  onLoad?: (save: GameSaveSlot) => void;
  onSave?: (slot: number) => void;
}

const SaveGameManager: React.FC<SaveGameManagerProps> = ({
  gameId,
  onLoad,
  onSave
}) => {
  const { playSound } = useSound();
  const saves = saveGameService.getAllSaves(gameId);

  const handleSave = (slot: number) => {
    playSound(SoundEffect.BUTTON_CLICK);
    onSave?.(slot);
  };

  const handleLoad = (save: GameSaveSlot) => {
    playSound(SoundEffect.GAME_START);
    onLoad?.(save);
  };

  const handleDelete = (slot: number) => {
    playSound(SoundEffect.BUTTON_CLICK);
    saveGameService.deleteSave(gameId, slot);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 space-y-4">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">游戏存档</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map(slot => {
          const save = saves.find((s: GameSaveSlot) => s.id === slot);
          
          return (
            <div key={slot} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex-1">
                {save ? (
                  <>
                    <div className="text-white font-medium">存档 {slot}</div>
                    <div className="text-gray-400 text-sm">
                      等级: {save.save.level} | 分数: {save.save.score}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {formatDate(save.save.timestamp)}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500">空存档槽位 {slot}</div>
                )}
              </div>
              
              <div className="flex space-x-2">
                {save ? (
                  <>
                    <button
                      onClick={() => handleLoad(save)}
                      className="p-2 hover:bg-cyan-600 rounded-lg transition-colors"
                      title="读取存档"
                    >
                      <Download className="w-5 h-5 text-cyan-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(slot)}
                      className="p-2 hover:bg-red-600 rounded-lg transition-colors"
                      title="删除存档"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleSave(slot)}
                    className="p-2 hover:bg-cyan-600 rounded-lg transition-colors"
                    title="保存到此槽位"
                  >
                    <Save className="w-5 h-5 text-cyan-400" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SaveGameManager; 