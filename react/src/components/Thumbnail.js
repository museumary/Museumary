import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';

const Harvard = "Ever since their founding, the Harvard Art Museums have been dedicated to advancing and supporting learning at Harvard University, in the local community, and around the world. The museums have played a leading role in the development of art history, conservation, and conservation science, and in the evolution of the art museum as an institution."
const Cooper = "A 21st-century museum housed in New York City’s landmark Carnegie Mansion, Cooper Hewitt offers four floors of galleries dedicated to all disciplines of design, a permanent collection of more than 210,000 design objects fully digitized and available online, and a world-class design library. In addition to producing major special exhibitions, the museum continually refreshes the installation of objects from its collection of product design, decorative arts, works on paper, graphic design, textiles, wallcoverings, and digital materials."
const Auckland = "The Museum tells the story of New Zealand, its place in the Pacific and its people. The Museum is a war memorial for the province of Auckland and holds one of New Zealand's top three heritage libraries. It has pre-eminent Māori and Pacific collections, significant natural history resources and major social and military history collections, as well as decorative arts and pictorial collections."
const Finnish = "Finnish National Gallery is the largest art museum institution of Finland. It consists of the Ateneum art museum, the museum of contemporary art, Kiasma and the Sinebrychoff Art Museum. The organization's functions are supported by the conservation department, the administration and services department and Kehys, the art museum development department."
const Walter = "The Walters Art Museum in Baltimore, Maryland is internationally renowned for its collection of art. The collection presents an overview of world art from pre-dynastic Egypt to 20th-century Europe, and counts among its many treasures Greek sculpture and Roman sarcophagi; medieval ivories and Old Master paintings; Art Nouveau jewelry and 19th-century European and American masterpieces."

const DESCRIPTION = [Harvard, Walter, Auckland, Cooper, Finnish]

export default class Thumbnail extends React.Component {
    render() {
        const name = this.props.name
        const image = this.props.image_url
        const url = this.props.url
        const type = this.props.type
        var description = DESCRIPTION[this.props.description_id - 1]


        if(type == "venue")
        {
            return (
                <div className='col-md-12' style={style}>
                    <Link to={url} activeClassName="active"> 
                        <img src={image} className="img-rounded" width="400" height="250" align="left"/><br/>
                    </Link>
                  
                    <div className='venue-description'>
                        <Link to={url} activeClassName="active">
                            <h3><strong>{name}</strong></h3>
                        </Link>
                        <p>
                            {description}
                        </p>
                    </div>
                    <br/>
                </div>
             

        
            )
        }
        else
        {
            return(
                <div className='col-md-3'>
                    <Link to={url} activeClassName="active">
                        <strong>{name}</strong><br/>
                        <img src={image} className="img-rounded" width="200" height="300"/>
                    </Link>
                    <br/>
                    <br/>
                </div>
            )
        }

        
    }
}