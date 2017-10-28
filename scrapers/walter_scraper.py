#!/usr/bin/env python3

import requests
from API_KEYS import WALTER_KEY  # , REQUIREMENTS
from models import db, Work, Artist, ArtType, Venue, Medium

BASE_URL = 'http://api.thewalters.org/v1/'
IMAGE_URL = 'http://static.thewalters.org/images/'

OBJ_URL = BASE_URL + 'objects'
COL_URL = BASE_URL + 'collections'

ignored_creators = [
    'venetian', 'irish', 'near', 'copy', 'workshop', 'master', 'painter',
    'after', 'attributed', 'style', 'house', 'follower', 'circle'
]

ignored_values = ['active', 'ca.', 'AH/AD', 'century']


def valid_item(item):
    if not item.get('Title') or not item.get('PrimaryImage') or not item.get('PrimaryImage').get('Raw'):
        return False

    creator = [a for a in item.get('Creator').split()
               if '?' not in a and a.lower() not in ignored_values]

    creator_raw = ''.join(creator)

    if len(creator) < 2 or creator[0].lower() in ignored_creators or \
               '(' not in creator_raw or ')' not in creator_raw:
        return False

    return True


def parse_artist_name(artist_raw):
    paren = artist_raw.find('(')
    return artist_raw[:paren].strip()


def parse_artist_culture(artist_raw):
    lparen = artist_raw.find('(')
    rparen = artist_raw.find(')')

    artist_raw = artist_raw[lparen + 1:rparen].replace(',', '').split()
    culture = artist_raw[0]

    if culture != 'died' and culture not in ignored_values and not any(char.isdigit() for char in culture):
        return culture

    return None


def parse_artist_dates(artist_raw, birth=None, death=None):
    culture = parse_artist_culture(artist_raw)

    lparen = artist_raw.find('(')
    rparen = artist_raw.find(')')

    artist_raw = artist_raw[lparen + 1:rparen].replace(',', '')
    if culture:
        artist_raw = artist_raw.replace(culture, '')

    for i in ignored_values:
        if i in artist_raw:
            return None, None

    artist_raw = artist_raw.split()

    if 'born' in artist_raw:
        index = artist_raw.index('born')
        if index + 1 < len(artist_raw):
            birth = artist_raw[index + 1]

            if not birth.isdigit():
                birth = None
    else:
        artist_raw = ''.join(artist_raw).split('-')
        if len(artist_raw) == 2:
            birth, death = [a if a.isdigit() else None for a in artist_raw]

    return birth, death


def get_artist_entry(item):
    artist_raw = item.get('Creator')
    name = parse_artist_name(artist_raw)

    artist = Artist.query.filter_by(name=name).first()

    if not artist:
        birth, death = parse_artist_dates(artist_raw)

        artist = Artist()
        artist.name = name
        artist.culture = parse_artist_culture(artist_raw)
        artist.birth = birth
        artist.death = death

        db.session.add(artist)

    return artist


def get_venue_entry(item=None):
    venue = Venue.query.filter_by(name='The Walters Art Museum').first()
    assert venue

    return venue


def get_arttype_entry(item):
    arttype_raw = item.get('Classification').replace('"', '')[:128]

    arttype = ArtType.query.filter_by(name=arttype_raw).first()

    if not arttype:
        arttype = ArtType()
        arttype.name = arttype_raw

        db.session.add(arttype)

    return arttype


def get_medium_entry(item):
    medium_raw = item.get('Medium').replace('"', '')[:128]
    medium = Medium.query.filter_by(name=medium_raw).first()

    if not medium:
        medium = Medium()
        medium.name = medium_raw
        medium.art_type = get_arttype_entry(item)

        db.session.add(medium)

    return medium


def get_work_entry(item):
    work = Work()

    b_year = item.get('DateBeginYear')
    e_year = item.get('DateEndYear')

    b_year = str(b_year) if b_year else '?'
    e_year = str(e_year) if e_year else '?'

    description = item.get('Description')
    image_url = item.get('PrimaryImage').get('Raw')

    work.name = item.get('Title')[:128]
    work.date = '{}-{}'.format(b_year, e_year)
    work.description = description[:1024] if description else None
    work.image_url = image_url

    return work

if __name__ == '__main__':
    NUM_PAGES = 200
    params = dict(apikey=WALTER_KEY)

    venue = get_venue_entry()

    for i in range(1, NUM_PAGES + 1):
        params['Page'] = i
        r = requests.get(url=OBJ_URL, params=params)
        json = r.json()

        for item in json['Items']:
            if not valid_item(item):
                continue

            item['Title'] = item.get('Title').replace('"', '')

            if Work.query.filter_by(name=item.get('Title')).first():
                continue

            work = get_work_entry(item)  # need to set artype, and medium
            artist = get_artist_entry(item)
            medium = get_medium_entry(item)
            art_type = medium.art_type

            work.venue = venue
            work.artist = artist
            work.medium = medium
            work.art_type = art_type

            if art_type not in artist.art_types:
                artist.art_types.append(art_type)

            db.session.add(work)

        if not json.get('NextPage'):
            break

    db.session.commit()


