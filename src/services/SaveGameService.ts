export interface GameSave {
  gameId: number;
  score: number;
  level: number;
  timestamp: number;
  data: any;
}

export interface GameSaveSlot {
  id: number;
  name: string;
  save: GameSave;
}

export class SaveGameService {
  private readonly SAVE_KEY_PREFIX = 'game_save_';
  private readonly MAX_SLOTS = 3;

  // 保存游戏
  public saveGame(gameId: number, slot: number, data: Partial<GameSave>): void {
    if (slot < 1 || slot > this.MAX_SLOTS) {
      throw new Error(`存档槽位必须在1-${this.MAX_SLOTS}之间`);
    }

    const save: GameSave = {
      gameId,
      score: data.score || 0,
      level: data.level || 1,
      timestamp: Date.now(),
      data: data.data || {}
    };

    localStorage.setItem(
      this.getSaveKey(gameId, slot),
      JSON.stringify(save)
    );
  }

  // 加载游戏存档
  public loadGame(gameId: number, slot: number): GameSave | null {
    if (slot < 1 || slot > this.MAX_SLOTS) {
      throw new Error(`存档槽位必须在1-${this.MAX_SLOTS}之间`);
    }

    const saveData = localStorage.getItem(this.getSaveKey(gameId, slot));
    if (!saveData) return null;

    try {
      return JSON.parse(saveData) as GameSave;
    } catch {
      return null;
    }
  }

  // 获取游戏所有存档
  public getAllSaves(gameId: number): GameSaveSlot[] {
    const saves: GameSaveSlot[] = [];
    
    for (let slot = 1; slot <= this.MAX_SLOTS; slot++) {
      const save = this.loadGame(gameId, slot);
      if (save) {
        saves.push({
          id: slot,
          name: `存档 ${slot}`,
          save
        });
      }
    }

    return saves;
  }

  // 删除存档
  public deleteSave(gameId: number, slot: number): void {
    if (slot < 1 || slot > this.MAX_SLOTS) {
      throw new Error(`存档槽位必须在1-${this.MAX_SLOTS}之间`);
    }

    localStorage.removeItem(this.getSaveKey(gameId, slot));
  }

  // 检查存档是否存在
  public hasSave(gameId: number, slot: number): boolean {
    return localStorage.getItem(this.getSaveKey(gameId, slot)) !== null;
  }

  // 获取存档键名
  private getSaveKey(gameId: number, slot: number): string {
    return `${this.SAVE_KEY_PREFIX}${gameId}_${slot}`;
  }
}

export const saveGameService = new SaveGameService(); 