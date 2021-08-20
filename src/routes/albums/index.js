import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllAlbums } from '../../actions/albumAction';
import Card from '../../components/card';
import {ALBUM_CATEGORY} from './../../constant';
import DisplayTypeButton from '../../components/buttons/DisplayTypeButton';
import './albums.css';
import FavoriteButton from '../../components/buttons/FavoriteButton';

const Playlist = (props) => {
    const [albums, setAlbums] = React.useState([])
    const [searchText, setSearchText] = React.useState('');
    const [category, setCategory] = React.useState('All');
    const [date, setDate] = React.useState('');
    const [displayType, setDisplayType] = React.useState('grid');
    const [favorites, setFavorites] = React.useState(null);
    
    React.useEffect(() => {
        if(Object.keys(props.albums).length <= 0){
            props.fetchAlbums();
        }
    },[])

    React.useEffect(() => {
        setAlbums(Object.values(props.albums))
    },[props.albums])

    React.useEffect(() => {
        if(searchText != ''){
            setAlbums(Object.values(props.albums).filter((album) => {
                return album["im:name"].label.toLowerCase().includes(searchText.toLowerCase());
            }));
        }else{
            setAlbums(Object.values(props.albums));
        }
    },[searchText])

    React.useEffect(() => {
        if(category != 'All'){
            setAlbums(Object.values(props.albums).filter((album) => {
                return album.category.attributes.label === category;
            }));
        }else{
            setAlbums(Object.values(props.albums));
        }
    },[category])

    React.useEffect(() => {
        if(date != ''){
            setAlbums(albums.filter((album) => {
                return new Date(album["im:releaseDate"].label).toLocaleDateString() === new Date(date).toLocaleDateString();
            }));
        }else{
            setAlbums(Object.values(props.albums));
        }
    },[date])

    const generateData = (albums) => {
        return displayType === 'grid' ? getAlbumsCard(albums) : generateList(albums);
    }

    const isFavroite = (fav, id) => {
        if(fav){
            let index = fav.findIndex((fav) => {
                return fav === id;
            });
            if(index > -1){
                return true;
            }
        }
        return false;
    }

    const addFavorites = (id) => {
        let favs = favorites || [];
        if(isFavroite(favs, id)){
            favs = favs.filter((f) => {return f != id}) 
        }else{
            favs.push(id);
        } 
           
        if(favorites){
            favorites.length >= favs.length ? setFavorites([...favorites],[...favs]) : setFavorites(favs);                
        }else{
            setFavorites(favs);
        }
        
    }

    const getAlbumsCard = (albums) => {
        return <div className="card-grid py-4 my-4">
        {albums.map((album, index) => {
            return (
                <div key={index}>
                    <Card
                    imgSrc={album["im:image"][2].label} 
                    title={album["im:name"].label} 
                    type={album.category.attributes.label}
                    linkTo={`/${album.id.attributes["im:id"]}`}/>
                    <FavoriteButton favorites={favorites || []} id={album.id.attributes["im:id"]} onclick={addFavorites}/>
                </div>
            )
        })}
        </div>
    }

    const generateList = (albums) => {
        return(
            <div className="mt-4 table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Artist</th>
                            <th>Release Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {albums.map((album , index) => {
                        return (
                            <tr key={index}>
                                <td><FavoriteButton favorites={favorites || []} id={album.id.attributes["im:id"]} onclick={addFavorites}/></td>
                                <td><Link to={`/${album.id.attributes["im:id"]}`}>{album["im:name"].label}</Link></td>
                                <td>{album.category.attributes.label}</td>
                                <td>{album["im:artist"].label}</td>
                                <td>{album["im:releaseDate"].attributes.label}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }

    return(
        <div className="playlist-main d-flex px-4 py-4">
            <div className="container">
                <h4 className="py-2 px-1 d-flex row align-items-center header">
                    <p className="col-lg-4 col-md-12 col-sm-12">{props.albumsLabel}</p>
                    <div className="col-lg-8 col-md-12 col-sm-12 row">
                        <div className="col-lg-6 col-sm-12 col-md-6 px-2 mb-4">
                            <input type="text" className="w-100 px-2" value={searchText} placeholder="Search Album" onChange={(e) => setSearchText(e.target.value)}/>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-3 px-2 mb-4">
                            <select name="category" className="w-100" value={category} onChange={(e) => {setCategory(e.target.value)}}>
                                <option value="All">All</option>
                                {ALBUM_CATEGORY.map((cat, index) => {
                                    return <option key={index} value={cat}>{cat}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-3 px-2 mb-4">
                            <input type="date" className="w-100" placeholder="Select Date" onChange={(e) => setDate(e.target.value)}/>
                        </div>
                    </div>
                </h4>
                <div className="row justify-content-end px-4">
                    <div className="col-lg-1 col-md-2 col-sm-4 row">
                        <div className={`display-type-button col-6 ${displayType === 'grid' && 'active'}`} onClick={() => setDisplayType('grid')}>
                            <DisplayTypeButton type="grid" />
                        </div>
                        <div className={`display-type-button col-6 ${displayType === 'list' && 'active'}`}  onClick={() => setDisplayType('list')}>
                            <DisplayTypeButton type="list" />
                        </div> 
                    </div>
                </div>
                {albums.length > 0 && generateData(albums)}
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
        albumsLabel : state.albums.albumsLabel,
        isfetchingAlbum : state.albums.isfetchingAlbum,
        errorFetchingAlbum : state.albums.errorFetchingAlbum
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);