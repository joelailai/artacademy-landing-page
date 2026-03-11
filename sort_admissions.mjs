import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const milanPath = path.join('C:', 'Users', 'RAZER', 'Desktop', '录取通知', 'milan');
const florencePath = path.join('C:', 'Users', 'RAZER', 'Desktop', '录取通知', 'florence');

function getSortedPublicUrls(folderPath) {
    if (!fs.existsSync(folderPath)) {
        console.error("Folder not found:", folderPath);
        return [];
    }

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

    // Sort descending by name (assuming names are like 2025_14.png)
    files.sort((a, b) => b.localeCompare(a));

    const urls = [];
    for (const file of files) {
        // We know from earlier brutal scans that the files were uploaded by the user to:
        // admission-results/milan/2025_14.png
        // But wait! We just uploaded all 82 files to `admission-results/all/admission_XXX.png`.
        // However, the files in Desktop/milan and Desktop/florence are 20 files each!
        // We need to re-upload just these 20 files to ensure they match exactly what's in the folder and are named properly.
        // Actually, if we just use the public bucket and the files the user ALREADY put in `milan` and `florence` folders...
        // Wait, did the user upload them to `admission-results/milan` or just `milan`? 
        // Let's re-upload them perfectly now that we have the service role!
    }
}
