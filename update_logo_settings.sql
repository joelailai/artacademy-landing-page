-- 插入新的 Header 和 Footer Logo 配置项
INSERT INTO public.site_settings (key, value)
VALUES 
    ('logo_header_url', ''),
    ('logo_footer_url', '')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 可选：如果确认不再需要旧的 logo_url 配置，可以取消注释下面这行来删除它
-- DELETE FROM public.site_settings WHERE key = 'logo_url';
