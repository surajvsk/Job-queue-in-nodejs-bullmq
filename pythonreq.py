import requests

# Define the API URL
url = "http://localhost:3000/data"

# Number of times to trigger the API
num_requests = 500

# Loop to make the requests
for i in range(num_requests):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors (e.g., 404, 500)
        print(f"Request {i+1}/{num_requests} successful - Status Code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Request {i+1}/{num_requests} failed - Exception: {e}")

print("All requests completed.")
