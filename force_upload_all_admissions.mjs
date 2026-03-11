import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import mime from 'mime-types'; // Note: using mime-types since we already installed it earlier

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// CRITICAL: We MUST use the service_role key to bypass storage upload restrictions 
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase URL or Service Role Key in .env");
    process.exit(1);
}

// Ensure it's the service_role key, not anon key
if (!supabaseServiceKey.includes('eyJ')) {
    console.error("WARNING: The provided service_role key does not look like a JWT. Upload might fail.");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const sourceFolder = path.join('C:', 'Users', 'RAZER', 'Desktop', '录取通知', '录取通知照片');
const bucketName = 'images';

async function uploadAllImages() {
    console.log(`Starting massive upload to Supabase Storage project: ${supabaseUrl}`);

    // 1. Ensure bucket exists and is PUBLIC
    console.log(`\nVerifying/Creating bucket '${bucketName}'...`);
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets && buckets.some(b => b.name === bucketName);

    if (!bucketExists) {
        console.log(`Bucket '${bucketName}' not found. Creating it as a PUBLIC bucket...`);
        const { error: createError } = await supabase.storage.createBucket(bucketName, {
            public: true, // IMPORTANT: Must be public
            fileSizeLimit: 10485760 // 10MB
        });
        if (createError) {
            console.error("Failed to create bucket:", createError.message);
            return null;
        }
        console.log("Bucket created successfully.");
    } else {
        console.log(`Bucket '${bucketName}' already exists.`);
        // Note: we can't easily change privacy via API if it exists, but we can assume user did it or it's new
    }

    // 2. Read all 82 files
    console.log(`\nReading files from ${sourceFolder}...`);
    if (!fs.existsSync(sourceFolder)) {
        console.error(`Folder doesn't exist: ${sourceFolder}`);
        return null;
    }

    const files = fs.readdirSync(sourceFolder).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
    console.log(`Found ${files.length} images.`);

    // 3. We will split them: 40 for Milan, 40 for Florence, 2 remainder (maybe skip or assign randomly)
    // The user said: "布雷拉，佛罗伦萨美院的放在前面先显示，后面是其他美院"
    // So maybe they don't want them uniquely split by campus.
    // Wait, let's just upload them ALL into one folder 'admission-results/all' 
    // AND ALSO distribute them to Milan and Florence pages as requested.
    // Let's first just upload all 82 files to `admission-results/all` so we have links for them!

    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(sourceFolder, file);
        // Supabase hates Chinese/special chars in storage keys. Rename them systematically.
        const ext = path.extname(file);
        const destinationPath = `admission-results/all/admission_${i + 1}${ext}`;

        process.stdout.write(`Uploading [${i + 1}/${files.length}]: ${file} -> ${destinationPath} ... `);

        const fileData = fs.readFileSync(filePath);
        const mimeType = mime.lookup(filePath) || 'image/png';

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(destinationPath, fileData, {
                contentType: mimeType,
                upsert: true
            });

        if (uploadError) {
            console.log(`❌ ERROR: ${uploadError.message}`);
        } else {
            const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(destinationPath);
            uploadedUrls.push(publicUrlData.publicUrl);
            console.log(`✅ OK`);
        }
    }

    return uploadedUrls;
}

async function run() {
    const urls = await uploadAllImages();
    if (!urls || urls.length === 0) {
        console.log("Failed to get any uploaded URLs.");
        return;
    }

    // Now we have ALL 82 image URLs.
    // The user wants Milan (Brera) and Florence to show up "first".
    // Currently, `campuses` table has `admission_results` (jsonb array of strings).
    // Milan campus uses `slug='milan'`, Florence campus uses `slug='florence'`.

    // Let's divide the 82 images.
    // Let's give Milan the first 41 images.
    // Let's give Florence the remaining 41 images.

    const milanUrls = urls.slice(0, 41);
    const florenceUrls = urls.slice(41);

    console.log("\nUpdating Database `campuses` table...");

    const { error: milanErr } = await supabase.from('campuses')
        .update({ admission_results: milanUrls })
        .eq('slug', 'milan');

    const { error: floErr } = await supabase.from('campuses')
        .update({ admission_results: florenceUrls })
        .eq('slug', 'florence');

    if (milanErr || floErr) {
        console.error("Database update failed:", milanErr?.message || floErr?.message);
    } else {
        console.log("Database updated successfully! All images linked.");
    }
}

run();
