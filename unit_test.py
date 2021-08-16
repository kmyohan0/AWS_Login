from types import new_class
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import unittest
import time

driver = webdriver.Chrome('/usr/local/bin/chromedriver') # For Mac only; In case running this unit test in Windows, have chromedriver be ready in the relative folder then write "./chromedriver" to access chrome (or use any driver you prefer)
driver.get("http://localhost:3000") # Connect to React Website (or public website); need to start "npm start" first to connect to the website

# variables needed:
user_name = "" # For login username 
email = ""
pass_word = "" # For login password

class TestStringMethods(unittest.TestCase):
    def test_case_1_sign_up(self):
        # Pre-req
        driver.get("http://localhost:3000/signup")
        email_container = driver.find_element_by_xpath("//input[@name=\"email\"]")
        user_name_container = driver.find_element_by_xpath("//input[@name=\"username\"]") # form container for login page
        pass_word_container = driver.find_element_by_xpath("//input[@name=\"password\"]") # form container for login page
        submit_button = driver. find_element_by_xpath("//input[@type=\"submit\"]")
        user_name_container.send_keys(user_name)
        pass_word_container.send_keys(pass_word)
        email_container.send_keys(email)
        # Assertion
        submit_button.click()
        alert = WebDriverWait(driver, 5).until(EC.alert_is_present())
        alert_text = alert.text
        self.assertEqual(alert.text, "Success!")
        time.sleep(2) # purpose delay to make alert variable retrieve its information
        alert.accept()
    def test_case_2_sign_up_existing_account(self):
        driver.get("http://localhost:3000/signup")
        email_container = driver.find_element_by_xpath("//input[@name=\"email\"]")
        user_name_container = driver.find_element_by_xpath("//input[@name=\"username\"]") # form container for login page
        pass_word_container = driver.find_element_by_xpath("//input[@name=\"password\"]") # form container for login page
        submit_button = driver. find_element_by_xpath("//input[@type=\"submit\"]")
        user_name_container.send_keys(user_name)
        pass_word_container.send_keys(pass_word)
        email_container.send_keys(email)
        # Assertion
        submit_button.click()
        alert = WebDriverWait(driver, 5).until(EC.alert_is_present())
        alert_text = alert.text
        self.assertEqual(alert.text, "Username exists")
        time.sleep(2) # purpose delay to make alert variable retrieve its information
        alert.accept()
    def test_case_3_log_in_unverified(self):
        # sign up made, but no verification yet 
        driver.get("http://localhost:3000/login")
        user_name_container = driver.find_element_by_xpath("//input[@name=\"username\"]") # form container for login page
        pass_word_container = driver.find_element_by_xpath("//input[@name=\"password\"]") # form container for login page
        submit_button = driver. find_element_by_xpath("//input[@type=\"submit\"]")
        user_name_container.send_keys(user_name)
        pass_word_container.send_keys(pass_word)
        # Assertion
        submit_button.click()
        alert = WebDriverWait(driver, 5).until(EC.alert_is_present())
        alert_text = alert.text
        self.assertEqual(alert.text, "User has not verified yet")
        time.sleep(2) # purpose delay to make alert variable retrieve its information
        alert.accept()
    def test_case_4_log_in_wrong_credential(self):
        # sign up made, but no verification yet 
        driver.get("http://localhost:3000/login")
        pass_word = "Wrongpassword1!"
        user_name_container = driver.find_element_by_xpath("//input[@name=\"username\"]") # form container for login page
        pass_word_container = driver.find_element_by_xpath("//input[@name=\"password\"]") # form container for login page
        submit_button = driver. find_element_by_xpath("//input[@type=\"submit\"]")
        user_name_container.send_keys(user_name)
        pass_word_container.send_keys(pass_word)
        # Assertion
        submit_button.click()
        alert = WebDriverWait(driver, 5).until(EC.alert_is_present())
        alert_text = alert.text
        self.assertEqual(alert.text, "Username or Password is not correct")
        time.sleep(2)
        alert.accept()
    def test_case_5_log_in_verified_account(self):
        driver.get("http://localhost:3000/login")
        user_name = "master"
        pass_word = "Password1!"
        user_name_container = driver.find_element_by_xpath("//input[@name=\"username\"]") # form container for login page
        pass_word_container = driver.find_element_by_xpath("//input[@name=\"password\"]") # form container for login page
        submit_button = driver. find_element_by_xpath("//input[@type=\"submit\"]")
        user_name_container.send_keys(user_name)
        pass_word_container.send_keys(pass_word)
        # Assertion
        submit_button.click()
        alert = WebDriverWait(driver, 5).until(EC.alert_is_present())
        alert_text = alert.text
        self.assertEqual(alert.text, "Success!")
        time.sleep(2)
        alert.accept()
    def test_case_6_check_if_login_is_active_when_closed(self):
        # For the purpose of testing, I've created a confirmed user account (account that needs to change its password (when user is created by Cognito website) cannot be used)
        driver.get("http://localhost:3000/login")
        user_name_container = driver.find_element_by_xpath("//input[@name=\"username\"]") # form container for login page
        pass_word_container = driver.find_element_by_xpath("//input[@name=\"password\"]") # form container for login page
        submit_button = driver. find_element_by_xpath("//input[@type=\"submit\"]")
        user_name_container.send_keys(user_name)
        pass_word_container.send_keys(pass_word)
        submit_button.click()
        alert = WebDriverWait(driver, 5).until(EC.alert_is_present())
        alert_text = alert.text
        time.sleep(2)
        alert.accept()
        driver.execute_script('''window.open("http://localhost:3000/hidden","_blank");''') # Open tab to differentiate the tab content, to check if credential remains in the browser
        welcome_text = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//p[@name=\"hidden_content\"]"))).text
        print(welcome_text)
        self.assertEqual(welcome_text, "Hi kmyohan01!")
        driver.quit()

    def close_driver(self):
        driver.quit()
    
if __name__ == '__main__':
    unittest.main()
