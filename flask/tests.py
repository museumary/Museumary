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

    # Test Artist API Requests
    def test_artist_1(self):
        """
        Request a single artist with the given id
        """
        r = requests.get('http://www.museumary.me/api/artist/5285')
        json = r.json()
        self.assertEqual("Abelardo Morell", json['name'])

    def test_artist_2(self):
        """
        Make a request with optional parameters and check correct
        """
        parameters = {
            'page': 6,
            'entries_per_page': 15
        }

        r = requests.get('http://www.museumary.me/api/artist/', params=parameters)
        json = r.json()
        self.assertEqual(6, json['info']['page'])
        self.assertEqual(15, json['info']['entries_per_page'])

    def test_artist_3(self):
        """
        Ensure work id is contained within corresponding artist
        """
        r = requests.get('http://www.museumary.me/api/artist/5851')
        json = r.json()
        self.assertTrue(8426 in json['work_ids'])

    def test_artist_4(self):
        """
        Ensure correct number of entries returned
        """
        parameters = {
            'page': 6,
            'entries_per_page': 15
        }

        r = requests.get('http://www.museumary.me/api/artist/', params=parameters)
        json = r.json()
        self.assertEqual(15, len(json['objects']))
        

    # Test Medium API Requests

    # Test Venue API Requests

    # Test Work API Requests

    # Test ArtType API Requests

if __name__ == '__main__':
    unittest.main()
