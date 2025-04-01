import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/20"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            {t('hero.subtitle')}
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition shadow-lg shadow-purple-500/20">
            {t('hero.cta')}
          </button>
        </div>
      </div>
    </section>
  );
}