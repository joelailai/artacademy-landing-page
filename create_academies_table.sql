-- 创建 academies 数据表
CREATE TABLE IF NOT EXISTS public.academies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    name_it TEXT NOT NULL,
    established TEXT,
    logo TEXT,
    hero_image TEXT,
    introduction TEXT,
    majors JSONB DEFAULT '[]'::jsonb,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 开启 RLS 保护并设置公开只读权限
ALTER TABLE public.academies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.academies;

CREATE POLICY "Enable read access for all users"
    ON public.academies
    FOR SELECT
    TO authenticated, anon
    USING (true);

-- 清空旧数据以防重复插入
TRUNCATE TABLE public.academies;

-- 插入五所美术学院的全量初始数据
INSERT INTO public.academies (slug, name, name_it, established, logo, hero_image, introduction, majors, sort_order) VALUES
(
    'firenze',
    '佛罗伦萨美术学院',
    'Accademia di Belle Arti di Firenze',
    '1563年',
    'https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/academy-logos/firenze.png',
    'https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/academy-hero/firenze.jpg',
    '文艺复兴时期科西莫一世创办的世界上第一所官方美术学院。米开朗基罗、瓦萨里等巨匠都曾是这里的院士。坐落于举世闻名的艺术之都，该校至今仍是探求西方纯艺术至高境界的朝圣之地，其古典艺术的教学实力在全欧洲首屈一指。',
    '[
        {"id": "fi-1", "name": "纯艺术 - 绘画与雕塑 (Pittura e Scultura)", "level": "Both", "description": "极其注重人体造型、解剖学与传统媒材训练的学院核心力量。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/fi_art.jpg"},
        {"id": "fi-2", "name": "室内设计 (Design - Interior)", "level": "Undergraduate", "description": "融合了意大利托斯卡纳传统与当代极简的室内空间与家具设计方向。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/fi_int.jpg"},
        {"id": "fi-3", "name": "展陈设计 (Exhibit Design)", "level": "Graduate", "description": "专门针对博物馆展开展策展与空间布展设计的深度研究。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/fi_exhibit.jpg"},
        {"id": "fi-4", "name": "博物馆教育与传播 (Didattica per i Musei)", "level": "Undergraduate", "description": "利用佛罗伦萨丰富的博物馆资源，培养艺术导览、教育及文化传播专家。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/fi_edu.jpg"},
        {"id": "fi-5", "name": "插画 (Illustrazione)", "level": "Graduate", "description": "研究绘本、视听文学传播与出版相关的视觉语言和图形表达。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/fi_ill.jpg"}
    ]'::jsonb,
    1
),
(
    'brera',
    '米兰布雷拉美术学院',
    'Accademia di Belle Arti di Brera',
    '1776年',
    'https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/academy-logos/brera.png',
    'https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/academy-hero/brera.jpg',
    '设立于1776年，位于意大利米兰市中心，是欧洲乃至世界最重要的美术学院之一。布雷拉美院在视觉艺术、设计、艺术教育方面拥有丰富的历史底蕴，曾吸引众多艺术大家任教，如今每年为全球输出大量顶尖的设计与纯艺术人才，是意大利最高等级AFAM艺术教育体系的代表院校。',
    '[
        {"id": "br-1", "name": "绘画 (Pittura)", "level": "Both", "description": "结合传统表现技法与当代艺术观念，培养独立的艺术创作者。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/br_pittura.jpg"},
        {"id": "br-2", "name": "雕塑 (Scultura)", "level": "Both", "description": "运用多元材质和空间语境，研究并实践立体艺术形式。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/br_scultura.jpg"},
        {"id": "br-3", "name": "企业艺术设计 (Progettazione Artistica per l''Impresa)", "level": "Undergraduate", "description": "王牌设计王牌专业之一，产品设计方向，侧重于为商业、生活与产品提供美学与功能性的艺术解决方案。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/br_product.jpg"},
        {"id": "br-4", "name": "艺术新技术 (Nuove Tecnologie dell''Arte)", "level": "Both", "description": "聚焦多媒体、互动影像及数字艺术的前沿探索。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/br_nta.jpg"},
        {"id": "br-5", "name": "舞台美术设计 (Scenografia)", "level": "Both", "description": "依托米兰强大的戏剧舞台资源，教授布景与戏剧服装设计体系。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/br_scene.jpg"},
        {"id": "br-6", "name": "时尚设计 (Fashion Design)", "level": "Graduate", "description": "两年制硕士专业，聚焦于高端成衣与先锋时尚设计的概念开发与制作。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/br_fashion.jpg"}
    ]'::jsonb,
    2
),
(
    'bologna',
    '博洛尼亚美术学院',
    'Accademia di Belle Arti di Bologna',
    '1710年',
    'https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/academy-logos/bologna.png',
    'https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/academy-hero/bologna.jpg',
    '博洛尼亚美术学院坐落于世界最古老大学之城，是意大利重要的艺术殿堂。学校与国家美术馆相邻，莫兰迪等大师曾在此任教。这里的教学一方面深入传统技法，另一方面在插画、漫画设计领域属于意大利的执牛耳者。',
    '[
        {"id": "bo-1", "name": "漫画与插画 (Fumetto e Illustrazione)", "level": "Both", "description": "全意大利公立美院中最著名的漫画和插画专业，以深厚的叙事线条和表现力闻名。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/bo_comic.jpg"},
        {"id": "bo-2", "name": "电影与视听语言 (Cinema e linguaggi audiovisivi)", "level": "Both", "description": "聚焦电影制作、剪辑以及实验影像领域的全方位实操与艺术素养训练。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/bo_cinema.jpg"},
        {"id": "bo-3", "name": "时尚设计 (Fashion Design)", "level": "Both", "description": "兼顾服装造型能力和纺织材料研究的强力专业。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/bo_fashion.jpg"},
        {"id": "bo-4", "name": "摄影 (Fotografia)", "level": "Both", "description": "传统暗房冲洗结合现代数字摄影技术，培养商业级或实验性影像艺术家。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/bo_photo.jpg"},
        {"id": "bo-5", "name": "文物修复 (Restauro)", "level": "Both", "description": "本硕连读五年制，极具含金量，致力于欧洲经典木质、油画及石制文物的保护与科学修复。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/bo_restauro.jpg"}
    ]'::jsonb,
    3
),
(
    'roma',
    '罗马美术学院',
    'Accademia di Belle Arti di Roma',
    '1593年',
    'https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/academy-logos/roma.png',
    'https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/academy-hero/roma.jpg',
    '罗马美术学院前身为声名显赫的圣路加学院，作为意大利教育部首个认可的美术学院，它是传统艺术发源地和现代传媒设计的交汇点。学校周边即是充满历史遗迹的永恒之城，学生能在随处可见的历史厚重感中学习版画、多媒体、舞台美术等顶尖专业。',
    '[
        {"id": "rm-1", "name": "版画与雕刻技术 (Grafica d''Arte/Incisione)", "level": "Both", "description": "作为历史悠久的强项，保存和教授包括铜版、石版、木版在内最纯正的古代与当代版画印制技术。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/rm_incisione.jpg"},
        {"id": "rm-2", "name": "多媒体与科技艺术 (Arti multimediali e tecnologiche)", "level": "Both", "description": "跨越传统艺术媒介，教授从互动装置到数字孪生的实验性前沿媒体表达方式。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/rm_multimedia.jpg"},
        {"id": "rm-3", "name": "建筑与城市景观 (Architettura e Urban Planning)", "level": "Both", "description": "将造型艺术融入城市街区规划的跨界学科，立足罗马独特的市容地貌。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/rm_arch.jpg"},
        {"id": "rm-4", "name": "艺术策划与展示 (Museografia e Allestimento)", "level": "Graduate", "description": "侧重艺术陈列及场馆布展管理的设计高级课程。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/rm_museo.jpg"},
        {"id": "rm-5", "name": "视觉传达与平面设计 (Grafica)", "level": "Both", "description": "训练企业VI视觉系统、排印、海报以及各类纸媒质感的高级平面设计人才。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/rm_graphic.jpg"}
    ]'::jsonb,
    4
),
(
    'venezia',
    '威尼斯美术学院',
    'Accademia di Belle Arti di Venezia',
    '1750年',
    'https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/academy-logos/venezia.png',
    'https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/academy-hero/venezia.jpg',
    '威尼斯美术学院建校于1750年水城威尼斯，初代院长为提埃坡罗。这所学校深受威尼斯画派的色彩影响。现在，得益于享誉世界的威尼斯双年展和威尼斯电影节，这里的学生能够无缝链接最前沿的全球艺术展览与艺术家资源。',
    '[
        {"id": "ve-1", "name": "新艺术技术-艺术与沟通语言 (NTA)", "level": "Both", "description": "王牌数字专业，包含影像制作、声音设计及三维互动内容的计算机辅助制作。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/ve_nta.jpg"},
        {"id": "ve-2", "name": "舞台与服装及布景美术 (Scenografia e Costumi)", "level": "Both", "description": "意大利最具优势的舞美课程之一，包含舞台建筑环境构建和演出特效服装制作。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/ve_scene.jpg"},
        {"id": "ve-3", "name": "绘画与色彩研究 (Pittura)", "level": "Both", "description": "继承威尼斯画派遗风，通过大画幅、各种实验色彩颜料来表现当代观念绘画。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/ve_pittura.jpg"},
        {"id": "ve-4", "name": "当代首饰设计 (Contemporary Jewelry Design)", "level": "Graduate", "description": "专门设立的金属打制及跨媒介首饰小体量雕塑艺术课程。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/ve_jewelry.jpg"},
        {"id": "ve-5", "name": "艺术教育与公关传播 (Educazione, Mediazione e Comunicazione)", "level": "Both", "description": "如何向大众或媒体策划展览与推流艺术理念的核心公共活动类专业。", "thumbnail": "https://nrtosjllfvwfquolqixb.supabase.co/storage/v1/object/public/images/majors/ve_com.jpg"}
    ]'::jsonb,
    5
);
