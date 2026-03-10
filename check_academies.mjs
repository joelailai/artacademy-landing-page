import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_KEY);

async function checkAcademies() {
    console.log("Fetching academies from DB...");
    const { data, error } = await supabase
        .from('academies')
        .select('slug, name, sort_order')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error("Error reading academies:", error.message);
        return;
    }

    if (!data || data.length === 0) {
        console.log("WARNING: academies table is EMPTY or blocked by RLS.");
    } else {
        console.log(`Found ${data.length} academies. Order returned by API:`);
        data.forEach((a, index) => {
            console.log(`${index + 1}. [${a.sort_order}] ${a.name} (${a.slug})`);
        });
    }
}

checkAcademies();
