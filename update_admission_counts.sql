-- 本脚本用于向现有的两个校区大量填充录取成果展示图片，每个校区 20 张

-- 1. 更新米兰校区的录取图集至 20 张
UPDATE public.campuses 
SET admission_results = '[
  "https://picsum.photos/seed/milan_adm1/600/848",
  "https://picsum.photos/seed/milan_adm2/600/848",
  "https://picsum.photos/seed/milan_adm3/600/848",
  "https://picsum.photos/seed/milan_adm4/600/848",
  "https://picsum.photos/seed/milan_adm5/600/848",
  "https://picsum.photos/seed/milan_adm6/600/848",
  "https://picsum.photos/seed/milan_adm7/600/848",
  "https://picsum.photos/seed/milan_adm8/600/848",
  "https://picsum.photos/seed/milan_adm9/600/848",
  "https://picsum.photos/seed/milan_adm10/600/848",
  "https://picsum.photos/seed/milan_adm11/600/848",
  "https://picsum.photos/seed/milan_adm12/600/848",
  "https://picsum.photos/seed/milan_adm13/600/848",
  "https://picsum.photos/seed/milan_adm14/600/848",
  "https://picsum.photos/seed/milan_adm15/600/848",
  "https://picsum.photos/seed/milan_adm16/600/848",
  "https://picsum.photos/seed/milan_adm17/600/848",
  "https://picsum.photos/seed/milan_adm18/600/848",
  "https://picsum.photos/seed/milan_adm19/600/848",
  "https://picsum.photos/seed/milan_adm20/600/848"
]'::jsonb
WHERE slug = 'milan';

-- 2. 更新佛罗伦萨校区的录取图集至 20 张
UPDATE public.campuses 
SET admission_results = '[
  "https://picsum.photos/seed/adm1/600/848",
  "https://picsum.photos/seed/adm2/600/848",
  "https://picsum.photos/seed/adm3/600/848",
  "https://picsum.photos/seed/adm4/600/848",
  "https://picsum.photos/seed/adm5/600/848",
  "https://picsum.photos/seed/adm6/600/848",
  "https://picsum.photos/seed/adm7/600/848",
  "https://picsum.photos/seed/adm8/600/848",
  "https://picsum.photos/seed/adm9/600/848",
  "https://picsum.photos/seed/adm10/600/848",
  "https://picsum.photos/seed/adm11/600/848",
  "https://picsum.photos/seed/adm12/600/848",
  "https://picsum.photos/seed/adm13/600/848",
  "https://picsum.photos/seed/adm14/600/848",
  "https://picsum.photos/seed/adm15/600/848",
  "https://picsum.photos/seed/adm16/600/848",
  "https://picsum.photos/seed/adm17/600/848",
  "https://picsum.photos/seed/adm18/600/848",
  "https://picsum.photos/seed/adm19/600/848",
  "https://picsum.photos/seed/adm20/600/848"
]'::jsonb
WHERE slug = 'florence';
