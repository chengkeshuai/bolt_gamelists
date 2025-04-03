import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { SoundEffect, getSoundConfig } from '../services/SoundService';

interface CategoryVolumes {
  ui: number;
  game: number;
  ambient: number;
}

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playSound: (effect: SoundEffect) => void;
  volume: number;
  setVolume: (value: number) => void;
  categoryVolumes: CategoryVolumes;
  setCategoryVolumes: (volumes: CategoryVolumes) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const VOLUME_STORAGE_KEY = 'sound_settings';

interface StoredSoundSettings {
  isSoundEnabled: boolean;
  volume: number;
  categoryVolumes: CategoryVolumes;
}

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 从本地存储加载音效设置
  const loadSoundSettings = (): StoredSoundSettings => {
    const stored = localStorage.getItem(VOLUME_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      isSoundEnabled: true,
      volume: 0.5,
      categoryVolumes: {
        ui: 0.5,
        game: 0.5,
        ambient: 0.3,
      }
    };
  };

  const [isSoundEnabled, setIsSoundEnabled] = useState(() => loadSoundSettings().isSoundEnabled);
  const [volume, setVolume] = useState(() => loadSoundSettings().volume);
  const [categoryVolumes, setCategoryVolumes] = useState<CategoryVolumes>(() => loadSoundSettings().categoryVolumes);
  const [audioCache] = useState<Map<string, HTMLAudioElement>>(new Map());

  // 保存音效设置到本地存储
  useEffect(() => {
    const settings: StoredSoundSettings = {
      isSoundEnabled,
      volume,
      categoryVolumes
    };
    localStorage.setItem(VOLUME_STORAGE_KEY, JSON.stringify(settings));
  }, [isSoundEnabled, volume, categoryVolumes]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => !prev);
  }, []);

  const playSound = useCallback((effect: SoundEffect) => {
    if (!isSoundEnabled) return;

    const config = getSoundConfig(effect);
    const category = config.category || 'game';
    const categoryVolume = categoryVolumes[category];

    let audio = audioCache.get(effect);
    if (!audio) {
      audio = new Audio(`/sounds/${effect}.mp3`);
      audioCache.set(effect, audio);
    }

    // 应用音量设置
    const effectiveVolume = volume * categoryVolume * (config.volume || 1);
    audio.volume = Math.min(effectiveVolume, 1);
    
    if (config.loop) {
      audio.loop = true;
    }

    // 如果音频正在播放，重置并重新播放
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.warn(`Failed to play sound: ${effect}`, error);
    });
  }, [isSoundEnabled, volume, categoryVolumes, audioCache]);

  return (
    <SoundContext.Provider value={{
      isSoundEnabled,
      toggleSound,
      playSound,
      volume,
      setVolume,
      categoryVolumes,
      setCategoryVolumes
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}; 