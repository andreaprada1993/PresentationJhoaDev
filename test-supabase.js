import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    const value = rest.join('=');
    if (key && value) {
        envVars[key.trim()] = value.trim();
    }
});

const url = envVars['VITE_SUPABASE_URL'];
const key = envVars['VITE_SUPABASE_ANON_KEY'];

const supabase = createClient(url, key);

async function test() {
    console.log('Testing Supabase Connection...');
    const { data, error } = await supabase.from('projects').select('*').limit(1);
    if (error) {
        console.error('SELECT ERROR:', JSON.stringify(error, null, 2));
    } else {
        console.log('Successfully connected to Supabase. Projects query returned.');
    }

    // Test Insert
    console.log('Testing insert to projects...');
    const insertRes = await supabase.from('projects').insert([{
        title: 'Test Project',
        description: 'Testing insert from script',
        imageurl: 'https://via.placeholder.com/150',
        tags: ['test'],
        live_url: '',
        github_url: ''
    }]);

    if (insertRes.error) {
        console.error('INSERT ERROR:', JSON.stringify(insertRes.error, null, 2));
    } else {
        console.log('Successfully inserted a test project.');
    }
}
test();
