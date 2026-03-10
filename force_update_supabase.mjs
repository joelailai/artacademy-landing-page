import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const SUPABASE_URL = 'https://ypfnwbkjojocdjwvanfe.supabase.co';

console.log('=== Supabase Table Editor 自动更新脚本 ===');
console.log('由于前端使用的是仅供读取的 Anon Key，受 Row Level Security (RLS) 限制无法直接跨端写入。');
console.log('为了帮您自动更新键值，请提供您的 Supabase Service Role Key (service_role secret)。');
console.log('（您可以在 Supabase Dashboard -> Project Settings -> API 页面找到它）\n');

rl.question('请输入您的 Service Role Key: ', async (serviceKey) => {
    if (!serviceKey.trim()) {
        console.error('错误: Key 不能为空，操作取消。');
        rl.close();
        return;
    }

    const supabase = createClient(SUPABASE_URL, serviceKey.trim());

    console.log('\n[1/3] 正在验证凭据并连接到 Supabase...');

    try {
        // 写入 Header Logo (使用与 Footer 相同的占位测试图片)
        console.log('[2/3] 正在更新 logo_header_url...');
        const { error: error1 } = await supabase
            .from('site_settings')
            .upsert({
                key: 'logo_header_url',
                value: 'https://ypfnwbkjojocdjwvanfe.supabase.co/storage/v1/object/public/YA/logo-AADS.png'
            }, { onConflict: 'key' });

        if (error1) throw error1;

        // 清理旧的 logo_url (可选，但推荐)
        console.log('[3/3] 正在清理旧的 logo_url 字段...');
        const { error: error2 } = await supabase
            .from('site_settings')
            .delete()
            .eq('key', 'logo_url');

        if (error2) throw error2;

        console.log('\n✅ 更新成功！顶部 Logo 和底部 Logo 配置项均已生成完毕。');
        console.log('请刷新您的本地开发网页 http://localhost:3000 ，顶部应该可以显示出图片了。');

    } catch (err) {
        console.error('\n❌ 更新失败。原因:', err.message);
        if (err.code === '42501') {
            console.error('提示: 权限不足。您可能输入了 anon_key，请确保输入的是 service_role key。');
        }
    } finally {
        rl.close();
    }
});
```
