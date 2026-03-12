import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, GraduationCap, Palette, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactModal from '../components/ContactModal';
import { useSiteSettings } from '../contexts/site-settings-context';
import { useSupabaseQuery } from '../hooks/use-supabase-query';
import { fetchCoachingLevels, fetchCoachingServices, type SiteSettings, type CoachingLevel, type CoachingService } from '../services/api';

// 图标映射
const IconMap: Record<string, any> = {
  GraduationCap,
  Palette,
  Building2
};

const FALLBACK_LEVELS: CoachingLevel[] = [
  { id: 1, level_num: '01', title: '基础辅导课程', features: ["20个精品课时", "1对1 深度指导", "锁定1所目标美院", "1场全仿真模拟面试"], sort_order: 1 },
  { id: 2, level_num: '02', title: '标准进阶课程', features: ["40个精品课时", "1对1 专业陪跑", "针对1所核心美院", "2场全仿真模拟面试", "包含排版与画册制作指导"], sort_order: 2 },
  { id: 3, level_num: '03', title: '全能进阶课程', features: ["60个精品课时", "1对1 资深导师", "冲刺3所目标美院", "2场高强度模拟面试", "文案润色 / 外教语言指导"], sort_order: 3 }
];

const FALLBACK_SERVICES: CoachingService[] = [
  { id: 1, title: '毕业辅导', description: '针对论文开题、作品集整合及最终答辩的全方位技术性指导。', icon_name: 'GraduationCap', sort_order: 1 },
  { id: 2, title: '专业实践', description: '对接意大利当地艺术家工作室，参与真实展览策划与艺术项目。', icon_name: 'Palette', sort_order: 2 },
  { id: 3, title: '工作室空间', description: '提供独立创作空间与专业摄影棚，助力高质量作品集的输出与拍摄。', icon_name: 'Building2', sort_order: 3 }
];

export default function CourseCoaching() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const settings = useSiteSettings() as SiteSettings;
  const { data: levels } = useSupabaseQuery(fetchCoachingLevels, FALLBACK_LEVELS);
  const { data: services, isLoading: isLoadingServices } = useSupabaseQuery(fetchCoachingServices, FALLBACK_SERVICES);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        <Link to="/courses" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-12 transition-colors font-medium">
          <ArrowLeft size={20} /> 返回课程体系
        </Link>

        {/* Hero Section */}
        <section className="grid grid-cols-12 gap-6 mb-24">
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-end min-h-[400px]">
            <span className="text-primary font-bold tracking-widest uppercase mb-4 block">{settings.coaching_hero_tag}</span>
            <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
              {settings.coaching_hero_title_1}<br />
              <span className="text-primary">{settings.coaching_hero_title_2}</span>
            </h2>
            <p className="max-w-xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
              {settings.coaching_hero_description}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
            <div
              className="bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden aspect-[3/4] relative group bg-cover bg-center"
              style={{ backgroundImage: `url('${settings.coaching_hero_image}')` }}
            >
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-black px-6 py-2 rounded-full font-bold">了解更多</span>
              </div>
            </div>
          </div>
        </section>

        {/* Course Grid: Core Steps */}
        <section className="mb-32">
          <div className="flex items-baseline justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-12">
            <h3 className="text-2xl font-bold italic uppercase tracking-tighter">01 课程阶梯 / Core Levels</h3>
            <span className="text-sm font-medium text-slate-400">SELECT YOUR PATH</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {levels.map((level) => (
              <div key={level.id} className="border-l border-slate-200 dark:border-slate-800 pl-8 py-4 hover:border-primary transition-colors group">
                <span className="text-5xl font-black text-slate-200 dark:text-slate-800 group-hover:text-primary transition-colors block mb-6">{level.level_num}</span>
                <h4 className="text-xl font-bold mb-4">{level.title}</h4>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                  {level.features?.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-primary w-4 h-4" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-8 w-full py-3 rounded-lg border border-slate-900 dark:border-slate-100 font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-slate-100 dark:hover:text-black transition-all"
                >
                  立即预约
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-12">
            <h3 className="text-2xl font-bold italic uppercase tracking-tighter">02 增益服务 / Extras</h3>
            <span className="text-sm font-medium text-slate-400">ENHANCE YOUR JOURNEY</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 transition-opacity duration-300">
            {services.map((service) => {
              const Icon = IconMap[service.icon_name] || GraduationCap;
              return (
                <div key={service.id} className="bg-white dark:bg-slate-900 p-10 flex flex-col items-center text-center border border-slate-100 dark:border-slate-800">
                  <Icon className="w-10 h-10 mb-6 text-primary" />
                  <h5 className="text-lg font-bold mb-3 tracking-tight">{service.title}</h5>
                  <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-wrap">{service.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl bg-slate-900 text-white p-12 overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 lg:col-span-7">
              <h4 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
                {settings.coaching_cta_title_1}<br />
                <span className="text-primary italic">{settings.coaching_cta_title_2}</span>之旅了吗？
              </h4>
              <p className="text-slate-400 max-w-md whitespace-pre-wrap">{settings.coaching_cta_description}</p>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center mt-8 lg:mt-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-black font-black py-4 px-8 rounded-lg uppercase tracking-widest hover:brightness-110 transition-all w-full md:w-auto"
              >
                {settings.coaching_cta_button}
              </button>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 border-[40px] border-primary/10 rounded-full"></div>
        </section>
      </main>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
