import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import { SoundEffect } from '../services/SoundService';

interface VolumePreset {
  name: string;
  ui: number;
  game: number;
  ambient: number;
}

const volumePresets: VolumePreset[] = [
  { name: '默认', ui: 0.5, game: 0.5, ambient: 0.3 },
  { name: '游戏专注', ui: 0.3, game: 0.7, ambient: 0.2 },
  { name: '环境沉浸', ui: 0.4, game: 0.4, ambient: 0.6 },
  { name: '全部最大', ui: 1.0, game: 1.0, ambient: 1.0 },
];

const SoundControl: React.FC = () => {
  const { isSoundEnabled, toggleSound, volume, setVolume, playSound } = useSound();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [categoryVolumes, setCategoryVolumes] = useState({
    ui: volume,
    game: volume,
    ambient: volume * 0.6,
  });

  // 从本地存储加载音量设置
  useEffect(() => {
    const savedVolumes = localStorage.getItem('categoryVolumes');
    if (savedVolumes) {
      setCategoryVolumes(JSON.parse(savedVolumes));
    }
  }, []);

  // 保存音量设置到本地存储
  useEffect(() => {
    localStorage.setItem('categoryVolumes', JSON.stringify(categoryVolumes));
  }, [categoryVolumes]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setCategoryVolumes(prev => ({
      ui: newVolume,
      game: newVolume,
      ambient: newVolume * 0.6,
    }));
    playSound(SoundEffect.BUTTON_CLICK);
  };

  const handleCategoryVolumeChange = (category: keyof typeof categoryVolumes, value: number) => {
    setCategoryVolumes(prev => ({
      ...prev,
      [category]: value
    }));
    playSound(SoundEffect.BUTTON_CLICK);
  };

  const handleToggleSound = () => {
    toggleSound();
    if (!isSoundEnabled) {
      playSound(SoundEffect.BUTTON_CLICK);
    }
  };

  const applyPreset = (preset: VolumePreset) => {
    setCategoryVolumes({
      ui: preset.ui,
      game: preset.game,
      ambient: preset.ambient,
    });
    setVolume(preset.game); // 使用游戏音量作为主音量
    playSound(SoundEffect.BUTTON_CLICK);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-4 px-4 py-2 bg-gray-800 rounded-lg">
        <button
          onClick={handleToggleSound}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          aria-label={isSoundEnabled ? '关闭声音' : '开启声音'}
        >
          {isSoundEnabled ? (
            <Volume2 className="w-6 h-6 text-cyan-400" />
          ) : (
            <VolumeX className="w-6 h-6 text-gray-400" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          disabled={!isSoundEnabled}
        />
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          aria-label="高级设置"
        >
          <Settings className={`w-5 h-5 ${showAdvanced ? 'text-cyan-400' : 'text-gray-400'}`} />
        </button>
      </div>

      {showAdvanced && isSoundEnabled && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg p-4 space-y-4 z-50">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-cyan-400">音量设置</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">界面音效</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={categoryVolumes.ui}
                  onChange={(e) => handleCategoryVolumeChange('ui', parseFloat(e.target.value))}
                  className="w-32 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">游戏音效</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={categoryVolumes.game}
                  onChange={(e) => handleCategoryVolumeChange('game', parseFloat(e.target.value))}
                  className="w-32 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">环境音效</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={categoryVolumes.ambient}
                  onChange={(e) => handleCategoryVolumeChange('ambient', parseFloat(e.target.value))}
                  className="w-32 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-cyan-400">音量预设</h3>
            <div className="grid grid-cols-2 gap-2">
              {volumePresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundControl; 