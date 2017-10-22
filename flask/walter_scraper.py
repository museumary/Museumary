#!/usr/bin/env python3

import requests
from API_KEYS import WALTER_KEY

BASE_URL = 'http://api.thewalters.org/v1/'

OBJ_URL = BASE_URL + 'objects'
COL_URL = BASE_URL + 'collections'

REQUIREMENTS = [
	#'ObjectName',
	'Collection',
	'DateBeginYear',
	'DateEndYear',
	'DateText',
	'Title',
	'Medium',
	#'Style',
	'Culture',
	'Classification',
	'Period',
	'Description',
	'ResourceURL',
	'Creator',
	#'PrimaryImage',
	#'NextPage',
	'Images'
]

data = []
params = dict(apikey=WALTER_KEY, Page=1)

r = requests.get(url=OBJ_URL, params=params)
rjson = r.json()

while params['Page'] < 10:
	r = requests.get(url=OBJ_URL, params=params)
	rjson = r.json()

	for item in rjson['Items']:
		data.append({key: item[key] for key in REQUIREMENTS})

	if not rjson['NextPage']:
		break

	params['Page'] += 1

with open('walter_data.txt', 'w') as f:
	for d in data:
		p = iter(d)
		f.write(str(d[next(p)]))
		for k in p:
			f.write('|'+str(d[k]))
		f.write('\n')


