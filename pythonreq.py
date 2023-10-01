import requests

# Define the API URL
url = "http://localhost:3000/data"

# Number of times to trigger the API
num_requests = 500

# Data to send in the request (change this as needed)
data_to_send = {"key1": "value1", "key2": "value2"}

# Loop to make the requests
for i in range(num_requests):
    try:
        response = requests.post(url, data=data_to_send)
        response.raise_for_status()  # Raise an exception for HTTP errors (e.g., 404, 500)
        print(f"Request {i+1}/{num_requests} successful - Status Code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Request {i+1}/{num_requests} failed - Exception: {e}")

print("All requests completed.")
