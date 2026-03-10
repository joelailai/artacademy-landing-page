import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function scanSpecificBucket() {
    console.log(`Connecting to: ${supabaseUrl}`);
    console.log("Scanning the 'images' bucket directly...");

    // Instead of listing buckets, let's just forcefully list the contents of 'images'

    // Quick test: list root
    const { data: rootItems, error: rootError } = await supabase.storage.from('images').list();

    if (rootError) {
        console.error("Failed to list 'images' bucket:", rootError.message);
        return;
    }

    if (!rootItems || rootItems.length === 0) {
        console.log("Bucket 'images' is completely empty at the root level.");
        return;
    }

    console.log("Found items at the root of 'images':");

    for (const item of rootItems) {
        // null ID means it's a folder
        if (!item.id) {
            console.log(`[DIR] /${item.name}`);

            // Scan deeper
            const { data: subItems } = await supabase.storage.from('images').list(item.name);
            if (subItems) {
                for (const subItem of subItems) {
                    if (!subItem.id) {
                        console.log(`  -> [DIR] /${item.name}/${subItem.name}`);
                        const { data: deepItems } = await supabase.storage.from('images').list(`${item.name}/${subItem.name}`);
                        if (deepItems) {
                            deepItems.forEach(d => console.log(`       -> [FILE] /${item.name}/${subItem.name}/${d.name}`));
                        }
                    } else {
                        console.log(`  -> [FILE] /${item.name}/${subItem.name}`);
                    }
                }
            }
        } else {
            console.log(`[FILE] /${item.name}`);
        }
    }
}

scanSpecificBucket();
