import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Key in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadFilesAndUpdateDB(campusName, folderPath, dbSlug) {
    console.log(`\n=== Processing ${campusName} (${dbSlug}) ===`);

    if (!fs.existsSync(folderPath)) {
        console.error(`Folder not found: ${folderPath}`);
        return;
    }

    // Read files and sort them descending (newest year first)
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
    files.sort((a, b) => b.localeCompare(a));
    console.log(`Found ${files.length} files. Newest first: ${files[0]}`);

    const publicUrls = [];
    const bucketName = 'images';
    const storagePathPrefix = `admission-results/${dbSlug}`;

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const fileBuffer = fs.readFileSync(filePath);
        const destinationPath = `${storagePathPrefix}/${file}`;
        const contentType = file.endsWith('.png') ? 'image/png' : 'image/jpeg';

        console.log(`Uploading ${file}...`);
        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from(bucketName)
            .upload(destinationPath, fileBuffer, {
                contentType: contentType,
                upsert: true
            });

        if (uploadError) {
            console.error(`Failed to upload ${file}:`, uploadError.message);
            continue;
        }

        // Get public URL
        const { data: publicUrlData } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(destinationPath);

        publicUrls.push(publicUrlData.publicUrl);
    }

    console.log(`Successfully uploaded ${publicUrls.length} files for ${campusName}.`);

    // Update Database
    console.log(`Updating campuses table for slug: ${dbSlug}...`);
    const { data: updateData, error: updateError } = await supabase
        .from('campuses')
        .update({ admission_results: publicUrls })
        .eq('slug', dbSlug);

    if (updateError) {
        console.error(`Error updating DB for ${dbSlug}:`, updateError.message);
    } else {
        console.log(`Database updated successfully for ${dbSlug}!`);
    }
}

async function main() {
    const milanFolderPath = 'C:\\Users\\RAZER\\Desktop\\录取通知\\米兰';
    const florenceFolderPath = 'C:\\Users\\RAZER\\Desktop\\录取通知\\佛罗伦萨';

    await uploadFilesAndUpdateDB('Milan', milanFolderPath, 'milan');
    await uploadFilesAndUpdateDB('Florence', florenceFolderPath, 'florence');

    console.log("\nAll done!");
}

main().catch(console.error);
