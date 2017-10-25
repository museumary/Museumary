import models
from models import db, Work, Artist, ArtType, Venue, Medium
from os import environ

def fill_work_relations():
    works = Work.query.all()

    for work in works:
        artist = Artist.query.filter_by(id=work.artist_id).first()
        art_type = ArtType.query.filter_by(id=work.art_type_id).first()
        medium = Medium.query.filter_by(id=work.medium_id).first()

        artist.art_types.append(art_type)
        if medium.art_type_id is None:
            medium.art_type = art_type

        print(work)

    db.session.commit()

def delete_empty_art_types():
    types = ArtType.query.all()
    count = 0

    for art_type in types:
        if art_type.artists == []:
            db.session.delete(art_type)
            print("DELETING : {}".format(art_type.name))

    db.session.commit()

if __name__=='__main__':
    # delete_empty_art_types()