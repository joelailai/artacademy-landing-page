import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ypfnwbkjojocdjwvanfe.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZm53Ymtqb2pvY2Rqd3ZhbmZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjU3MTc0MSwiZXhwIjoyMDg4MTQ3NzQxfQ.jmF5kgRn_TB7K3svGjO8lgW2o_RUPn0l6P-VzGrOjAg'; // provided by user

async function run() {
    console.log('[1/3] 正在通过 Service Role Key 连接 Supabase...');
    const supabase = createClient(SUPABASE_URL, serviceKey);

    try {
        console.log('[2/3] 正在强制覆盖 logo_header_url...');
        const { error: error1 } = await supabase
            .from('site_settings')
            .upsert({
                key: 'logo_header_url',
                value: 'https://ypfnwbkjojocdjwvanfe.supabase.co/storage/v1/object/public/YA/logo-AADS.png'
            }, { onConflict: 'key' });

        if (error1) throw error1;

        console.log('[3/3] 正在清理旧的 logo_url 字段...');
        const { error: error2 } = await supabase
            .from('site_settings')
            .delete()
            .eq('key', 'logo_url');

        if (error2) throw error2;

        console.log('\n✅ 更新成功！');
        process.exit(0);
    } catch (err) {
        console.error('\n❌ 更新失败。原因:', err.message);
        process.exit(1);
    }
}

run();
