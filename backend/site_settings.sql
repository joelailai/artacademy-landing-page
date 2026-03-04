-- ============================================================
-- site_settings 表（网站全局配置）
-- 在 Supabase Dashboard 的 SQL Editor 中执行此脚本
-- ============================================================

CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT
);

-- 种子数据
INSERT INTO site_settings (key, value, description) VALUES
-- 联系信息
('contact_phone', '+39 3890256542', '联系电话'),
('contact_email', 'aadsaceci2021@gmail.com', '电子邮箱'),
('contact_wechat', 'yancong949937', '微信号'),
('address_florence', 'Via del Pignoncino 9, Firenze, Italy', '佛罗伦萨校区地址'),
('address_milan', 'Via Don Luigi Guanella 42, Milano, Italy', '米兰校区地址'),
('xiaohongshu_url', 'https://xhslink.com/m/2AYvp13cTz1', '小红书链接'),
-- 首页 Hero
('hero_title', '成就你的意大利艺术梦想', '首页主标题'),
('hero_subtitle', '专业意大利艺术留学预科教育，连接佛罗伦萨与世界，为每一位追求纯粹艺术的灵魂开启通往顶尖美院之门。', '首页副标题'),
('hero_bg_image', '', '首页 Hero 背景图 URL（留空则使用默认）'),
-- 首页统计数据
('stat_acceptance_rate', '98%', '录取率'),
('stat_partner_academies', '15+', '合作美院数量'),
('stat_success_cases', '2000+', '成功案例数量'),
('stat_years', '5+', '办学年限')
ON CONFLICT (key) DO NOTHING;

-- RLS 策略
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "允许匿名读取配置" ON site_settings FOR SELECT USING (true);
