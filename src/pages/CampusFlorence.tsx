import React from 'react';
import { ArrowLeft, MapPin, CheckCircle, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSupabaseQuery } from '../hooks/use-supabase-query';
import { fetchCampus, fetchTestimonials, type Campus, type Testimonial } from '../services/api';

// NOTE: fallback 数据，Supabase 不可用时使用
const FALLBACK_CAMPUS: Campus = {
  id: 1,
  slug: 'florence',
  name: '佛罗伦萨主校区',
  subtitle: 'Florence Campus',
  address: 'Via del Pignoncino 9, Firenze, Italy',
  description: '毗邻百花大教堂，沉浸式感受文艺复兴的艺术气息。佛罗伦萨主校区拥有宽敞明亮的画室、雕塑工坊和艺术史图书馆，为纯艺术方向的学生提供最纯正的意式艺术教育环境。',
  admission_results: [
    'https://picsum.photos/seed/adm1/600/848',
    'https://picsum.photos/seed/adm2/600/848',
    'https://picsum.photos/seed/adm3/600/848',
    'https://picsum.photos/seed/adm4/600/848',
    'https://picsum.photos/seed/adm5/600/848',
  ],
  activities: [
    { image_url: 'https://picsum.photos/seed/act1/800/600', description: '乌菲兹美术馆大师画作临摹课' },
    { image_url: 'https://picsum.photos/seed/act2/800/600', description: '佛罗伦萨双年展参展观摩' },
    { image_url: 'https://picsum.photos/seed/act3/800/600', description: '文艺复兴雕塑技法工坊' },
    { image_url: 'https://picsum.photos/seed/act4/800/600', description: '美院教授面对面作品集评估' },
  ],
  gallery_images: [
    'https://picsum.photos/seed/flor1/600/800',
    'https://picsum.photos/seed/flor2/600/800',
    'https://picsum.photos/seed/flor3/600/800',
    'https://picsum.photos/seed/flor4/600/800',
  ],
};

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { id: 1, campus_slug: 'florence', content: '在佛罗伦萨校区学习的这半年是我人生中最宝贵的经历。每天走过乌菲兹美术馆去上课，教授们不仅教技法，更教我们如何像真正的艺术家一样思考。', student_name: '李同学', admission_info: '录取至 佛罗伦萨美术学院', avatar_url: 'https://picsum.photos/seed/user1/100/100', sort_order: 1 },
  { id: 2, campus_slug: 'florence', content: '画室的采光特别好，氛围很浓厚。这里的模拟面试帮了我大忙，真正面对考官时我一点都不紧张了。', student_name: '张同学', admission_info: '录取至 罗马美术学院', avatar_url: 'https://picsum.photos/seed/user2/100/100', sort_order: 2 },
  { id: 3, campus_slug: 'florence', content: '老师们非常负责，我的作品集排版改了无数次，最终呈现的效果连我自己都惊艳到了。强烈推荐这里的保障课程！', student_name: '王同学', admission_info: '录取至 博洛尼亚美术学院', avatar_url: 'https://picsum.photos/seed/user3/100/100', sort_order: 3 },
];

export default function CampusFlorence() {
  const { data: campus } = useSupabaseQuery(() => fetchCampus('florence'), FALLBACK_CAMPUS);
  const { data: testimonials } = useSupabaseQuery(() => fetchTestimonials('florence'), FALLBACK_TESTIMONIALS);

  // NOTE: campus 可能为 null（Supabase 查询失败时），此时使用 fallback
  const campusData = campus || FALLBACK_CAMPUS;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background-light">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors font-medium">
          <ArrowLeft size={20} /> 返回首页
        </Link>

        {/* Hero */}
        <div className="mb-16">
          <div className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">{campusData.subtitle}</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">{campusData.name}</h1>
          <p className="text-lg text-slate-600 max-w-2xl flex items-center gap-2">
            <MapPin size={20} className="text-primary" /> {campusData.address}
          </p>
          <p className="text-lg text-slate-600 max-w-3xl mt-6 leading-relaxed">
            {campusData.description}
          </p>
        </div>

        {/* Gallery */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-8">场地环境</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {campusData.gallery_images.map((img, i) => (
              <div key={i} className="h-64 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }}></div>
            ))}
          </div>
        </div>

        {/* Admission Results - Horizontal Scroll A4 Gallery */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-8">录取成果</h2>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {campusData.admission_results?.map((img, i) => (
              <div
                key={i}
                className="shrink-0 w-72 md:w-80 aspect-[1/1.414] rounded-xl bg-slate-100 overflow-hidden shadow-sm snap-start"
              >
                <img src={img} alt={`录取成果 ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Practical Activities - 4 Grid Layout */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-8">实践活动</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campusData.activities?.slice(0, 4).map((activity, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div
                  className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-slate-100 overflow-hidden shadow-sm"
                  style={{ backgroundImage: `url('${activity.image_url}')` }}
                ></div>
                <p className="text-slate-600 font-medium px-2">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-8">学生心声</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <Quote className="text-primary/20 mb-4" size={32} />
                <p className="text-slate-600 leading-relaxed mb-6">{item.content}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${item.avatar_url}')` }}></div>
                  <div>
                    <p className="font-bold text-sm">{item.student_name}</p>
                    <p className="text-xs text-primary">{item.admission_info}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
