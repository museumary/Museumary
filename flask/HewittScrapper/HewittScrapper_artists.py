import requests
from API_KEYS import COOPER_KEY
import re
import json as j

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
