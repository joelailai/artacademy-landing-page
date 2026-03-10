import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBuckets() {
    console.log("Fetching all storage buckets...");
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error("Error fetching buckets:", error.message);
        return;
    }

    if (!buckets || buckets.length === 0) {
        console.log("No buckets found in this project.");
        return;
    }

    console.log(`Found ${buckets.length} buckets:`);
    for (const b of buckets) {
        console.log(`- ${b.name} (public: ${b.public})`);

        // Let's check the root of each bucket to see if we can find 'milan' or 'florence'
        const { data: items } = await supabase.storage.from(b.name).list();
        if (items && items.length > 0) {
            console.log(`  Contents inside '${b.name}':`);
            items.forEach(item => console.log(`    - ${item.name}`));
        } else {
            console.log(`  (Bucket '${b.name}' is empty)`);
        }
    }
}

checkBuckets();
