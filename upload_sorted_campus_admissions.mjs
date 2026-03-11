import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import mime from 'mime-types';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const bucketName = 'images';

async function uploadFolder(dbSlug, folderPath) {
    if (!fs.existsSync(folderPath)) {
        console.error("Folder not found:", folderPath);
        return [];
    }

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

    // Sort descending by name (assuming names are like 2025_14.png)
    files.sort((a, b) => b.localeCompare(a));

    const publicUrls = [];
    console.log(`\nUploading ${files.length} images for ${dbSlug}...`);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(folderPath, file);
        const ext = path.extname(file);

        // Generate a safe unique key bypassing Chinese chars
        // But since user's original filenames are '2025_14.png', those are safe!
        // We can just use the original filename to retain semantic meaning.
        const safeName = file.replace(/[^a-zA-Z0-9_.-]/g, '_');
        const destinationPath = `admission-results/${dbSlug}/${safeName}`;

        process.stdout.write(`  -> ${safeName} ... `);

        const fileData = fs.readFileSync(filePath);
        const mimeType = mime.lookup(filePath) || 'image/png';

        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(destinationPath, fileData, {
                contentType: mimeType,
                upsert: true
            });

        if (error) {
            console.log(`❌ ERROR: ${error.message}`);
        } else {
            const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(destinationPath);
            publicUrls.push(publicUrlData.publicUrl);
            console.log(`✅ OK`);
        }
    }
    return publicUrls;
}

async function run() {
    const milanPath = path.join('C:', 'Users', 'RAZER', 'Desktop', '录取通知', 'milan');
    const florencePath = path.join('C:', 'Users', 'RAZER', 'Desktop', '录取通知', 'florence');

    const milanUrls = await uploadFolder('milan', milanPath);
    const florenceUrls = await uploadFolder('florence', florencePath);

    console.log("\nUpdating Database `campuses` table...");

    if (milanUrls.length > 0) {
        const { error: milanErr } = await supabase.from('campuses')
            .update({ admission_results: milanUrls })
            .eq('slug', 'milan');
        if (milanErr) console.error("Milan DB Error:", milanErr);
    }

    if (florenceUrls.length > 0) {
        const { error: floErr } = await supabase.from('campuses')
            .update({ admission_results: florenceUrls })
            .eq('slug', 'florence');
        if (floErr) console.error("Florence DB Error:", floErr);
    }

    console.log("Database update sequence finished.");
}

run();
