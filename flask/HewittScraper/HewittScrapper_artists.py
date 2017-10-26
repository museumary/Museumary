import requests
from API_KEYS import COOPER_KEY
import re
import json as j
from models import db, Work, Artist, ArtType, Venue, Medium

def scrape_artists():
	Artists = []
	PERSON_ID = [18041923, 18046981, 18048665, 18042915, 18042233, 18041501, 18042405, 18042839]
	for pid in PERSON_ID:
		parameters = {"access_token":COOPER_KEY, 'has_image' : 1, 'person_id':pid}
		r = requests.get('https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.people.getInfo', params=parameters)
		json = r.json() 

		person = json["person"]

		d = {}
		d["name"] = person.get("name")

		#attempt to extract the date of the artist
		date = person.get("date")
		if date:
			x = re.split('-|–| ', date)
			if len(x) == 1:           #no hyphen or spaces found. 
				d["birth"] = "None"
			else:
				d["birth"] = x[len(x)-2]
			d["death"] = x[len(x)-1]
		d["birthplace"] = "None"
		d["deathplace"] = "None"
		d["culture"] = person.get("woe:country_name")


		q={"access_token":COOPER_KEY, 'person_id':pid}
		image_req = requests.get('https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.people.getImages', params=q)
		images = image_req.json()["images"]
		if images:
			d["image_url"] = images[0]["b"]["url"]
		else:
			d["image_url"] = "None"

		Artists.append(dict(d))
	# with open("artists.json", "w") as f:
	# 	f.write(j.dumps({"Artists": Artists}))
	# 	f.close()

def populate_artists():
	# artists = [line.strip() for line in open("artists.json", "r")]
	artists = []
	with open('artists.json') as f:    
		data = j.load(f)
	artists = data["Artists"]

	for artist in artists:
            name=artist.get('name')
            birth=artist.get('birth')
            death=artist.get('death')
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
                        image_url=artist.get('image_url')
                    )
                print('ADDED: {}'.format(name))
                db.session.add(new_entry)
            else:
                print('SKIPPED: {}'.format(name))

	db.session.commit()

def append_art_type():
	artists = []
	with open('artists.json') as f:    
		data = j.load(f)
	artists = data["Artists"]

	for artist in artists:
		artist = Artist.query.filter_by(name=artist.get("name")).first()
		print(artist)
		for work in artist.works:
			print(work)
			
			art_type = work.art_type
			medium = work.medium
			print(art_type)
			print(medium)

			if art_type not in artist.art_types:
				artist.art_types.append(art_type)
			if medium not in art_type.media:
				art_type.media.append(medium)

	db.session.commit()	

append_art_type()



