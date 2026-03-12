-- ============================================================
-- 首页全部内容可编辑化 — SQL 迁移脚本
-- 向 site_settings 表插入 Stats 标签 / 校区卡片等新配置项
-- 在 Supabase Dashboard → SQL Editor 中执行
-- ============================================================

INSERT INTO public.site_settings (key, value)
VALUES
    -- Stats 模块：统计项标签
    ('stat_years_label', '年专注意大利艺术教育'),
    ('stat_success_cases_label', '成功升入顶尖美院学员'),
    ('stat_acceptance_rate_label', '核心课程升学录取率'),
    ('stat_campuses', '2'),
    ('stat_campuses_label', '佛罗伦萨/米兰双校区'),

    -- Campuses 模块：佛罗伦萨校区卡片
    ('home_campus_florence_tag', 'CAMPUS DI FIRENZE'),
    ('home_campus_florence_title', '佛罗伦萨主校区'),
    ('home_campus_florence_desc', '毗邻百花大教堂，沉浸式感受文艺复兴的艺术气息，提供最纯正的意式艺术教育。'),
    ('home_campus_florence_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcrlHoaQVhuR1sZUrMNYRzToTbwxbMts1qxtma1i_g9q85WNXgSZdDvvMeU7dY1_Iew52-wB_xXCmPH_FI5F5fskSPuTUq7ccHFOoa73SkMz68fU2c3y7pt0nKyjiN92YqOJcs1FhcfXEsPUf-48gyBH4g9GF0iQZqdNHhlKaObZkMuLpo6DXF23JcPCMO1N8qlHfnFlVFTnJT05M3y0K7NEjDrmu2d7mS0LWmNRMwN2Zm-IUzW6p5f0EEBrmevas2E8-DbmMO7MA4'),

    -- Campuses 模块：米兰校区卡片
    ('home_campus_milan_tag', 'CAMPUS DI MILANO'),
    ('home_campus_milan_title', '米兰校区'),
    ('home_campus_milan_desc', '位于全球时尚与设计之都，紧密连接产业前沿，专注于设计与时尚类专业辅导。'),
    ('home_campus_milan_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVdoCq9YPv0NsUGrE10tY3GmgtphYVSr_pc2mA4oBECUTkqekNAuvbciEsgEwC2JXifkV83iZmSp1n6QwlASayhM-e8MRj_lCidVQV0NRruSAzsjGGeMTl9NSWjfW07o3G0UcDeLvxQNqPmMHjDx9bwPlGal7TmDmf-rM5Rx3nj_cedFTTc8ww8_F-lUcVgSV0g9G99B8K1uhGvjfsiNDyxcRS8Hy83M3l7x36n4fZFWwSTK2HK5RaIlsAgJW8q2HWIjY52w4GLZOA')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
