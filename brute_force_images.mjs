import https from 'https';

const PROJECT_ID = 'ypfnwbkjojocdjwvanfe';
const BUCKET = 'images';

// Try different permutations of the path that might happen when users drag-and-drop folders into the Supabase UI
const testPaths = [
    // 1. The path we expect: images/admission-results/milan/2025_14.png
    `admission-results/milan/2025_14.png`,

    // 2. The user might have dropped the folder directly into 'images' root: images/milan/2025_14.png
    `milan/2025_14.png`,

    // 3. The user might have dragged the "录取通知桌面" root folder: images/米兰/2025_14.png
    `米兰/2025_14.png`,

    // 4. The user might have dropped just the files into the root: images/2025_14.png
    `2025_14.png`,

    // 5. Florence: images/admission-results/florence/2025_13.png
    `admission-results/florence/2025_13.png`,

    // 6. Florence direct: images/florence/2025_13.png
    `florence/2025_13.png`,

    // 7. Florence Chinese: images/佛罗伦萨/2025_13.png
    `佛罗伦萨/2025_13.png`,

    // 8. Florence root:
    `2025_13.png`
];

console.log(`Testing Public URLs for Project: ${PROJECT_ID}\n`);

async function testUrl(pathStr) {
    const url = `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${BUCKET}/${encodeURI(pathStr)}`;

    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`✅ FOUND! ${pathStr}`);
                console.log(`   URL: ${url}`);
                resolve(url);
            } else {
                resolve(null);
            }
        }).on('error', () => resolve(null));
    });
}

async function run() {
    let found = false;
    for (const p of testPaths) {
        process.stdout.write(`Testing ${p} ... `);
        const url = await testUrl(p);
        if (url) {
            found = true;
        } else {
            console.log(`❌ 404 Not Found`);
        }
    }

    if (!found) {
        console.log("\n⚠️ NONE of the common path combinations worked. The bucket might still be private, empty, or the files have completely different names.");
    }
}

run();
