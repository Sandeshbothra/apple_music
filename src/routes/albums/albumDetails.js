import React from 'react';
import { Link, useParams } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { fetchAllAlbums } from './../../actions/albumAction';
const AlbumDetails = (props) => {
    const {id} = useParams();
    const [album, setAlbum] = React.useState(null);

    React.useEffect(() => {
        if(!props.albums[id]){
            props.fetchAlbums();
        }else{
            setAlbum(props.albums[id]);
        }
    },[props.albums[id]])

    return (
        <div className="playlist-main d-flex px-4 py-4">
            {album &&
            <div className="container">
                <h5 className="py-2 px-1 d-flex align-items-center justify-content-start header">
                    <Link to="/" className="btn btn-secondary col-lg-1">Back</Link>
                </h5>
                <div className="row">
                    <div className="col-lg-2 col-md-4">
                        <img src={album["im:image"][2].label} />
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="row">
                            <div className="col-lg-12 pt-4"><h3>{album["im:name"].label}</h3></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <h3 className="text-danger">{album["im:artist"].label}</h3>
                                <p className="text-uppercase" style={{color:"var(--var-textColor)"}}>{`${album.category.attributes.label} - ${new Date(album["im:releaseDate"].label).getFullYear()}`}</p>
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-lg-12">
                                <p className="mb-0" style={{color:"var(--var-textColor)"}}>{album["im:releaseDate"].attributes.label}</p>
                                <p className="mb-0" style={{color:"var(--var-textColor)"}}>{album["im:itemCount"].label} Songs</p>
                                <p className="mb-0" style={{color:"var(--var-textColor)"}}>{album.rights.label}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 d-flex align-items-end">
                        <button className="btn btn-danger ">Buy at {album["im:price"].label}</button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetails);