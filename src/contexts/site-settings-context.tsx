/**
 * 网站全局配置 Context
 * 从 Supabase site_settings 表获取配置，提供给所有子组件使用
 */
import React, { createContext, useContext } from 'react';
import { useSupabaseQuery } from '../hooks/use-supabase-query';
import { fetchSiteSettings, type SiteSettings } from '../services/api';

// NOTE: fallback 默认值，Supabase 不可用时使用
const DEFAULT_SETTINGS: SiteSettings = {
    contact_phone: '+39 3890256542',
    contact_email: 'aadsaceci2021@gmail.com',
    contact_wechat: 'yancong949937',
    address_florence: 'Via del Pignoncino 9, Firenze, Italy',
    address_milan: 'Via Don Luigi Guanella 42, Milano, Italy',
    xiaohongshu_url: 'https://xhslink.com/m/2AYvp13cTz1',
    hero_title: '成就你的意大利艺术梦想',
    hero_subtitle: '专业意大利艺术留学预科教育，连接佛罗伦萨与世界，为每一位追求纯粹艺术的灵魂开启通往顶尖美院之门。',
    hero_bg_image: '',
    stat_acceptance_rate: '98%',
    stat_partner_academies: '15+',
    stat_success_cases: '2000+',
    stat_years: '5+',
    qr_wechat: '',
    qr_gongzhonghao: '',
    logo_header_url: '',
    logo_footer_url: '',
    about_tag: 'About Us',
    about_title: '关于我们',
    about_subtitle: '专注于意大利顶尖艺术院校留学作品集辅导与预科教育。在佛罗伦萨与米兰，我们为您连接最纯正的艺术资源与大师指导。',
    about_mission_title: '我们的使命',
    about_mission_p1: 'ArtAcademy 致力于为每一位追求纯粹艺术的灵魂开启通往顶尖美院之门。我们深信，艺术教育不仅仅是技能的传授，更是思维方式的重塑和文化底蕴的积累。',
    about_mission_p2: '通过我们在佛罗伦萨和米兰的双校区布局，学生能够沉浸在文艺复兴的古典气息与现代设计的时尚脉搏中，获得最全面、最前沿的艺术教育体验。',
    about_stat_years_label: 'Years Experience',
    about_stat_cases_label: 'Successful Students',
    about_image_url: '',
    about_contact_title: '联系我们',
};

const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS);

/**
 * 获取网站全局配置的 Hook
 * @param key 配置项的 key
 * @param fallback 可选的 fallback 值
 */
export function useSiteSettings(key?: string, fallback?: string): SiteSettings | string {
    const settings = useContext(SiteSettingsContext);
    if (key) {
        return settings[key] || fallback || DEFAULT_SETTINGS[key] || '';
    }
    return settings;
}

interface SiteSettingsProviderProps {
    children: React.ReactNode;
}

/**
 * 网站配置 Provider，包裹在 App 最外层
 */
export function SiteSettingsProvider({ children }: SiteSettingsProviderProps) {
    const { data: settings, isLoading } = useSupabaseQuery(fetchSiteSettings, DEFAULT_SETTINGS);

    if (isLoading) {
        return <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300"></div>;
    }

    return (
        <SiteSettingsContext.Provider value={settings}>
            {children}
        </SiteSettingsContext.Provider>
    );
}
