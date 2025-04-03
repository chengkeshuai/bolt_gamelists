export enum SoundEffect {
  // 通用音效
  BUTTON_CLICK = 'button-click',
  GAME_START = 'game-start',
  GAME_OVER = 'game-over',
  
  // 游戏进行中的音效
  COLLISION = 'collision',
  POINT_SCORED = 'point-scored',
  LEVEL_UP = 'level-up',
  POWER_UP = 'power-up',
  
  // 新增游戏音效
  MOVE = 'move',                   // 通用移动音效
  TETRIS_MOVE = 'tetris-move',     // 俄罗斯方块移动音效
  MERGE = 'merge',                 // 方块合并音效（2048）
  BLOCK_ROTATE = 'block-rotate',   // 方块旋转音效（俄罗斯方块）
  BLOCK_DROP = 'block-drop',       // 方块落地音效
  PADDLE_HIT = 'paddle-hit',       // 挡板击球音效（乒乓、打砖块）
  WALL_HIT = 'wall-hit',           // 墙壁碰撞音效
  SNAKE_EAT = 'snake-eat',         // 贪吃蛇吃到食物
  SNAKE_DIE = 'snake-die',         // 贪吃蛇死亡
  BONUS = 'bonus',                 // 获得奖励
  WARNING = 'warning',             // 警告音效
  ACHIEVEMENT = 'achievement',      // 成就达成
}

export interface SoundConfig {
  volume?: number;
  loop?: boolean;
  category?: 'ui' | 'game' | 'ambient';
}

const defaultConfig: SoundConfig = {
  volume: 0.5,
  loop: false,
  category: 'game'
};

export const soundConfigs: Record<SoundEffect, SoundConfig> = {
  // 通用音效
  [SoundEffect.BUTTON_CLICK]: { volume: 0.2, category: 'ui' },
  [SoundEffect.GAME_START]: { volume: 0.3, category: 'ui' },
  [SoundEffect.GAME_OVER]: { volume: 0.3, category: 'game' },
  
  // 游戏进行中的音效
  [SoundEffect.COLLISION]: { volume: 0.2, category: 'game' },
  [SoundEffect.POINT_SCORED]: { volume: 0.2, category: 'game' },
  [SoundEffect.LEVEL_UP]: { volume: 0.3, category: 'game' },
  [SoundEffect.POWER_UP]: { volume: 0.2, category: 'game' },
  
  // 新增游戏音效
  [SoundEffect.MOVE]: { volume: 0.15, category: 'game' },
  [SoundEffect.TETRIS_MOVE]: { volume: 0.1, category: 'game' },
  [SoundEffect.MERGE]: { volume: 0.2, category: 'game' },
  [SoundEffect.BLOCK_ROTATE]: { volume: 0.15, category: 'game' },
  [SoundEffect.BLOCK_DROP]: { volume: 0.2, category: 'game' },
  [SoundEffect.PADDLE_HIT]: { volume: 0.2, category: 'game' },
  [SoundEffect.WALL_HIT]: { volume: 0.15, category: 'game' },
  [SoundEffect.SNAKE_EAT]: { volume: 0.2, category: 'game' },
  [SoundEffect.SNAKE_DIE]: { volume: 0.25, category: 'game' },
  [SoundEffect.BONUS]: { volume: 0.25, category: 'game' },
  [SoundEffect.WARNING]: { volume: 0.3, category: 'game' },
  [SoundEffect.ACHIEVEMENT]: { volume: 0.25, category: 'ui' },
};

export const getSoundConfig = (effect: SoundEffect): SoundConfig => ({
  ...defaultConfig,
  ...soundConfigs[effect],
}); 