import React from 'react';
import { ArrowLeft, MapPin, CheckCircle, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSupabaseQuery } from '../hooks/use-supabase-query';
import { fetchCampus, fetchTestimonials, type Campus, type Testimonial } from '../services/api';

// NOTE: fallback 数据，Supabase 不可用时使用
const FALLBACK_CAMPUS: Campus = {
  id: 2,
  slug: 'milan',
  name: '米兰校区',
  subtitle: 'Milan Campus',
  address: 'Via Tortona 35, Milano, Italy',
  description: '位于全球时尚与设计之都的核心区域。米兰校区配备了顶尖的数字媒体实验室、打版工作室和材料库，紧密连接产业前沿，专注于设计与时尚类专业辅导。',
  admission_results: [
    'https://picsum.photos/seed/milan_adm1/600/848',
    'https://picsum.photos/seed/milan_adm2/600/848',
    'https://picsum.photos/seed/milan_adm3/600/848',
    'https://picsum.photos/seed/milan_adm4/600/848',
    'https://picsum.photos/seed/milan_adm5/600/848',
    'https://picsum.photos/seed/milan_adm6/600/848',
    'https://picsum.photos/seed/milan_adm7/600/848',
    'https://picsum.photos/seed/milan_adm8/600/848',
    'https://picsum.photos/seed/milan_adm9/600/848',
    'https://picsum.photos/seed/milan_adm10/600/848',
    'https://picsum.photos/seed/milan_adm11/600/848',
    'https://picsum.photos/seed/milan_adm12/600/848',
    'https://picsum.photos/seed/milan_adm13/600/848',
    'https://picsum.photos/seed/milan_adm14/600/848',
    'https://picsum.photos/seed/milan_adm15/600/848',
    'https://picsum.photos/seed/milan_adm16/600/848',
    'https://picsum.photos/seed/milan_adm17/600/848',
    'https://picsum.photos/seed/milan_adm18/600/848',
    'https://picsum.photos/seed/milan_adm19/600/848',
    'https://picsum.photos/seed/milan_adm20/600/848',
  ],
  activities: [
    { image_url: 'https://picsum.photos/seed/milan_act1/800/600', description: '米兰设计周（Salone del Mobile）参展考察' },
    { image_url: 'https://picsum.photos/seed/milan_act2/800/600', description: 'Prada 基金会当代美术馆深度导览' },
    { image_url: 'https://picsum.photos/seed/milan_act3/800/600', description: '服装设计工坊：成衣剪裁与面料实验' },
    { image_url: 'https://picsum.photos/seed/milan_act4/800/600', description: '米兰理工教授交互设计体验课' },
  ],
  gallery_images: [
    'https://picsum.photos/seed/milan1/600/800',
    'https://picsum.photos/seed/milan2/600/800',
    'https://picsum.photos/seed/milan3/600/800',
    'https://picsum.photos/seed/milan4/600/800',
  ],
};

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { id: 4, campus_slug: 'milan', content: '米兰校区的设备太全了！我的交互设计作品集需要很多硬件原型的展示，这里的实验室完全满足了我的需求。', student_name: '赵同学', admission_info: '录取至 米兰理工大学', avatar_url: 'https://picsum.photos/seed/user4/100/100', sort_order: 1 },
  { id: 5, campus_slug: 'milan', content: '导师本身就是马兰欧尼的客座教授，对作品集的风格把控极其精准。在她的指导下，我成功拿到了高额奖学金。', student_name: '刘同学', admission_info: '录取至 马兰欧尼时装学院', avatar_url: 'https://picsum.photos/seed/user5/100/100', sort_order: 2 },
  { id: 6, campus_slug: 'milan', content: '在米兰设计周期间，学校还组织我们去看了很多展，极大地拓宽了我的设计视野。这里的资源是无价的。', student_name: '陈同学', admission_info: '录取至 NABA 新美术学院', avatar_url: 'https://picsum.photos/seed/user6/100/100', sort_order: 3 },
];

export default function CampusMilan() {
  const { data: campus, isLoading: isLoadingCampus } = useSupabaseQuery(() => fetchCampus('milan'), FALLBACK_CAMPUS);
  const { data: testimonials, isLoading: isLoadingTestimonials } = useSupabaseQuery(() => fetchTestimonials('milan'), FALLBACK_TESTIMONIALS);

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
              <div key={i} className={`h-64 rounded-2xl bg-cover bg-center transition-opacity duration-300 ${isLoadingCampus ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundImage: isLoadingCampus ? 'none' : `url('${img}')` }}></div>
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
                <img src={isLoadingCampus ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : img} alt={`米兰录取成果 ${i + 1}`} className={`w-full h-full object-cover transition-opacity duration-300 ${isLoadingCampus ? 'opacity-0' : 'opacity-100'}`} />
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
                  className={`aspect-[4/3] rounded-2xl bg-cover bg-center bg-slate-100 overflow-hidden shadow-sm transition-opacity duration-300 ${isLoadingCampus ? 'opacity-0' : 'opacity-100'}`}
                  style={{ backgroundImage: isLoadingCampus ? 'none' : `url('${activity.image_url}')` }}
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
                  <div className={`w-10 h-10 rounded-full bg-cover bg-center transition-opacity duration-300 ${isLoadingTestimonials ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundImage: isLoadingTestimonials ? 'none' : `url('${item.avatar_url}')` }}></div>
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
