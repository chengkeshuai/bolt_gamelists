import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    questionEn: 'Are all games free to play?',
    questionZh: '所有游戏都是免费的吗？',
    answerEn: 'Yes, all games on our platform are completely free to play.',
    answerZh: '是的，我们平台上的所有游戏都是完全免费的。'
  },
  {
    questionEn: 'Do I need to create an account?',
    questionZh: '我需要创建账户吗？',
    answerEn: 'While you can play games without an account, creating one allows you to save favorites and track progress.',
    answerZh: '虽然无需账户也可以玩游戏，但创建账户可以保存收藏并跟踪进度。'
  },
  {
    questionEn: 'What devices are supported?',
    questionZh: '支持哪些设备？',
    answerEn: 'Any device with a modern web browser can access our platform.',
    answerZh: '任何带有现代网络浏览器的设备都可以访问我们的平台。'
  },
  {
    questionEn: 'How often are new games added?',
    questionZh: '多久添加新游戏？',
    answerEn: 'We add new games weekly to keep our collection fresh and exciting.',
    answerZh: '我们每周都会添加新游戏，保持游戏库的新鲜感和趣味性。'
  }
];

export default function FAQ() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-4">
            {language === 'en' ? 'Frequently Asked Questions' : '常见问题'}
          </h2>
          <p className="text-gray-300 text-lg">
            {language === 'en' ? 'Find answers to common questions about our platform' : '查找关于我们平台的常见问题解答'}
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="mb-4 rounded-lg bg-gradient-to-r from-gray-900 to-black border border-cyan-500/20 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-white">
                  {language === 'en' ? faq.questionEn : faq.questionZh}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-cyan-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-cyan-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-300">
                  {language === 'en' ? faq.answerEn : faq.answerZh}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}