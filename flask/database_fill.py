import models
from models import db, Work, Artist, ArtType, Venue, Medium
from os import environ
import wikipedia

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

def clear_urls():
    artists = Artist.query.filter('image_url'!=None).all()
    for artist in artists:
        artist.image_url=None
        print(artist)
        db.session.commit()


def scrape_artist_wiki_images():
    artists = Artist.query.limit(100).all()
    index = 0

    for artist in artists:
        print("INDEX {}".format(index))
        index += 1

        try:
            query = wikipedia.search(artist.name)
            if artist.image_url:
                print("SKIPPING {} IMAGE FILLED".format(artist.name))
                continue

            for title in query:
                wikipage = wikipedia.page(title)
                art_words = ['artist', 'painter', 'sculptor', 'art']

                if any(s for s in art_words if s in wikipage.summary):

                    name = artist.name.split()

                    image_urls = wikipage.images

                    for url in image_urls:
                        if any(s for s in name if s in url):
                            artist.image_url = url
                            print("ADDING {} {}".format(artist.name, url))
                            break
                    if artist.image_url:
                        break

                else:
                    print("SKIPPING {} BAD SUMMARY".format(artist.name))

            db.session.commit()
        except:
            continue

        

if __name__=='__main__':
    # clear_urls()
    scrape_artist_wiki_images()
