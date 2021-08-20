const AlbumReducer = (state = {}, action) => {
    let albums = {};
    switch(action.type){
        case "FETCH_ALBUMS_STARTED":
            return {...state, isfetchingAlbum:true, albums, errorFetchingAlbum:null};
        case "FETCH_ALBUMS_COMPLETED":
            action.payload.entry.forEach((entry) => {
                albums[entry.id.attributes["im:id"]] = entry;
            })
            return {...state, isfetchingAlbum:false, albums, albumsLabel:action?.payload?.title?.label, errorFetchingAlbum:null};
        case "FETCH_ALBUMS_FAILED":
            return {...state, isfetchingAlbum:false, albums, errorFetchingAlbum:action.error};
        default:
            return state;
    }
}

export default AlbumReducer;