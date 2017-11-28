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
        r = requests.get('http://api.museumary.me/artist/5285')
        json = r.json()
        self.assertEqual("Abraham Walkowitz", json['name'])

    def test_artist_2(self):
        """
        Make a request with optional parameters and check correct
        """
        parameters = {
            'page': 6,
            'entries_per_page': 15
        }

        r = requests.get('http://api.museumary.me/artist/', params=parameters)
        json = r.json()
        self.assertEqual(6, json['info']['page'])
        self.assertEqual(15, json['info']['entries_per_page'])

    def test_artist_3(self):
        """
        Ensure work id is contained within corresponding artist
        """
        r = requests.get('http://api.museumary.me/artist/5851')
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

        r = requests.get('http://api.museumary.me/artist/', params=parameters)
        json = r.json()
        self.assertEqual(15, len(json['objects']))
        

    # Test Medium API Requests
    def test_medium_1(self):
        """
        Request a single medium with the given id
        """
        r = requests.get('http://api.museumary.me/medium/411')
        json = r.json()
        self.assertEqual("10 archival pigment prints in portfolio box", json['name'])

    def test_medium_2(self):
        """
        Make a request with optional parameters and check correct
        """
        parameters = {
            'page': 6,
            'entries_per_page': 15
        }

        r = requests.get('http://api.museumary.me/medium', params=parameters)
        json = r.json()
        self.assertEqual(6, json['info']['page'])
        self.assertEqual(15, json['info']['entries_per_page'])

    def test_medium_3(self):
        """
        Ensure work id is contained within corresponding medium
        """
        r = requests.get('http://api.museumary.me/medium/411')
        json = r.json()
        self.assertTrue(6259 in json['work_ids'])


    # Test Venue API Requests
    def test_venue_1(self):
        """
        Request a single venue with the given id
        """
        r = requests.get('http://api.museumary.me/venue/1')
        json = r.json()
        self.assertEqual("Harvard Art Museum", json['name'])



    # Test Work API Requests
    def test_work_1(self):
        """
        Request a single work with the given id
        """
        r = requests.get('http://api.museumary.me/work/6350')
        json = r.json()
        self.assertEqual("A Box of Ku (290)", json['name'])

    def test_work_2(self):
        """
        Make a request with optional parameters and check correct
        """
        parameters = {
            'page': 9,
            'entries_per_page': 30
        }

        r = requests.get('http://api.museumary.me/work', params=parameters)
        json = r.json()
        self.assertEqual(9, json['info']['page'])
        self.assertEqual(30, json['info']['entries_per_page'])

    def test_work_3(self):
        """
        Ensure work id is contained within corresponding medium
        """
        r = requests.get('http://api.museumary.me/medium/411')
        json = r.json()
        self.assertTrue(6259 in json['work_ids'])

    def test_work_4(self):
        """
        Request a single work with the given id
        """
        r = requests.get('http://api.museumary.me/work/6350')
        json = r.json()
        self.assertEqual(3307, json['artist_id'])


    # Test ArtType API Requests
    def test_arttype_1(self):
        """
        Request a single art_type with the given id
        """
        r = requests.get('http://api.museumary.me/art_type/79')
        json = r.json()
        self.assertEqual("Altered Readymade", json['name'])

    def test_arttype_2(self):
        """
        Request a single art_type with the given id
        """
        r = requests.get('http://api.museumary.me/art_type/79')
        json = r.json()
        self.assertTrue(6635 in json['work_ids'])

if __name__ == '__main__':
    unittest.main()
