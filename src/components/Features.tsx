import React from 'react';
import { Gamepad2, Zap, Globe2, Shield, Sparkles, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const features = [
  {
    icon: Gamepad2,
    titleEn: 'Instant Play',
    titleZh: '即时游戏',
    descriptionEn: 'Play games directly in your browser without downloads or installations',
    descriptionZh: '无需下载安装，直接在浏览器中畅玩游戏'
  },
  {
    icon: Zap,
    titleEn: 'Lightning Fast',
    titleZh: '极速加载',
    descriptionEn: 'Optimized loading times for seamless gaming experience',
    descriptionZh: '优化加载时间，提供流畅的游戏体验'
  },
  {
    icon: Globe2,
    titleEn: 'Cross Platform',
    titleZh: '跨平台支持',
    descriptionEn: 'Play on any device with a modern web browser',
    descriptionZh: '支持所有现代浏览器，随时随地畅玩'
  },
  {
    icon: Shield,
    titleEn: 'Secure Gaming',
    titleZh: '安全保障',
    descriptionEn: 'All games are vetted and safe to play',
    descriptionZh: '所有游戏经过严格审核，确保安全'
  },
  {
    icon: Sparkles,
    titleEn: 'HD Quality',
    titleZh: '高清画质',
    descriptionEn: 'Crystal clear graphics and smooth animations',
    descriptionZh: '清晰的画面和流畅的动画效果'
  },
  {
    icon: Clock,
    titleEn: 'Regular Updates',
    titleZh: '定期更新',
    descriptionEn: 'New games added weekly',
    descriptionZh: '每周更新新游戏'
  }
];

export default function Features() {
  const { language } = useLanguage();

  return (
    <section id="features" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="p-6 rounded-lg bg-gradient-to-r from-gray-900 to-black border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-2 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                  {language === 'en' ? feature.titleEn : feature.titleZh}
                </h3>
                <p className="text-gray-400">
                  {language === 'en' ? feature.descriptionEn : feature.descriptionZh}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}