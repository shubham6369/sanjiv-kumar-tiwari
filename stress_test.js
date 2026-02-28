import https from 'https';

const URL = "https://sanjeevkumartiwari.com";
const CONCURRENCY = 50;
const TOTAL_REQUESTS = 1000;

async function fetchUrl(url) {
    return new Promise((resolve) => {
        const start = Date.now();
        const req = https.get(url, (res) => {
            res.on('data', () => { }); // Consume stream
            res.on('end', () => {
                resolve({ status: res.statusCode, time: (Date.now() - start) / 1000 });
            });
        });

        req.on('error', (e) => {
            resolve({ status: "ERROR", error: e.message });
        });

        req.setTimeout(15000, () => {
            req.destroy();
            resolve({ status: "TIMEOUT" });
        });
    });
}

async function runStressTest() {
    process.stdout.write(`--- 1000 USERS SIMULATION --- \n`);
    process.stdout.write(`URL: ${URL}\n`);
    process.stdout.write(`Batch Size (Concurrency): ${CONCURRENCY}\n`);
    process.stdout.write(`Total simulated users: ${TOTAL_REQUESTS}\n\n`);

    const results = [];

    for (let i = 0; i < TOTAL_REQUESTS; i += CONCURRENCY) {
        process.stdout.write(`Sending batch ${i / CONCURRENCY + 1} of ${TOTAL_REQUESTS / CONCURRENCY}...\n`);
        const batch = [];
        for (let j = 0; j < CONCURRENCY && (i + j) < TOTAL_REQUESTS; j++) {
            batch.push(fetchUrl(URL));
        }
        const bResults = await Promise.all(batch);
        results.push(...bResults);
    }

    const successCodes = results.filter(r => r.status === 200);
    const errors = results.filter(r => r.status === "ERROR" || r.status === "TIMEOUT");
    const times = results.map(r => r.time).filter(t => typeof t === 'number');

    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const successRate = (successCodes.length / TOTAL_REQUESTS) * 100;

    process.stdout.write("\n--- FINAL SITE AUDIT RESULTS ---\n");
    process.stdout.write(`Total Load Simulations: ${TOTAL_REQUESTS}\n`);
    process.stdout.write(`Succesful Responses (200 OK): ${successCodes.length}\n`);
    process.stdout.write(`Failures/Timeouts: ${errors.length}\n`);
    process.stdout.write(`Success Rate: ${successRate.toFixed(2)}%\n`);
    process.stdout.write(`Average UX Response: ${avgTime.toFixed(4)}s\n`);
    process.stdout.write(`P95 Latency (Est): ${times.sort((a, b) => a - b)[Math.floor(times.length * 0.95)]?.toFixed(4)}s\n`);
}

runStressTest();
