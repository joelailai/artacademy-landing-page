import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Use service role key if available for administrative bypass, otherwise try anon
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Key in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCampuses() {
    console.log("Checking DB for 'milan' and 'florence' admission_results...");

    const { data, error } = await supabase
        .from('campuses')
        .select('slug, admission_results')
        .in('slug', ['milan', 'florence']);

    if (error) {
        console.error("Error querying campuses:", error);
        return;
    }

    data.forEach(campus => {
        console.log(`\nCampus: ${campus.slug}`);
        if (campus.admission_results && campus.admission_results.length > 0) {
            console.log(`Found ${campus.admission_results.length} admission results. First 2 URLs:`);
            console.log(campus.admission_results.slice(0, 2));
            console.log("...");
        } else {
            console.log("admission_results is empty or null!");
        }
    });
}

checkCampuses();
