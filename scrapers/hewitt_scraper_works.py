import requests
from API_KEYS import COOPER_KEY
import re
import json
from models import db, Work, Artist, ArtType, Venue, Medium

def scrape_works():
	PERSON_ID = ['18041923', '18046981', '18048665', '18042915', '18042233', '18041501', '18042405', '18042839']
	role_id = "35236565"
	works = []
	museum  = Venue.query.filter_by(name="Cooper Hewitt, Smithsonian Design Museum").first()
	for pid in PERSON_ID:
		pid_role_id = pid + ":" + role_id
		print(pid_role_id)
		parameters = {"access_token":COOPER_KEY, 'has_image' : 1, 'person_role_id':pid_role_id, }
		r = requests.get('https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.people.getObjects', params=parameters)

		for work in r.json().get("objects"):
			title = work.get("title")
			e = title.find(",")
			art_type = title[:e]
			title = title[e+2:]

			

			if len(work.get("images")) > 0 :
				try:
					url = work.get("images")[0].get("x").get("url")
				except AttributeError:
					url = work.get("images")[0].get("b").get("url")
			
			medium = work.get("medium")
			date = work.get("date")
			artist = ""
			for p in work.get("participants"):
				if p.get("role_name") == "Artist":
					artist = p.get("person_name")
					artist = db.session().query(Artist).filter_by(name=artist).first()
					


			# Add art type if its not in table.
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

			if (medium and art_type and url and len(title) < 128):
				# print(title)
				# print(artist)
				# print(art_type)
				# print(medium)
				# print(date)
				# print(museum)
				# print(url)
				w = Work(
                        name=title,
                        artist=artist,
                        art_type=art_type,
                        medium=medium,
                        date=date,
                        venue=museum,
                        image_url=url
                      )                
				# print(w)
				# db.session.add(w)

	# db.session.commit()


# scrape_works()











