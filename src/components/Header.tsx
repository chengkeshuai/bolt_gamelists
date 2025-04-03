import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SoundControl from './SoundControl';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-cyan-500/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text cursor-pointer"
            onClick={handleHomeClick}
          >
            GameLists.org
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-cyan-400 transition"
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/games" 
              className="text-gray-300 hover:text-cyan-400 transition"
            >
              {t('nav.games')}
            </Link>
            <Link 
              to="/features" 
              className="text-gray-300 hover:text-cyan-400 transition"
            >
              {t('nav.features')}
            </Link>
            <SoundControl />
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition"
            >
              <Globe size={20} />
              <span>{language === 'en' ? '中文' : 'English'}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}