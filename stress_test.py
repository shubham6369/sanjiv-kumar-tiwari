import time
import concurrent.futures
import requests

URL = "https://sanjeevkumartiwari.com"
CONCURRENCY = 10
TOTAL_REQUESTS = 100

def fetch_url(url):
    try:
        start_time = time.time()
        response = requests.get(url, timeout=10)
        end_time = time.time()
        return response.status_code, end_time - start_time
    except Exception as e:
        return "ERROR", str(e)

def run_stress_test():
    print(f"Starting Stress Test on {URL}...")
    print(f"Concurrency: {CONCURRENCY}, Total Requests: {TOTAL_REQUESTS}")
    
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=CONCURRENCY) as executor:
        future_to_url = {executor.submit(fetch_url, URL): i for i in range(TOTAL_REQUESTS)}
        for future in concurrent.futures.as_completed(future_to_url):
            results.append(future.result())

    success_codes = [r[0] for r in results if isinstance(r[0], int) and r[0] == 200]
    total_time = [r[1] for r in results if isinstance(r[1], float)]
    
    avg_time = sum(total_time) / len(total_time) if total_time else 0
    success_rate = (len(success_codes) / TOTAL_REQUESTS) * 100
    
    print("\n--- RESULTS ---")
    print(f"Total Requests: {TOTAL_REQUESTS}")
    print(f"Succesful (200 OK): {len(success_codes)}")
    print(f"Success Rate: {success_rate}%")
    print(f"Average Response Time: {avg_time:.4f}s")
    print(f"Fastest Request: {min(total_time) if total_time else 0:.4f}s")
    print(f"Slowest Request: {max(total_time) if total_time else 0:.4f}s")

if __name__ == "__main__":
    run_stress_test()
