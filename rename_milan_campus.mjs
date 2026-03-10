import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ypfnwbkjojocdjwvanfe.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZm53Ymtqb2pvY2Rqd3ZhbmZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjU3MTc0MSwiZXhwIjoyMDg4MTQ3NzQxfQ.jmF5kgRn_TB7K3svGjO8lgW2o_RUPn0l6P-VzGrOjAg';

async function run() {
    const supabase = createClient(SUPABASE_URL, serviceKey);

    console.log('正在重命名米兰校区...');
    const { error } = await supabase
        .from('campuses')
        .update({
            name: '米兰校区',
            description: '位于全球时尚与设计之都的核心区域。米兰校区配备了顶尖的数字媒体实验室、打版工作室和材料库，紧密连接产业前沿，专注于设计与时尚类专业辅导。'
        })
        .eq('slug', 'milan');

    if (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }

    console.log('✅ 更新成功！');
    process.exit(0);
}

run();
