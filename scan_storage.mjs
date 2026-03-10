import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function scanDirs(bucket, pathStr) {
    const { data: items, error } = await supabase.storage.from(bucket).list(pathStr);
    if (error) {
        console.error(`Error listing ${pathStr}:`, error.message);
        return;
    }

    if (!items || items.length === 0) return;

    for (const item of items) {
        const fullPath = pathStr ? `${pathStr}/${item.name}` : item.name;
        // Supabase list returns id=null for folders
        if (!item.id) {
            console.log(`[DIR] ${fullPath}`);
            await scanDirs(bucket, fullPath);
        } else {
            // It's a file
            if (item.name.endsWith('.png') || item.name.endsWith('.jpg')) {
                console.log(`  -> [FILE] ${fullPath}`);
            }
        }
    }
}

async function findImages() {
    console.log("Scanning 'images' bucket...");
    await scanDirs('images', '');
}

findImages();
