import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star } from 'lucide-react';

const testimonials = [
  {
    nameEn: 'Sarah Johnson',
    nameZh: '莎拉·约翰逊',
    roleEn: 'Casual Gamer',
    roleZh: '休闲玩家',
    textEn: 'The best HTML5 gaming platform I\'ve ever used. So many great games!',
    textZh: '我用过的最好的HTML5游戏平台。这么多精彩的游戏！',
    rating: 5
  },
  {
    nameEn: 'Mike Chen',
    nameZh: '陈明',
    roleEn: 'Pro Gamer',
    roleZh: '职业玩家',
    textEn: 'Lightning fast loading times and smooth gameplay. Highly recommended!',
    textZh: '加载速度快，游戏流畅。强烈推荐！',
    rating: 5
  },
  {
    nameEn: 'Emily Wang',
    nameZh: '王艾米',
    roleEn: 'Student',
    roleZh: '学生',
    textEn: 'Perfect for quick gaming sessions during breaks. No installations needed!',
    textZh: '非常适合在休息时间快速玩游戏。无需安装！',
    rating: 5
  }
];

export default function Testimonials() {
  const { language } = useLanguage();

  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-4">
            {language === 'en' ? 'What Our Users Say' : '用户评价'}
          </h2>
          <p className="text-gray-300 text-lg">
            {language === 'en' ? 'Hear from our community of gamers' : '听听我们游戏社区的声音'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="feature-wrapper"
            >
              <div className="h-[280px] p-6 rounded-lg bg-gradient-to-r from-gray-900 to-black border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-feature group flex flex-col">
                <div className="flex mb-4 group-hover:scale-105 transition-transform duration-300">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 flex-grow group-hover:text-gray-200 transition-colors duration-300">
                  {language === 'en' ? testimonial.textEn : testimonial.textZh}
                </p>
                <div className="flex items-center mt-auto">
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {language === 'en' ? testimonial.nameEn : testimonial.nameZh}
                    </h4>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      {language === 'en' ? testimonial.roleEn : testimonial.roleZh}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}