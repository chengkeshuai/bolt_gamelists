import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Github, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const { language } = useLanguage();

  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-cyan-500/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-4">
              GameLists.org
            </h3>
            <p className="text-gray-400">
              {language === 'en' 
                ? 'Your destination for free HTML5 games.' 
                : '您的免费HTML5游戏目的地。'}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">
              {language === 'en' ? 'Quick Links' : '快速链接'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#games" className="text-gray-400 hover:text-cyan-400 transition">
                  {language === 'en' ? 'Games' : '游戏'}
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-cyan-400 transition">
                  {language === 'en' ? 'Features' : '特性'}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-cyan-400 transition">
                  {language === 'en' ? 'Pricing' : '价格'}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">
              {language === 'en' ? 'Support' : '支持'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="text-gray-400 hover:text-cyan-400 transition">
                  {language === 'en' ? 'FAQ' : '常见问题'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
                  {language === 'en' ? 'Contact Us' : '联系我们'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
                  {language === 'en' ? 'Privacy Policy' : '隐私政策'}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">
              {language === 'en' ? 'Follow Us' : '关注我们'}
            </h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {year} GameLists.org. {language === 'en' ? 'All rights reserved.' : '保留所有权利。'}
          </p>
        </div>
      </div>
    </footer>
  );
}
