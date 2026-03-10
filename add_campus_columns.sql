-- 1. 为 campuses 表新增 admission_results 列 (用于存放录取成果图片链接)
ALTER TABLE public.campuses 
ADD COLUMN IF NOT EXISTS admission_results JSONB DEFAULT '[]';

-- 2. 为 campuses 表新增 activities 列 (用于存放实践活动图片及介绍)
ALTER TABLE public.campuses 
ADD COLUMN IF NOT EXISTS activities JSONB DEFAULT '[]';

-- 3. (可选) 删除旧的 courses 和 institutions 列（请确认不再需要这些数据后再取消注释执行）
-- ALTER TABLE public.campuses DROP COLUMN courses;
-- ALTER TABLE public.campuses DROP COLUMN institutions;

-- 4. 插入米兰校区的测试数据
UPDATE public.campuses 
SET 
  admission_results = '["https://picsum.photos/seed/milan_adm1/600/848", "https://picsum.photos/seed/milan_adm2/600/848", "https://picsum.photos/seed/milan_adm3/600/848", "https://picsum.photos/seed/milan_adm4/600/848", "https://picsum.photos/seed/milan_adm5/600/848"]'::jsonb,
  activities = '[{"image_url": "https://picsum.photos/seed/milan_act1/800/600", "description": "米兰设计周（Salone del Mobile）参展考察"}, {"image_url": "https://picsum.photos/seed/milan_act2/800/600", "description": "Prada 基金会当代美术馆深度导览"}, {"image_url": "https://picsum.photos/seed/milan_act3/800/600", "description": "服装设计工坊：成衣剪裁与面料实验"}, {"image_url": "https://picsum.photos/seed/milan_act4/800/600", "description": "米兰理工教授交互设计体验课"}]'::jsonb
WHERE slug = 'milan';

-- 5. 插入佛罗伦萨校区的测试数据
UPDATE public.campuses 
SET 
  admission_results = '["https://picsum.photos/seed/adm1/600/848", "https://picsum.photos/seed/adm2/600/848", "https://picsum.photos/seed/adm3/600/848", "https://picsum.photos/seed/adm4/600/848", "https://picsum.photos/seed/adm5/600/848"]'::jsonb,
  activities = '[{"image_url": "https://picsum.photos/seed/act1/800/600", "description": "乌菲兹美术馆大师画作临摹课"}, {"image_url": "https://picsum.photos/seed/act2/800/600", "description": "佛罗伦萨双年展参展观摩"}, {"image_url": "https://picsum.photos/seed/act3/800/600", "description": "文艺复兴雕塑技法工坊"}, {"image_url": "https://picsum.photos/seed/act4/800/600", "description": "美院教授面对面作品集评估"}]'::jsonb
WHERE slug = 'florence';
