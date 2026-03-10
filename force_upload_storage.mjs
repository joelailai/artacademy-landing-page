import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// CRITICAL: We MUST use the service_role key to bypass storage upload restrictions 
// since we haven't set up public upload policies for the 'images' bucket.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("FATAL: Missing SUPABASE_SERVICE_ROLE_KEY in .env");
    console.error("Please add SUPABASE_SERVICE_ROLE_KEY=your_service_role_key to .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function uploadFiles(campusName, folderPath, dbSlug) {
    console.log(`\n=== Forcing Upload: ${campusName} (${dbSlug}) ===`);

    if (!fs.existsSync(folderPath)) {
        console.error(`Folder not found: ${folderPath}`);
        return;
    }

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
    files.sort((a, b) => b.localeCompare(a));
    console.log(`Found ${files.length} files. First processing: ${files[0]}`);

    const bucketName = 'images';
    const storagePathPrefix = `admission-results/${dbSlug}`;

    // Check if bucket exists, if not, create it
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets.some(b => b.name === bucketName)) {
        console.log(`Bucket '${bucketName}' not found. Creating it...`);
        await supabase.storage.createBucket(bucketName, { public: true });
    }

    let successCount = 0;

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const fileBuffer = fs.readFileSync(filePath);
        const destinationPath = `${storagePathPrefix}/${file}`;
        const contentType = file.endsWith('.png') ? 'image/png' : 'image/jpeg';

        console.log(`Uploading ${destinationPath}...`);

        // Force upload using service_role bypass
        const { error: uploadError } = await supabase
            .storage
            .from(bucketName)
            .upload(destinationPath, fileBuffer, {
                contentType: contentType,
                upsert: true,
                cacheControl: '3600'
            });

        if (uploadError) {
            console.error(`  -> Failed: ${uploadError.message}`);
        } else {
            console.log(`  -> OK`);
            successCount++;
        }
    }
    console.log(`Completed ${campusName}: ${successCount}/${files.length} uploaded successfully.`);
}

async function main() {
    const milanFolderPath = 'C:\\Users\\RAZER\\Desktop\\录取通知\\米兰';
    const florenceFolderPath = 'C:\\Users\\RAZER\\Desktop\\录取通知\\佛罗伦萨';

    await uploadFiles('Milan', milanFolderPath, 'milan');
    await uploadFiles('Florence', florenceFolderPath, 'florence');

    console.log("\nALL UPLOADS FINISHED.");
}

main().catch(console.error);
