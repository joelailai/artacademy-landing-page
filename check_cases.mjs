import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_KEY);

async function checkCases() {
    console.log("Fetching Cases...");
    const { data, error } = await supabase.from('cases').select('*');
    if (error) {
        console.error("Error fetching cases:", error.message);
        return;
    }
    console.log(data);
}

checkCases();
