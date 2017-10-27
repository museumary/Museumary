import requests
import json
from json.decoder import JSONDecodeError
import sys
import models
from models import db, Work, Artist, ArtType, Venue, Medium
from os import environ
from API_KEYS import FINNISH_KEY
import time


"""
dict_keys for item(['title', 'type', 'identifier', 'relation', 'date', 'publisher'])

when get_data is called with a 0 it will add arttypes, media and works into DB, else, it will add artists
"""

def get_data(x):
	BASE_URL = "http://kokoelmat.fng.fi/api/v2"
	params = {"apikey":FINNISH_KEY, "format":"dc-json", "q":"artist-search:1970"}
	museum = Venue.query.filter_by(name="Finnish National Gallery").first()
	r = requests.get(BASE_URL, params)

	for item in r.json().get("descriptionSet"):
		# if item.get("type")[0].get("type") == "artist":
			# print("SHEESH")
		name = item.get("title")[0].get("title")

		dates = item.get("date")
		if len(dates[0]) > 1 and dates[0].get("type") == "birth":
			birth = dates[0].get("value")
			birthplace = dates[0].get("loc")
		else:
			birth = dates[0].get("birth")
			birthplace = "unknown"
		if len(dates) > 1:
			if len(dates[1]) > 1 and dates[1].get("type") == "death":
				death = dates[1].get("value")
				deathplace = dates[1].get("loc")
			else:
				death = dates[1].get("death")
				deathplace = "unknown"
		else:
			death = None
			deathplace = "N/A"

		culture = item.get("relation")
		culture = culture[len(culture)-1].get("group")

		# print(name)
		# print(birth)
		# print(death)
		# print(birthplace)
		# print(deathplace)
		# print(culture)

		if "-" in birth:
			birth = birth[:birth.find("-")]
		if death and "-" in death:
			death = death[:death.find("-")]
		
		artist = Artist(
                        name=name,
                        birth=birth,
                        death=death,
                        birthplace=birthplace,
                        deathplace=deathplace,
                        culture=culture,
                        image_url=""
                    )
		if(x):
			db.session.add(artist)
		# attempt to add in everything else thats not the artist (works, medium, art_type)
		else:
			for work in item.get("relation"):
				time.sleep(1)
				params["q"] = work.get("id")
				r = requests.get(BASE_URL, params)
				if r and r.json() and r.json().get("descriptionSet"):
					result = r.json().get("descriptionSet")[0]
					if result.get("title") and result.get("title")[0]:
						title =  next (iter (result.get("title")[0].values()))

					# art_type::
					art_type = None
					media = None
					for d in result.get("type"):
						if d.get("artwork-class"):
							art_type = d.get("artwork-class")
							media = d.get("artwork-class")
					ty = ArtType.query.filter_by(name=art_type).first()
					if not ty:
						art_type = ArtType(name=art_type)
						db.session.add(art_type)
					else:
						art_type = ty
					me = Medium.query.filter_by(name=media).first()
					if not me:
						media = Medium(name=media)
						db.session.add(media)
					else:
						media = me

					date = None
					if result.get("date"):
						for dic in result.get("date"):
							if dic.get("creation"):
								date = dic.get("creation")
						if date and (" " in date or "-" in date):
							date = date[:4]
						try:
							date = int(date)
						except:
							date = None

					url = ""
					if result.get("relation") and result.get("relation")[0] and result.get("relation")[0].get("image"):
						url = "http://kokoelmat.fng.fi/app?action=image&profile=topicartworkbignew&iid=" + result.get("relation")[0].get("image")

					if title and title != "Access frequency exceeded for user." and date and art_type and media and url:
						work = Work(
	                            name=title,
	                            artist=artist,
	                            art_type=art_type,
	                            medium=media,
	                            date=date,
	                            venue=museum,
	                            image_url=url
	                        )
						db.session.add(work)  
						print(title, artist, art_type, media, date, museum, url)
				











	db.session.commit()




	
get_data(0)
# get_the_rest()