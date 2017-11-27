import unittest
from selenium import webdriver

class GUITest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.browser = webdriver.Firefox()
        cls.browser.implicitly_wait(30)
        cls.addCleanup(cls.browser.quit)

    def testPageTitle(self):
        self.browser.get("museumary.me")
        self.assertIn("Art Museum Database", self.browser.title)

    def testArtistLink(self):
        self.browser.get("museumary.me")
        artists = driver.findElement(By.linkText("Artists"));


    def testSearch(self):
        search_field = self.browser.find_element_by_class_name("input-group")
        search_field.clear()

        search_term = "albert"
        search_field.send_keys(search_term)
        search_field.submit()

        links = self.browser.find_element_by_class_name("row")
        print(links)

if __name__ == "__main__":
    unittest.main()