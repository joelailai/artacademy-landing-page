import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Key in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
    console.log("Checking Supabase Storage properties...");
    const bucketName = 'images';
    const folderPath = '';

    // 1. Check if files exist
    const { data: files, error } = await supabase.storage.from(bucketName).list(folderPath, {
        limit: 5,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
    });

    if (error) {
        console.error("Error listing files:", error.message);
        return;
    }

    if (!files || files.length === 0) {
        console.log(`No files found in bucket '${bucketName}' at path '${folderPath}'. The upload completely failed.`);
        return;
    }

    console.log(`Found ${files.length} files. First file metadata:`);
    console.log(files[0]);

    // 2. Check public URL accessibility
    const testFile = files[0].name;
    const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(`${folderPath}/${testFile}`);

    console.log(`\nTesting Public URL for ${testFile}:`);
    console.log(urlData.publicUrl);

    https.get(urlData.publicUrl, (res) => {
        console.log(`HTTP Status: ${res.statusCode}`);
        console.log(`Content-Type: ${res.headers['content-type']}`);
        console.log(`Content-Length: ${res.headers['content-length']} bytes`);
    }).on('error', (e) => {
        console.error(`Error requesting URL: ${e.message}`);
    });
}

checkStorage();
