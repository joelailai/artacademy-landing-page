-- 向 site_settings 表插入/更新预约弹窗中的二维码 URL
INSERT INTO public.site_settings (key, value)
VALUES 
    ('qr_wechat', 'https://ypfnwbkjojocdjwvanfe.supabase.co/storage/v1/object/public/YA/YANCONG.jpg')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
