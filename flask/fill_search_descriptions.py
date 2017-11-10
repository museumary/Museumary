from models import Venue, Artist, ArtType, Work, db

def fill_venue_desc():
    venues = Venue.query.all()
    for venue in venues:
        text =  (   
            venue.street + " " +
            venue.city   + " " +
            venue.country + " " +
            venue.zipcode + " " +
            "works: "
        )
        works = [work.name for work in venue.works]
        text += ', '.join(works)
        print(text)
        venue.description = text

    db.session.commit()

def fill_art_type_desc():
    art_types = ArtType.query.all()
    for art_type in art_types:
        artists = [artist.name for artist in art_type.artists]
        media   = [medium.name for medium in art_type.media]
        works   = [work.name for work in art_type.works]
        
        text =  (
            'Artists: ' +
            ', '.join(artists) +
            ' Media: ' +
            ', '.join(media) +
            ' Works: ' +
            ', '.join(works)
        )
        print(text)
        art_type.description = text

    db.session.commit()

def fill_work_desc():
    works = Work.query.all()
    for work in works:
        date = work.date
        if not date:
            date = "None"
        text = (
            "Artist: " + work.artist.name +
            " Art type: " + work.art_type.name +
            " Medium: " + work.medium.name +
            " Date: " + date +
            " Venue: " + work.venue.name
        )
        print(text)
        work.description = text

    db.session.commit()

def fill_artist_desc():
    artists = Artist.query.all()
    for artist in artists:
        works       = [work.name for work in artist.works]
        art_types   = [art_type.name for art_type in artist.art_types]
        birth = artist.birth
        death = artist.death
        birthplace = artist.birthplace
        deathplace = artist.deathplace

        if birth is None:
            birth = "None"
        if birthplace is None:
            birthplace = "None"
        if death is None:
            death = "None"
        if deathplace is None:
            deathplace = "None"

        text = (
            "Birth: "  + str(birth) +
            " Death: " + str(death) +
            " Birthplace: " + birthplace +
            " Deathplace: " + deathplace +
            " Culture: " + artist.culture +
            " Works: " + ', '.join(works) +
            " Art types: " + ', '.join(art_types)
        )
        print(text)
        artist.description = text
    db.session.commit()

if __name__ == "__main__":
    fill_artist_desc()
    # fill_work_desc()
    fill_venue_desc()
    fill_art_type_desc()