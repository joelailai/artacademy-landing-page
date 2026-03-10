import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ypfnwbkjojocdjwvanfe.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZm53Ymtqb2pvY2Rqd3ZhbmZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjU3MTc0MSwiZXhwIjoyMDg4MTQ3NzQxfQ.jmF5kgRn_TB7K3svGjO8lgW2o_RUPn0l6P-VzGrOjAg';

async function run() {
    const supabase = createClient(SUPABASE_URL, serviceKey);

    console.log('正在更新 Supabase 中的校区数据及表结构填充...');

    const florenceUpdate = {
        admission_results: [
            'https://picsum.photos/seed/adm1/600/848',
            'https://picsum.photos/seed/adm2/600/848',
            'https://picsum.photos/seed/adm3/600/848',
            'https://picsum.photos/seed/adm4/600/848',
            'https://picsum.photos/seed/adm5/600/848',
        ],
        activities: [
            { image_url: 'https://picsum.photos/seed/act1/800/600', description: '乌菲兹美术馆大师画作临摹课' },
            { image_url: 'https://picsum.photos/seed/act2/800/600', description: '佛罗伦萨双年展参展观摩' },
            { image_url: 'https://picsum.photos/seed/act3/800/600', description: '文艺复兴雕塑技法工坊' },
            { image_url: 'https://picsum.photos/seed/act4/800/600', description: '美院教授面对面作品集评估' },
        ]
    };

    const milanUpdate = {
        admission_results: [
            'https://picsum.photos/seed/milan_adm1/600/848',
            'https://picsum.photos/seed/milan_adm2/600/848',
            'https://picsum.photos/seed/milan_adm3/600/848',
            'https://picsum.photos/seed/milan_adm4/600/848',
            'https://picsum.photos/seed/milan_adm5/600/848',
        ],
        activities: [
            { image_url: 'https://picsum.photos/seed/milan_act1/800/600', description: '米兰设计周（Salone del Mobile）参展考察' },
            { image_url: 'https://picsum.photos/seed/milan_act2/800/600', description: 'Prada 基金会当代美术馆深度导览' },
            { image_url: 'https://picsum.photos/seed/milan_act3/800/600', description: '服装设计工坊：成衣剪裁与面料实验' },
            { image_url: 'https://picsum.photos/seed/milan_act4/800/600', description: '米兰理工教授交互设计体验课' },
        ]
    };

    // 1. 更新佛罗伦萨
    const { error: err1 } = await supabase.from('campuses').update(florenceUpdate).eq('slug', 'florence');

    // 2. 更新米兰
    const { error: err2 } = await supabase.from('campuses').update(milanUpdate).eq('slug', 'milan');

    if (err1 || err2) {
        console.error('更新遇到错误:', err1?.message || err2?.message);
        process.exit(1);
    }

    // 3. 可选：由于 JSONB 的特性，原来的 courses 和 institutions 列虽然在代码里已被剔除
    // 但真实存在的 supabase JSONB 列并不能简单的靠 udpate '删除'掉数据行里的它们
    // 对于 supabase 表结构的硬删除推荐使用 SQL Alter。

    console.log('✅ 测试数据插入成功。表结构与页面已完成同步匹配！');
    process.exit(0);
}

run();
