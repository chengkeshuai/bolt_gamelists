import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'zh';

type TranslationKey = 
  | 'nav.home'
  | 'nav.games'
  | 'nav.features'
  | 'nav.pricing'
  | 'nav.faq'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.cta'
  | 'features.title'
  | 'features.subtitle'
  | 'game.rank'
  | 'game.playNow';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.games': 'Games',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'hero.title': 'Play Awesome Games Instantly',
    'hero.subtitle': 'Access hundreds of HTML5 games directly in your browser',
    'hero.cta': 'Start Playing Now',
    'features.title': 'Why Choose Us',
    'features.subtitle': 'Experience gaming like never before',
    'game.rank': 'Rank',
    'game.playNow': 'Play Now',
    // Add more translations as needed
  },
  zh: {
    'nav.home': '首页',
    'nav.games': '游戏',
    'nav.features': '特性',
    'nav.pricing': '价格',
    'nav.faq': '常见问题',
    'hero.title': '即刻畅玩精彩游戏',
    'hero.subtitle': '直接在浏览器中访问数百款HTML5游戏',
    'hero.cta': '立即开始',
    'features.title': '为什么选择我们',
    'features.subtitle': '体验前所未有的游戏乐趣',
    'game.rank': '排名',
    'game.playNow': '立即游戏',
    // Add more translations as needed
  }
} as const;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}