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
    const { data: settings } = useSupabaseQuery(fetchSiteSettings, DEFAULT_SETTINGS);

    return (
        <SiteSettingsContext.Provider value={settings}>
            {children}
        </SiteSettingsContext.Provider>
    );
}
