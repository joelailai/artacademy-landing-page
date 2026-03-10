import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function getStorageUrls(dbSlug, folderPath) {
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
    files.sort((a, b) => b.localeCompare(a));

    const publicUrls = [];
    const bucketName = 'images';
    const storagePathPrefix = `admission-results/${dbSlug}`;

    for (const file of files) {
        const destinationPath = `${storagePathPrefix}/${file}`;
        const { data: publicUrlData } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(destinationPath);

        publicUrls.push(publicUrlData.publicUrl);
    }
    return publicUrls;
}

async function checkAndUpload() {
    const milanFolderPath = 'C:\\Users\\RAZER\\Desktop\\录取通知\\米兰';
    const florenceFolderPath = 'C:\\Users\\RAZER\\Desktop\\录取通知\\佛罗伦萨';

    // In a restricted RLS environment where user cannot upload via JS client anon key, 
    // the only reliable way is providing instructions to the user to upload via the Supabase Dashboard UI,
    // OR generating the exact SQL to just update the DB linking to where the user *will* manually drop the files.

    const milanUrls = await getStorageUrls('milan', milanFolderPath);
    const florenceUrls = await getStorageUrls('florence', florenceFolderPath);

    const sql = `
-- 忽略外键与 RLS 直接在 DB 层面强制覆盖对应数据
UPDATE public.campuses 
SET admission_results = '${JSON.stringify(milanUrls)}'::jsonb
WHERE slug = 'milan';

UPDATE public.campuses 
SET admission_results = '${JSON.stringify(florenceUrls)}'::jsonb
WHERE slug = 'florence';
`;

    fs.writeFileSync('C:\\Users\\RAZER\\Desktop\\网站\\artacademy-landing-page\\force_update_campuses.sql', sql);
    console.log("SQL script written to force_update_campuses.sql");
}

checkAndUpload().catch(console.error);
