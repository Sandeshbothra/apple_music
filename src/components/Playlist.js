import React from 'react';
import { connect } from 'react-redux';
import { fetchAllAlbums } from './../actions/albumAction';
import Card from './card';

import './playlist.css';

const Playlist = (props) => {

    React.useEffect(() => {
        props.fetchAlbums();
    },[])

    const getAlbumsCard = (albums) => {
        return albums.entry.map((album, index) => {
            return (
                <Card key={index} 
                imgSrc={album["im:image"][2].label} 
                title={album["im:name"].label} 
                type={album.category.attributes.label}/>
            )
        })
    }

    return(
        <div className="playlist-main d-flex px-4">
            <div className="container">
                <h5 className="py-2 px-1 d-flex align-items-center header"><p className="w-50">Featured Playlist</p>
                <div className="w-50 px-4">
                    <input type="text" className="float-end col-lg-9 px-2" placeholder="Search Album" />
                </div>
                </h5>
                <div className="card-grid">
                    {props.albums.entry && getAlbumsCard(props.albums)}
                </div>
            </div>
        </div>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAlbums: () => dispatch(fetchAllAlbums())
    }
}

const mapStateToProps = (state) => {
    return {
        albums : state.albums.albums || {},
        isfetchingAlbum : state.albums.isfetchingAlbum,
        errorFetchingAlbum : state.albums.errorFetchingAlbum
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);