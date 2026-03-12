import React from 'react';
import { Palette, GraduationCap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../contexts/site-settings-context';
import { useSupabaseQuery } from '../hooks/use-supabase-query';
import { fetchCourseOverviews, type SiteSettings, type CourseOverview } from '../services/api';

// 图标映射
const IconMap: Record<string, any> = {
  Palette,
  GraduationCap
};

const FALLBACK_OVERVIEWS: CourseOverview[] = [
  {
    id: 1,
    title: '艺术预科基础课程',
    description: '专为零基础或基础薄弱的学生设计，系统建立西方艺术思维体系与基础技能。涵盖素描、色彩、艺术史及创意思维训练。',
    highlights: ["6-8个月密集训练", "意大利语艺术词汇强化", "工坊式沉浸教学"],
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX2o-3Zwknhnc3FI0d_ODRa2ZIYBx3Xao1MRakoBthiEGxcmqWzko7lNm_9ZivJ_Y6K11gREKYqWysm-52RRxDrNMO3ALel2uOrOeumeMQV4wIg2hF-dN7y08xHSv6JnimLa028Gp0e9KwFliD6VZzeCJx8NpOQ5ggHmEYf_ZDJwBVI_1lwBFOj29L_OBwwzF9CCZJkjPD4ig-oDmYXWyoTJYhuUEPuMKFrZz0O0VYIlNlVXInfYuK5ycMXRfkiXBxdSHG9ZqxSvCp',
    link: '/courses/foundation',
    sort_order: 1
  },
  {
    id: 2,
    title: '转学/升学/毕业辅导',
    description: '针对目标院校的具体要求，由资深导师一对一指导，完成高质量的作品集创作，并进行入学面试的全面准备。',
    highlights: ["3-6个月个性化指导", "个人艺术项目深度开发", "教授模拟面试与答辩"],
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcrlHoaQVhuR1sZUrMNYRzToTbwxbMts1qxtma1i_g9q85WNXgSZdDvvMeU7dY1_Iew52-wB_xXCmPH_FI5F5fskSPuTUq7ccHFOoa73SkMz68fU2c3y7pt0nKyjiN92YqOJcs1FhcfXEsPUf-48gyBH4g9GF0iQZqdNHhlKaObZkMuLpo6DXF23JcPCMO1N8qlHfnFlVFTnJT05M3y0K7NEjDrmu2d7mS0LWmNRMwN2Zm-IUzW6p5f0EEBrmevas2E8-DbmMO7MA4',
    link: '/courses/coaching',
    sort_order: 2
  }
];

export default function Courses() {
  const settings = useSiteSettings() as SiteSettings;
  const { data: overviews, isLoading } = useSupabaseQuery(fetchCourseOverviews, FALLBACK_OVERVIEWS);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">{settings.courses_tag}</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">{settings.courses_title}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto whitespace-pre-wrap">
            {settings.courses_description}
          </p>
        </div>

        <div className="space-y-12">
          {overviews.map((item, index) => {
            const Icon = index === 0 ? Palette : GraduationCap;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon size={32} />
                  </div>
                  <h2 className="text-3xl font-bold">{item.title}</h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {item.description}
                  </p>
                  <ul className="space-y-3">
                    {item.highlights?.map((h, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                        <CheckCircle size={20} className="text-primary" /> {h}
                      </li>
                    ))}
                  </ul>
                  <Link to={item.link} className="inline-block mt-4 px-8 py-3 bg-background-dark text-white rounded-full font-medium hover:bg-primary hover:text-black transition-colors">
                    了解详情
                  </Link>
                </div>
                <div
                  className={`flex-1 w-full h-[400px] rounded-2xl bg-slate-100 bg-cover bg-center transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  style={{ backgroundImage: isLoading ? 'none' : `url('${item.image_url}')` }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
