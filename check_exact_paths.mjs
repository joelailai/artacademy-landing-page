import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRealPaths() {
    const { data: buckets } = await supabase.storage.listBuckets();
    console.log("Existing buckets:", buckets.map(b => b.name));

    if (!buckets.some(b => b.name === 'images')) {
        console.log("Bucket 'images' still does not exist.");
        return;
    }

    const { data: items, error } = await supabase.storage.from('images').list();
    if (error) {
        console.log("Error listing 'images':", error);
        return;
    }

    console.log("Root items inside 'images':", items.map(i => i.name));
}

checkRealPaths();
