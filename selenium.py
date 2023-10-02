from selenium import webdriver
import requests
import time

# Initialize the Selenium WebDriver (Chrome in this example)
driver = webdriver.Chrome(executable_path='/path/to/chromedriver')

# URL of the web page you want to interact with
webpage_url = 'http://example.com'

# API endpoint URL
api_url = 'http://localhost:3000/template-reviewer/download-qp/418/14735'

try:
    # Navigate to the web page
    driver.get(webpage_url)

    # Perform some interactions on the web page using Selenium
    # For example, find an element and click it
    element = driver.find_element_by_id('example-button')
    element.click()

    # Wait for any necessary page changes or animations to complete
    time.sleep(2)

    # Trigger the API call using the 'requests' library
    response = requests.get(api_url)

    # Print the API response
    print('API Response:', response.text)

except Exception as e:
    print('An error occurred:', str(e))

finally:
    # Close the browser when done
    driver.quit()
