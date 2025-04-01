import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, Search, ListChecks } from 'lucide-react';

const steps = [
  {
    icon: Search,
    titleEn: 'Discover Games',
    titleZh: '发现游戏',
    descriptionEn: 'Browse our extensive list of HTML5 games',
    descriptionZh: '浏览我们丰富的HTML5游戏列表'
  },
  {
    icon: Play,
    titleEn: 'Play Instantly',
    titleZh: '即时畅玩',
    descriptionEn: 'Play directly in your browser without any downloads',
    descriptionZh: '无需下载，直接在浏览器中畅玩'
  },
  {
    icon: ListChecks,
    titleEn: 'Add to Favorites',
    titleZh: '加入收藏',
    descriptionEn: 'Save your favorite games for quick access',
    descriptionZh: '保存您喜欢的游戏，以便快速访问'
  }
];

export default function HowItWorks() {
  const { language } = useLanguage();

  return (
    <section id="how-it-works" className="py-20 bg-black/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-4">
            {language === 'en' ? 'How It Works' : '如何运作'}
          </h2>
          <p className="text-gray-300 text-lg">
            {language === 'en' ? 'Get started with our platform in just a few simple steps' : '只需几个简单的步骤即可开始使用我们的平台'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center p-6 rounded-lg bg-gradient-to-r from-gray-900 to-black border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-3 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                  {language === 'en' ? step.titleEn : step.titleZh}
                </h3>
                <p className="text-gray-400">
                  {language === 'en' ? step.descriptionEn : step.descriptionZh}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}