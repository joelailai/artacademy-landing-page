import React from 'react';
import { ArrowRight, GraduationCap, MapPin } from 'lucide-react';
import { useSupabaseQuery } from '../hooks/use-supabase-query';
import { fetchCases, type CaseItem } from '../services/api';

// NOTE: 硬编码数据作为 Supabase 不可用时的 fallback
const FALLBACK_CASES: CaseItem[] = [
  { id: 1, name: '张同学 (Y. Zhang)', school: '佛罗伦萨美术学院', major: '绘画 (Pittura)', image_url: 'https://picsum.photos/seed/art1/800/600?blur=2', tags: ['本科直录', '零基础跨考'], sort_order: 1 },
  { id: 2, name: '李同学 (L. Li)', school: '米兰理工大学', major: '室内设计 (Interior Design)', image_url: 'https://picsum.photos/seed/art2/800/600?blur=2', tags: ['研究生录取', '奖学金获得者'], sort_order: 2 },
  { id: 3, name: '王同学 (W. Wang)', school: '罗马美术学院', major: '雕塑 (Scultura)', image_url: 'https://picsum.photos/seed/art3/800/600?blur=2', tags: ['图兰朵计划', '高分录取'], sort_order: 3 },
  { id: 4, name: '赵同学 (Z. Zhao)', school: '马兰欧尼时装学院', major: '服装设计 (Fashion Design)', image_url: 'https://picsum.photos/seed/art4/800/600?blur=2', tags: ['跨专业申请', '名企实习推荐'], sort_order: 4 },
  { id: 5, name: '陈同学 (C. Chen)', school: '博洛尼亚美术学院', major: '插画与漫画 (Fumetto e Illustrazione)', image_url: 'https://picsum.photos/seed/art5/800/600?blur=2', tags: ['本科直录', '独立出版物'], sort_order: 5 },
  { id: 6, name: '刘同学 (L. Liu)', school: '都灵美术学院', major: "企业艺术设计 (Progettazione Artistica per l'Impresa)", image_url: 'https://picsum.photos/seed/art6/800/600?blur=2', tags: ['研究生录取', '作品集满分'], sort_order: 6 },
  { id: 7, name: '周同学 (Z. Zhou)', school: '威尼斯美术学院', major: "新媒体艺术 (Nuove Tecnologie dell'Arte)", image_url: 'https://picsum.photos/seed/art7/800/600?blur=2', tags: ['马可波罗计划', '科技艺术跨界'], sort_order: 7 },
  { id: 8, name: '吴同学 (W. Wu)', school: '那不勒斯美术学院', major: '舞台美术设计 (Scenografia)', image_url: 'https://picsum.photos/seed/art8/800/600?blur=2', tags: ['本科直录', '戏剧节参展'], sort_order: 8 },
];

export default function Cases() {
  const { data: cases, isLoading } = useSupabaseQuery(fetchCases, FALLBACK_CASES);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">Success Stories</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">优秀案例</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            见证我们的学生如何通过系统的作品集辅导，成功叩开意大利顶尖艺术院校的大门。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {cases.map((item) => (
            <a
              key={item.id}
              href={item.link_url || '#'}
              target={item.link_url ? "_blank" : undefined}
              rel={item.link_url ? "noopener noreferrer" : undefined}
              onClick={(e) => { if (!item.link_url) e.preventDefault(); }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer block"
            >
              <div className="relative h-[300px] overflow-hidden">
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  style={{ backgroundImage: isLoading ? 'none' : `url('${item.image_url}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{item.name}</h3>
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                    <ArrowRight size={18} />
                  </div>
                </div>
                <div className="space-y-3 mt-auto">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin size={18} className="text-primary shrink-0" />
                    <span className="font-medium">{item.school}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <GraduationCap size={18} className="text-primary shrink-0" />
                    <span className="font-medium">{item.major}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
