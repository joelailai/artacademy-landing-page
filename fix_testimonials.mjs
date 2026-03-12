import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fix() {
    const lines = [];

    // ============================================================
    // 1. 修复学生心声：去除换行符和多余空格，修正标点
    // ============================================================
    const { data: testimonials } = await supabase.from('testimonials').select('*').order('campus_slug').order('sort_order');
    lines.push('=== Fixing Testimonials ===');

    for (const t of testimonials) {
        // 去除换行符，合并多余空格
        let cleaned = t.content
            .replace(/\r\n/g, '')   // 去除 Windows 换行
            .replace(/\n/g, '')     // 去除 Unix 换行
            .replace(/\s{2,}/g, ' ') // 合并多余空格
            .trim();

        // 修正标点：英文逗号后的空格改为中文逗号（仅在中文语境中）
        // 只处理被中文字符包围的英文逗号
        cleaned = cleaned.replace(/([^\x00-\x7F])\s*,\s*/g, '$1，');

        if (cleaned !== t.content) {
            lines.push(`[${t.campus_slug}] id=${t.id} ${t.student_name}: FIXING`);
            lines.push(`  BEFORE: "${t.content.substring(0, 60)}..."`);
            lines.push(`  AFTER:  "${cleaned.substring(0, 60)}..."`);

            const { error } = await supabase
                .from('testimonials')
                .update({ content: cleaned })
                .eq('id', t.id);

            if (error) {
                lines.push(`  ERROR: ${error.message}`);
            } else {
                lines.push(`  OK`);
            }
        } else {
            lines.push(`[${t.campus_slug}] id=${t.id} ${t.student_name}: NO CHANGE NEEDED`);
        }
    }

    // ============================================================
    // 2. 检查录取图片的完整 URL（用于确认分组情况）
    // ============================================================
    const { data: campuses } = await supabase.from('campuses').select('slug, admission_results');
    for (const c of campuses) {
        lines.push(`\n=== ${c.slug} admission_results full URLs ===`);
        c.admission_results?.slice(0, 3).forEach((url, i) => lines.push(`  [${i}] ${url}`));
        if (c.admission_results?.length > 3) lines.push(`  ... (${c.admission_results.length} total)`);
    }

    fs.writeFileSync('fix_output.txt', lines.join('\n'), 'utf-8');
    console.log('Done. See fix_output.txt');
}
fix();
