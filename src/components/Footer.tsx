import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../contexts/site-settings-context';
import type { SiteSettings } from '../services/api';

export default function Footer() {
  const settings = useSiteSettings() as SiteSettings;
  return (
    <footer className="bg-[#111] text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center shrink-0">
                <span className="font-black text-background-dark text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-base tracking-tight leading-none mb-1">Apennines Art & Design Studio</span>
                <span className="font-bold text-xs tracking-widest leading-none text-white/80">亚平宁工作室</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-md mb-8">
              专注于意大利顶尖艺术院校留学作品集辅导与预科教育。在佛罗伦萨与米兰，我们为您连接最纯正的艺术资源与大师指导。
            </p>
            <div className="flex gap-4">
              <a href={settings.xiaohongshu_url || 'https://xhslink.com/m/2AYvp13cTz1'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-white/10 hover:bg-[#ff2442] hover:text-white transition-colors text-sm font-bold gap-2">
                <span className="text-base leading-none">📕</span> 关注小红书
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6 tracking-widest text-sm">快速链接</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-primary transition-colors">关于我们</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition-colors">课程体系</Link></li>
              <li><Link to="/faculty" className="hover:text-primary transition-colors">师资团队</Link></li>
              <li><Link to="/cases" className="hover:text-primary transition-colors">优秀案例</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">联系方式</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h4 className="font-bold mb-6 tracking-widest text-sm">联系我们</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>佛罗伦萨：{settings.address_florence}<br />米兰：{settings.address_milan}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span>{settings.contact_phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-primary shrink-0" />
                  <span>{settings.contact_email}</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-primary shrink-0" />
                  <span>微信号：{settings.contact_wechat}</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-6 shrink-0">
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <span className="text-white/30 text-xs text-center px-2">公众号<br />二维码</span>
                </div>
                <span className="text-xs text-white/50">关注公众号</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <span className="text-white/30 text-xs text-center px-2">客服微信<br />二维码</span>
                </div>
                <span className="text-xs text-white/50">添加客服微信</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
          <p>© 2024 Apennines Art & Design Studio. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
