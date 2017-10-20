"""
Unit Testing for Museumary Project
"""

import unittest
import requests


class TestMuseumaryProject(unittest.TestCase):
    """
    Testing the main Museumary page
    """

    def test_website_up(self):
        """
        Check if the webiste is online. 200 status code = OK
        """
        r = requests.get('http://www.museumary.me/')
        self.assertEqual(r.status_code, 200)


if __name__ == '__main__':
    unittest.main()
