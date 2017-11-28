import unittest
from selenium import webdriver

class GUITest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.browser = webdriver.Firefox()
        cls.browser.implicitly_wait(30)
        cls.browser.quit

    def testPageTitle(self):
        self.browser.get("http://museumary.me/")
        self.assertIn("Art Museum Database", self.browser.title)

    def testTwitter(self):
        self.browser.get("http://museumary.me/")
        feeds = self.browser.find_element_by_class_name("row")

    def testArtistLink(self):
        self.browser.get("http://museumary.me/")
        link = self.browser.find_element_by_link_text('Artists')
        link.click

    def testWorkLink(self):
        self.browser.get("http://museumary.me/")
        link = self.browser.find_element_by_link_text('Works')
        link.click

    def testTypeLink(self):
        self.browser.get("http://museumary.me/")
        link = self.browser.find_element_by_link_text('Types')
        link.click

    def testVenueLink(self):
        self.browser.get("http://museumary.me/")
        link = self.browser.find_element_by_link_text('Venues')
        link.click

    def testAboutLink(self):
        self.browser.get("http://museumary.me/")
        link = self.browser.find_element_by_link_text('About')
        link.click

    def testNonRootAccess(self):
        self.browser.get("http://museumary.me/artists/")
        self.assertIn("Art Museum Database", self.browser.title)


    def testSearch(self):
        self.browser.get("http://museumary.me/")
        search_field = self.browser.find_element_by_class_name("input-group")
        # search_field.clear()

        search_term = "albert\n"
        search_field.send_keys(search_term)
        # search_field.submit()

        links = self.browser.find_element_by_class_name("row")
        print(links)

if __name__ == "__main__":
    unittest.main()
