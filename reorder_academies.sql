-- 恢复美院排序：佛罗伦萨排第1，米兰布雷拉排第2，其他顺延
UPDATE public.academies SET sort_order = 1 WHERE slug = 'firenze';
UPDATE public.academies SET sort_order = 2 WHERE slug = 'brera';
UPDATE public.academies SET sort_order = 3 WHERE slug = 'bologna';
UPDATE public.academies SET sort_order = 4 WHERE slug = 'roma';
UPDATE public.academies SET sort_order = 5 WHERE slug = 'venezia';
