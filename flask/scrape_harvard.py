#!/Users/kellyng/anaconda/bin/python3

import requests
import json
from json.decoder import JSONDecodeError
import sys
import models
from models import db, Work, Artist, ArtType, Venue, Medium
from os import environ


def contains_artist(people, artist):
    for d in people:
        if d['name'] == artist:
            return True
    return False


parameters = {
    "apikey": environ['HARVARD_APIKEY'],
    "size": 100,
    "page": 1,
}


def populate_artists():
    """
    Populate the database with artists from the Harvard Museum API
    sans relationships
    """
    params = parameters.copy()
    params['sort'] = 'datebegin'
    params['sortorder'] = 'desc'

    try:
        r = requests.get("http://api.harvardartmuseums.org/person", params=params)
        r = r.json()
    except JSONDecodeError:
        print(r)
        print(r.text)
        sys.exit()

    num_pages = r['info']['pages']

    for n in range(1, 99):
        params['page'] = n

        try:
            r = requests.get("http://api.harvardartmuseums.org/person", params=params)
            r = r.json()
            print(r)
        except JSONDecodeError:
            print(r)
            print(r.text)
            sys.exit()

        records = r['records']

        for artist in records:
            name=artist.get('displayname')
            birth=artist.get('datebegin')
            death=artist.get('dateend')
            birthplace=artist.get('birthplace')
            deathplace=artist.get('deathplace')
            culture=artist.get('culture')

            if not birth:
                break

            if name and birth and birthplace and culture and ((death and deathplace) or not (death or deathplace)):
                new_entry = Artist(
                        name=name,
                        birth=birth,
                        death=death,
                        birthplace=birthplace,
                        deathplace=deathplace,
                        culture=culture,
                        image_url=artist.get('primaryimageurl')
                    )
                print('ADDED: {}'.format(name))
                db.session.add(new_entry)
            else:
                print('SKIPPED: {}'.format(name))

    db.session.commit()


def populate_art_types():
    """
    Populate the art types in the database
    """
    params = parameters.copy()
    r = requests.get("http://api.harvardartmuseums.org/worktype", params=params)
    json = r.json()
    num_pages = json['info']['pages']

    for n in range(1, num_pages):
        params['page'] = n
        r = requests.get("http://api.harvardartmuseums.org/worktype", params=params)
        json = r.json()

        records = json['records']

        for worktype in records:
            new_entry = ArtType(
                    name=worktype.get('name')
                )
            print(new_entry)
            db.session.add(new_entry)

    db.session.commit()


def populate_venues():
    """
    Fill database with venue data
    """
    venues = [
        {
            "name": "Harvard Art Museum",
            "country" : "USA",
            "city": "Cambridge, MA",
            "address": "32 Quincy St",
            "zipcode": "02138"
        },
        {
            "name": "The Walters Art Museum",
            "country" : "USA",
            "city": "Baltimore, MD",
            "address": "600 N. Charles Street",
            "zipcode": "21201"
        },
        {
            "name": "Auckland Museum",
            "country" : "New Zealand",
            "city": "Auckland",
            "address": "The Auckland Domain, Parnell",
            "zipcode": "Auckland 1010"
        },
        {
            "name": "Cooper Hewitt, Smithsonian Design Museum",
            "country" : "USA",
            "city": "New York, NY",
            "address": "2 E 91st St",
            "zipcode": "10128"
        },
        {
            "name": "Finish National Gallery",
            "country" : "Finland",
            "city": "Helsinki",
            "address": "Kaivokatu 2",
            "zipcode": "00100 Helsinki"
        }
    ] 

    for venue in venues:
        new_entry = Venue(
                name=venue['name'],
                street=venue['address'],
                city=venue['city'],
                country=venue['country'],
                zipcode=venue['zipcode']
            )
        db.session.add(new_entry)
    db.session.commit()


def populate_media():
    """
    Scrape types of media with objectcounts > 0
    """
    params = parameters.copy()
    r = requests.get("http://api.harvardartmuseums.org/Medium", params=params)
    r = r.json()
    num_pages = r['info']['pages']

    for n in range(1, num_pages):
        params['page'] = n
        r = requests.get("http://api.harvardartmuseums.org/Medium", params=params)
        r = r.json()

        records = r['records']

        for record in records:
            if record.get('objectcount') is not None:
                new_entry = Medium(
                        name=record.get('name')
                    )
                print(new_entry)
                db.session.add(new_entry)
    db.session.commit()


def populate_works():
    """
    Scrape objects that were created by the artists already stored
    Must be run after artists are populated
    """
    params = parameters.copy()
    artists = Artist.query.all()
    museum = Venue.query.filter_by(name="Harvard Art Museum").first()

    for artist in artists:
        params['person'] = artist.name
        r = requests.get("http://api.harvardartmuseums.org/object", params=params)
        json = r.json()

        records = json.get('records')

        if records is None:
            continue

        for obj in records:

            title = obj.get('title')
            url = obj.get('primaryimageurl')

            if contains_artist(obj['people'], artist.name) and len(title) < 128 and url:
                objectid = obj['objectid']
                obj_req = requests.get("http://api.harvardartmuseums.org/object/{}".format(objectid), params=params)
                obj_json = obj_req.json()

                # create new entry for art_type if not in database
                art_type = obj_json.get('worktypes')
                if art_type:
                    art_type = art_type[0].get('worktype')
                    query = ArtType.query.filter_by(name=art_type).first()
                    if query:
                        art_type = query
                    elif len(art_type) < 128:
                        art_type = ArtType(
                                name=art_type
                            )
                        db.session.add(art_type)
                    else:
                        art_type = None

                # create new entry for medium if not in database
                medium = obj_json.get('medium')
                if medium:
                    query = Medium.query.filter_by(name=medium).first()
                    if query:
                        medium = query
                    elif len(medium) < 128:
                        medium = Medium(
                                name=medium
                            )
                        db.session.add(medium)
                    else:
                        medium = None


                if(medium and art_type):
                    work = Work(
                            name=title,
                            artist=artist,
                            art_type=art_type,
                            medium=medium,
                            date=obj_json.get('dated'),
                            venue=museum,
                            image_url=url
                        )                
                    print(work)
                    db.session.add(work)

    db.session.commit()

if __name__ == '__main__':
    # populate_artists()
    # populate_venues()
    # populate_art_types()
    # populate_media()
    populate_works()



