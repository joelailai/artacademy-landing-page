-- 向 site_settings 表插入/更新所有关于我们页面的配置项
INSERT INTO public.site_settings (key, value)
VALUES 
    ('about_tag', 'About Us'),
    ('about_title', '关于我们'),
    ('about_subtitle', '专注于意大利顶尖艺术院校留学作品集辅导与预科教育。在佛罗伦萨与米兰，我们为您连接最纯正的艺术资源与大师指导。'),
    ('about_mission_title', '我们的使命'),
    ('about_mission_p1', 'ArtAcademy 致力于为每一位追求纯粹艺术的灵魂开启通往顶尖美院之门。我们深信，艺术教育不仅仅是技能的传授，更是思维方式的重塑和文化底蕴的积累。'),
    ('about_mission_p2', '通过我们在佛罗伦萨和米兰的双校区布局，学生能够沉浸在文艺复兴的古典气息与现代设计的时尚脉搏中，获得最全面、最前沿的艺术教育体验。'),
    ('about_stat_years_label', 'Years Experience'),
    ('about_stat_cases_label', 'Successful Students'),
    ('about_image_url', ''),
    ('about_contact_title', '联系我们')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
