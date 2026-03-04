import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSupabaseQuery } from '../hooks/use-supabase-query';
import { fetchFaculty, type FacultyMember } from '../services/api';

// NOTE: 硬编码数据作为 Supabase 不可用时的 fallback
const FALLBACK_FACULTY: FacultyMember[] = [
  { id: 1, name: 'Prof. Giovanni Ferretti', title: '博洛尼亚美术学院教授 / 罗马艺术史学家', description: '拥有20年艺术教育经验，专注于意大利文艺复兴艺术史研究。', image_url: '/images/teachers/prof-giovanni-ferretti.jpg', sort_order: 1 },
  { id: 2, name: 'Prof. Alessandro Ricci', title: '佛罗伦萨美术学院教授 / 著名雕塑家', description: '意大利著名雕塑家，作品展出于欧洲多个重要美术馆。', image_url: '/images/teachers/prof-alessandro-ricci.jpg', sort_order: 2 },
  { id: 3, name: 'Prof. Marco Lombardi', title: '威尼斯美术学院教授 / 策展人', description: '资深策展人，曾策划多个威尼斯双年展平行展。', image_url: '/images/teachers/prof-marco-lombardi.jpg', sort_order: 3 },
  { id: 4, name: 'Prof. Francesca De Angelis', title: 'NABA新美术学院导师 / 时尚管理', description: '奢侈品管理专家，曾任职于多家国际时尚集团。', image_url: '/images/teachers/prof-francesca-de-angelis.jpg', sort_order: 4 },
  { id: 5, name: 'Prof. Luca Moretti', title: '米兰理工大学教授 / 建筑设计', description: '专注于可持续建筑设计，参与多个欧洲城市更新项目。', image_url: '/images/teachers/prof-luca-moretti.jpg', sort_order: 5 },
  { id: 6, name: 'Dr. Elena Conti', title: '罗马一大博士 / 艺术评论家', description: '拥有15年艺术评论经验，文章发表于多家国际艺术期刊。', image_url: '/images/teachers/dr-elena-conti.jpg', sort_order: 6 },
  { id: 7, name: 'Prof. Sofia Benedetti', title: '欧洲设计学院(IED)教授 / 品牌设计', description: '品牌设计专家，作品获得多项国际设计大奖。', image_url: '/images/teachers/prof-sofia-benedetti.jpg', sort_order: 7 },
  { id: 8, name: 'Prof. Andrea Gallo', title: '马兰欧尼学院教授 / 时尚设计', description: '资深时尚设计师，曾任职于多家一线奢侈品牌。', image_url: '/images/teachers/prof-andrea-gallo.jpg', sort_order: 8 },
  { id: 9, name: 'Prof. Chiara Ricci', title: '都灵美术学院教授 / 装置艺术', description: '当代装置艺术家，作品展出于威尼斯双年展。', image_url: '/images/teachers/prof-chiara-ricci.jpg', sort_order: 9 },
  { id: 10, name: 'Prof. Roberto Valenti', title: '佛路西诺音乐学院教授 / 音乐制作', description: '资深音乐制作人，拥有丰富的流行音乐制作经验。', image_url: '/images/teachers/prof-roberto-valenti.jpg', sort_order: 10 },
  { id: 11, name: 'Prof. Antonio Esposito', title: '佩鲁贾美术学院教授 / 版画与插画', description: '版画与插画艺术家，作品被多家博物馆收藏。', image_url: '/images/teachers/prof-antonio-esposito.jpg', sort_order: 11 },
  { id: 12, name: 'Prof. Paola Martinelli', title: '博洛尼亚音乐学院教授 / 声乐表演', description: '著名女高音歌唱家，曾在斯卡拉歌剧院演出。', image_url: '/images/teachers/prof-paola-martinelli.jpg', sort_order: 12 },
  { id: 13, name: 'Prof. Giuseppe Ferrara', title: '米兰布雷拉美术学院教授 / 绘画与视觉艺术', description: '当代绘画艺术家，作品展出于欧洲各大美术馆。', image_url: '/images/teachers/prof-giuseppe-ferrara.jpg', sort_order: 13 },
  { id: 14, name: 'Prof. Maria Teresa Colombo', title: 'NABA新美术学院导师 / 策展与艺术管理', description: '艺术管理专家，曾任多个国际艺术展览策展人。', image_url: '/images/teachers/prof-maria-teresa-colombo.jpg', sort_order: 14 },
];

export default function Faculty() {
  const { data: faculty } = useSupabaseQuery(fetchFaculty, FALLBACK_FACULTY);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">Our Faculty</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">国际师资团队</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            连接中意艺术桥梁，由来自意大利顶尖美院的教授与活跃在行业前沿的设计师组成的精英导师团队。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {faculty.map((member) => (
            <div key={member.id} className="group flex flex-col sm:flex-row gap-8 items-center bg-white/5 p-6 rounded-3xl hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-48 h-48 shrink-0 rounded-2xl overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${member.image_url}')` }}
                ></div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-primary text-sm font-bold mb-4">{member.title}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
