import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Globe,
  Clock,
  CheckCircle,
  Palette
} from 'lucide-react';
import { useSiteSettings } from '../contexts/site-settings-context';
import { useSupabaseQuery } from '../hooks/use-supabase-query';
import { fetchFaculty, fetchHomeCurriculums, type SiteSettings, type FacultyMember, type HomeCurriculum } from '../services/api';

// Icons mapping for dynamic curricula
const IconComponents: Record<string, any> = {
  Palette,
  GraduationCap
};

const Hero = () => {
  const settings = useSiteSettings() as SiteSettings;

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background-light/40 via-background-light/80 to-background-light z-10"></div>
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-[20s] scale-110"
          style={{ backgroundImage: settings.hero_bg_url ? `url('${settings.hero_bg_url}')` : `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBX2o-3Zwknhnc3FI0d_ODRa2ZIYBx3Xao1MRakoBthiEGxcmqWzko7lNm_9ZivJ_Y6K11gREKYqWysm-52RRxDrNMO3ALel2uOrOeumeMQV4wIg2hF-dN7y08xHSv6JnimLa028Gp0e9KwFliD6VZzeCJx8NpOQ5ggHmEYf_ZDJwBVI_1lwBFOj29L_OBwwzF9CCZJkjPD4ig-oDmYXWyoTJYhuUEPuMKFrZz0O0VYIlNlVXInfYuK5ycMXRfkiXBxdSHG9ZqxSvCp')` }}
        ></div>
      </div>

      <div className="relative z-20 text-center max-w-5xl mx-auto px-6 space-y-8 mt-12">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-slate-900 text-xs font-bold tracking-[0.2em] uppercase mb-4 backdrop-blur-sm">
          {settings.hero_tag || 'Rinascimento e Futuro'}
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tighter">
          {settings.hero_title_1 || '在文艺复兴的摇篮'}<br />
          <span className="text-primary italic font-serif font-medium tracking-normal">{settings.hero_title_2 || '开启你的艺术未来'}</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto font-light leading-relaxed whitespace-pre-wrap">
          {settings.hero_subtitle || '专业意大利艺术留学预科教育，连接佛罗伦萨与世界，为每一位追求纯粹艺术的灵魂开启通往顶尖美院之门。'}
        </p>
        <div className="flex justify-center items-center pt-8">
          <Link to="/courses" className="min-w-[200px] rounded-full bg-primary px-8 py-4 text-sm font-bold text-background-dark hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
            {settings.hero_cta_text || '立即了解计划'} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const settings = useSiteSettings() as SiteSettings;

  const stats = [
    { icon: <Clock size={24} />, value: settings.stat_years || '10+', label: settings.stat_years_label || '年专注意大利艺术教育' },
    { icon: <GraduationCap size={24} />, value: settings.stat_success_cases || '350+', label: settings.stat_success_cases_label || '成功升入顶尖美院学员' },
    { icon: <TrendingUp size={24} />, value: settings.stat_acceptance_rate || '98%', label: settings.stat_acceptance_rate_label || '核心课程升学录取率' },
    { icon: <Globe size={24} />, value: settings.stat_campuses || '2', label: settings.stat_campuses_label || '佛罗伦萨/米兰双校区' },
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3 relative">
              {index !== 0 && <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-slate-100"></div>}
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                {stat.icon}
              </div>
              <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Campuses = () => {
  const settings = useSiteSettings() as SiteSettings;

  return (
    <section className="py-24 bg-background-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">{settings.home_campuses_tag || 'Campus e Galleria'}</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter" dangerouslySetInnerHTML={{ __html: settings.home_campuses_title || '校区与学生<br />作品展示' }}></h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Florence Campus */}
          <Link to="/campus/florence" className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer block">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: settings.home_campus_florence_image ? `url('${settings.home_campus_florence_image}')` : undefined }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-primary text-xs font-bold tracking-widest mb-2">{settings.home_campus_florence_tag || 'CAMPUS DI FIRENZE'}</div>
                  <h3 className="text-3xl font-bold text-white mb-2">{settings.home_campus_florence_title || '佛罗伦萨主校区'}</h3>
                  <p className="text-white/70 text-sm max-w-sm whitespace-pre-wrap">{settings.home_campus_florence_desc || '毗邻百花大教堂，沉浸式感受文艺复兴的艺术气息，提供最纯正的意式艺术教育。'}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-colors">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </Link>

          {/* Milan Campus */}
          <Link to="/campus/milan" className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer block">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: settings.home_campus_milan_image ? `url('${settings.home_campus_milan_image}')` : undefined }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-primary text-xs font-bold tracking-widest mb-2">{settings.home_campus_milan_tag || 'CAMPUS DI MILANO'}</div>
                  <h3 className="text-3xl font-bold text-white mb-2">{settings.home_campus_milan_title || '米兰校区'}</h3>
                  <p className="text-white/70 text-sm max-w-sm whitespace-pre-wrap">{settings.home_campus_milan_desc || '位于全球时尚与设计之都，紧密连接产业前沿，专注于设计与时尚类专业辅导。'}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-colors">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

// NOTE: 课程编号到详情页路由的映射
const CURRICULUM_LINKS: Record<string, string> = {
  '01': '/courses/foundation',
  '02': '/courses/coaching',
};

const Curriculum = () => {
  const settings = useSiteSettings() as SiteSettings;
  const FALLBACK_CURRICULUMS: HomeCurriculum[] = [
    {
      id: 1, sort_order: 1, number_label: '01', title_cn: '艺术预科 (Corso Propedeutico)', icon_name: 'Palette',
      objective: '零基础或基础薄弱学生，建立完整的西方艺术思维体系与基础技能。', duration: '6-8 个月', methodology: '工坊式教学',
      core_points: ['艺术史与现当代艺术理论', '基础造型与色彩实验', '创意思维与材料探索', '意大利语艺术词汇强化']
    },
    {
      id: 2, sort_order: 2, number_label: '02', title_cn: "升学辅导 (Preparazione all'Ammissione)", icon_name: 'GraduationCap',
      objective: '针对目标院校要求，完成高质量作品集创作及入学面试准备。', duration: '3-6 个月', methodology: '1对1导师制',
      core_points: ['个人艺术项目深度开发', '作品集排版与视觉呈现', '教授模拟面试与作品答辩', '院校申请与注册全程指导']
    }
  ];

  const { data: curriculums } = useSupabaseQuery(fetchHomeCurriculums, FALLBACK_CURRICULUMS);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">{settings.home_curriculum_tag || 'Struttura Didattica'}</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{settings.home_curriculum_title || '课程体系重塑'}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 border border-slate-200 rounded-2xl overflow-hidden">
          {curriculums.map((item, index) => {
            const Icon = IconComponents[item.icon_name] || Palette;
            const detailLink = CURRICULUM_LINKS[item.number_label] || '/courses';
            return (
              <div key={item.id} className={`p-10 lg:p-14 bg-slate-50/50 hover:bg-white transition-colors ${index % 2 === 0 ? 'border-b lg:border-b-0 lg:border-r border-slate-200' : ''}`}>
                <div className="flex items-start justify-between mb-12">
                  <div>
                    <div className="text-5xl font-black text-slate-200 mb-4">{item.number_label}</div>
                    <h3 className="text-2xl font-bold mb-2 break-normal">{item.title_cn}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Obiettivo</h4>
                    <p className="text-slate-700 font-medium">{item.objective}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Durata</h4>
                      <p className="font-bold">{item.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Metodologia</h4>
                      <p className="font-bold">{item.methodology}</p>
                    </div>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      {item.core_points.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm font-medium">
                          <CheckCircle size={16} className="text-primary shrink-0" /> {point}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={detailLink}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-background-dark hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                    >
                      课程详细介绍 <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Faculty = () => {
  const settings = useSiteSettings() as SiteSettings;
  const FALLBACK_FACULTY: FacultyMember[] = [
    { id: 1, name: 'Prof. Alessandro', title: '前佛罗伦萨美院教授 / 雕塑系主任', description: null, image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWpMeF83DNVODSolo9AT4t1LA9APKW8yU7TN9AASU9uqrzlnGy2oMY8QsQtw6Rhi2g5aKe1TfDCUKsORUZcuVAGetSgEF59JbQPjSACPPGQt0_SDsj6TdnEGIZBbpwNncGzTUWYrY6p7mUpYOdC2QtuLM3nnRLq9nv2o-TSmBJlVcIIEX_1gbbOtBeDFdcYTBtOkPcqlvNB99vkr9RHOaR_hy6RIW3__eECse0H7cfarfLPf7eBP7jGiOpZO56Bdt6Gy4kQFIgIru9', sort_order: 1 },
    { id: 2, name: 'Dr. Beatrice', title: '米兰理工大学建筑学博士 / 独立设计师', description: null, image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjgxnWEBdrBYTCanFJ7bbbqe43j3X3i9jXQTqohTCfxPXX9WzK_wu_t3ni0Kw5YQhgs6LikP_akBpx198mxBgkvi3JoWFkocB6mT1mQI-ypYBeu0G_X4WP70_UC3XtE6onGmpuJJJLxfQDqdBM3mmSCfKDwE2cfQiGp1aVqqBiREvlg6albCGEaKAew96_Td5SKNIT1nuGkbD_1qTkDEjzBtFBJ-1DECGBdEUdqDDgFCMFp6ykraPDUSxXUVMDYGKRLjDjAIHO10SC', sort_order: 2 },
    { id: 3, name: 'Giulia M.', title: '马兰欧尼时装学院资深导师 / 品牌主理人', description: null, image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO_cePkZLJ38MgRYiLQqtsnDkSCCdWGg2iIWpSBjCGz1O5ygFTjKh1El9M5suvNuwHCQOTZ_p4id7qxp-qxFFQcK20-iwGQ9ZHi_jrLFhkE4YgGCN8kkiHxjq4l29-SDA85I3zKkJPFSuKBojMpnWv3u94GzkPITxX2YNspXbNE8TjV7UZ2_DOvdG2WDqQx_V0K4WS_mAhmnc8-61t9ybnAxi_oXYxZXx7knknaGDZ1JufnyQz8T4hCrhlnyhyCUB8PEsZ3y9w8sxs', sort_order: 3 }
  ];

  const { data: facultyResponse, isLoading } = useSupabaseQuery(fetchFaculty, FALLBACK_FACULTY);

  // 只在首页展示前三个导师
  const faculty = facultyResponse.slice(0, 3);

  return (
    <section className="py-24 bg-background-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">{settings.home_faculty_tag || 'Docenti Internazionali'}</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter" dangerouslySetInnerHTML={{ __html: settings.home_faculty_title || '连接中意艺术桥梁<br />国际艺术导师' }}></h2>
          </div>
          <Link to="/faculty" className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
            {settings.home_faculty_cta || '查看全部导师'} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {faculty.map((member, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-[400px] overflow-hidden rounded-xl mb-6">
                <div
                  className={`absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  style={{ backgroundImage: isLoading ? 'none' : `url('${member.image_url}')` }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
              <p className="text-white/60 text-sm">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Campuses />
      <Curriculum />
      <Faculty />
    </>
  );
}
