import React from 'react';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../contexts/site-settings-context';
import type { SiteSettings } from '../services/api';

export default function About() {
  const settings = useSiteSettings() as SiteSettings;
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">About Us</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">关于我们</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            专注于意大利顶尖艺术院校留学作品集辅导与预科教育。在佛罗伦萨与米兰，我们为您连接最纯正的艺术资源与大师指导。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">我们的使命</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              ArtAcademy 致力于为每一位追求纯粹艺术的灵魂开启通往顶尖美院之门。我们深信，艺术教育不仅仅是技能的传授，更是思维方式的重塑和文化底蕴的积累。
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              通过我们在佛罗伦萨和米兰的双校区布局，学生能够沉浸在文艺复兴的古典气息与现代设计的时尚脉搏中，获得最全面、最前沿的艺术教育体验。
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
              <div>
                <div className="text-4xl font-black text-primary mb-2">10+</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-black text-primary mb-2">350+</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Successful Students</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg h-[500px] relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBX2o-3Zwknhnc3FI0d_ODRa2ZIYBx3Xao1MRakoBthiEGxcmqWzko7lNm_9ZivJ_Y6K11gREKYqWysm-52RRxDrNMO3ALel2uOrOeumeMQV4wIg2hF-dN7y08xHSv6JnimLa028Gp0e9KwFliD6VZzeCJx8NpOQ5ggHmEYf_ZDJwBVI_1lwBFOj29L_OBwwzF9CCZJkjPD4ig-oDmYXWyoTJYhuUEPuMKFrZz0O0VYIlNlVXInfYuK5ycMXRfkiXBxdSHG9ZqxSvCp')` }}></div>
          </div>
        </div>

        <div className="bg-background-light rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-3xl font-bold mb-12">联系我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">校区地址</h3>
              <p className="text-slate-600 text-center">
                <strong>佛罗伦萨主校区:</strong><br />
                {settings.address_florence}<br /><br />
                <strong>米兰校区:</strong><br />
                {settings.address_milan}
              </p>
            </div>

            <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">联系电话</h3>
              <p className="text-slate-600 text-center">
                <strong>联系电话:</strong><br />
                {settings.contact_phone}
              </p>
            </div>

            <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">电子邮件</h3>
              <p className="text-slate-600 text-center">
                <strong>电子邮箱:</strong><br />
                {settings.contact_email}<br /><br />
                <strong>微信号:</strong><br />
                {settings.contact_wechat}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
