import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_KEY);

async function check() {
    const lines = [];

    // 查看录取图片
    const { data: campuses } = await supabase.from('campuses').select('slug, admission_results');
    for (const c of campuses) {
        lines.push(`\n=== ${c.slug} campus: ${c.admission_results?.length || 0} admission images ===`);
        c.admission_results?.forEach((url, i) => lines.push(`  [${i}] ${url.substring(url.lastIndexOf('/') + 1)}`));
    }

    // 查看学生心声
    const { data: testimonials } = await supabase.from('testimonials').select('*').order('campus_slug').order('sort_order');
    lines.push('\n=== Testimonials ===');
    for (const t of testimonials) {
        const cleaned = t.content.replace(/\s{2,}/g, ' ').trim();
        const hasExtraSpaces = t.content !== cleaned;
        lines.push(`[${t.campus_slug}] id=${t.id} ${t.student_name}: "${t.content}"`);
        if (hasExtraSpaces) lines.push(`  >>> EXTRA SPACES DETECTED. Cleaned: "${cleaned}"`);
    }

    fs.writeFileSync('check_data_output.txt', lines.join('\n'), 'utf-8');
    console.log('Output written to check_data_output.txt');
}
check();
