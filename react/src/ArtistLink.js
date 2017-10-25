import React, {Component} from 'react';
import FullArtists from './FullArtists';
import Artist from './Artist';

class ArtistLink extends Component {
  render() {
    var url = "/artists/" + this.props.id;
    return (<div className="ArtistLink">
              <a href={url}>{this.props.name}</a>
            </div>);
  }
}

export default ArtistLink;
