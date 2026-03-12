import React, { useState, useMemo } from 'react';
import { Clock, Users, User, Calendar, ShieldCheck, Star, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactModal from '../components/ContactModal';
import { useSupabaseQuery } from '../hooks/use-supabase-query';
import { fetchCourses, type Course, type SiteSettings } from '../services/api';
import { useSiteSettings } from '../contexts/site-settings-context';

// NOTE: 硬编码 fallback 数据
const FALLBACK_COURSES: Course[] = [
  { id: 1, slug: 'tulanduo-bachelor', category: 'standard', name: '"图兰朵"本科预科', tag: null, duration: '7个月 / 232课时', format: '精品小班', content: '综合艺术创作基础、纯艺技能、入学考前强化', target: '计划留意高中生', sort_order: 1 },
  { id: 2, slug: 'tulanduo-master', category: 'standard', name: '"图兰朵"研究生预科', tag: null, duration: '7个月 / 192课时', format: '1对1 / 小班', content: '高级作品集辅导、学术论文指导、策展方案练习', target: '大四在读/本科毕业生', sort_order: 2 },
  { id: 3, slug: 'marcopoloh-design', category: 'standard', name: '"马可波罗"设计预科', tag: null, duration: '7个月 / 222课时', format: '精品小班', content: '设计思维建模、软件技能、跨学科设计工作坊', target: '设计专业申请者', sort_order: 3 },
  { id: 4, slug: 'art-history', category: 'standard', name: '艺术史课程', tag: null, duration: '7个月 / 112课时', format: '精品小班', content: '艺术史论通识、作品深度分析、考试应答策略', target: '跨专业及理论薄弱者', sort_order: 4 },
  { id: 5, slug: 'fomei-guarantee', category: 'guarantee', name: '佛美保障预科', tag: 'Premium', duration: '9个月', format: '全程深度保障', content: '针对佛罗伦萨美院定向培养、大师讲座、免试直通协议', target: '目标佛美学生', sort_order: 1 },
  { id: 6, slug: 'four-academies-guarantee', category: 'guarantee', name: '四大美院保障预科', tag: 'Elite', duration: '9个月', format: '全明星导师团队', content: '米兰、波美、罗马、都灵美院保录计划、多维度背景提升', target: '高阶美院冲刺生', sort_order: 2 },
];

export default function CourseFoundation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: allCourses } = useSupabaseQuery(fetchCourses, FALLBACK_COURSES);

  const standardCourses = useMemo(() => allCourses.filter(c => c.category === 'standard'), [allCourses]);
  const guaranteeCourses = useMemo(() => allCourses.filter(c => c.category === 'guarantee'), [allCourses]);

  const settings = useSiteSettings() as SiteSettings;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">

        <Link to="/courses" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-12 transition-colors font-medium">
          <ArrowLeft size={20} /> 返回课程体系
        </Link>

        {/* Hero Section */}
        <section className="mb-20">
          <div className="flex flex-col items-start">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4">{settings.foundation_hero_tag}</span>
              <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
                {settings.foundation_hero_title_1}<br /><span className="text-primary">{settings.foundation_hero_title_2}</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md leading-relaxed whitespace-pre-wrap">
                {settings.foundation_hero_description}
              </p>
            </div>
          </div>
        </section>

        {/* Programs List */}
        <div className="space-y-32">
          {/* A. 标准课程 Standard Programs */}
          <section id="standard">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-3xl font-black">标准课程</h3>
              <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800"></div>
              <span className="text-slate-400 font-mono">/ 01</span>
            </div>
            <div className="grid grid-cols-1 gap-1 border-t border-slate-900 dark:border-white">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 py-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <div className="col-span-3">课程名称</div>
                <div className="col-span-2">时长/课时</div>
                <div className="col-span-2">授课形式</div>
                <div className="col-span-3">核心内容</div>
                <div className="col-span-2 text-right">针对人群</div>
              </div>

              {/* 动态渲染标准课程 */}
              {standardCourses.map((course) => (
                <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 items-center border-b border-slate-100 dark:border-slate-800 hover:bg-primary/[0.02] transition-colors group">
                  <div className="col-span-3">
                    <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{course.name}</h4>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Clock className="text-primary w-4 h-4" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Users className="text-slate-400 w-4 h-4" />
                    <span className="text-sm">{course.format}</span>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm text-slate-500 leading-snug">{course.content}</p>
                  </div>
                  <div className="col-span-2 text-left md:text-right">
                    <span className="inline-block px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-[10px] font-bold">{course.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* B. 保障课程 Guarantee Programs */}
          <section id="guarantee">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-3xl font-black">保障课程</h3>
              <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800"></div>
              <span className="text-slate-400 font-mono">/ 02</span>
            </div>
            <div className="grid grid-cols-1 gap-1 border-t border-slate-900 dark:border-white">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 py-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <div className="col-span-3">课程名称</div>
                <div className="col-span-2">时长/课时</div>
                <div className="col-span-2">授课形式</div>
                <div className="col-span-3">核心内容</div>
                <div className="col-span-2 text-right">针对人群</div>
              </div>

              {/* 动态渲染保障课程 */}
              {guaranteeCourses.map((course) => (
                <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-10 items-center border-b border-slate-100 dark:border-slate-800 hover:bg-primary/[0.05] transition-all group bg-primary/[0.02]">
                  <div className="col-span-3">
                    {course.tag && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-primary text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">{course.tag}</span>
                      </div>
                    )}
                    <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{course.name}</h4>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Calendar className="text-primary w-4 h-4" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <ShieldCheck className="text-slate-400 w-4 h-4" />
                    <span className="text-sm">{course.format}</span>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm text-slate-500 leading-snug">{course.content}</p>
                  </div>
                  <div className="col-span-2 text-left md:text-right">
                    <span className="inline-block px-3 py-1 rounded border border-primary/30 text-[10px] font-bold text-primary">{course.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CTA Section */}
        < section className="mt-40 bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 md:p-16 text-white text-center relative overflow-hidden" >
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full"></div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10">开启你的艺术之旅</h2>
          <p className="text-slate-400 mb-10 text-lg relative z-10">即刻预约顾问进行一对一背景评估，定制专属留学方案。</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-background-dark px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform"
            >
              在线评估
            </button>
          </div>
        </section >
      </main >
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div >
  );
}
