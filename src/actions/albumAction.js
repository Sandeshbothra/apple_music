import APPLE_API from './../api/appleApi';

export const fetchingAlbums = () => {
    return {
        type:"FETCH_ALBUMS_STARTED"
    }
}

export const fetchingAlbumsCompleted = (payload) => {
    return {
        type:"FETCH_ALBUMS_COMPLETED",
        payload
    }
}

export const fetchingAlbumsFailed = (error) => {
    return {
        type:"FETCH_ALBUMS_FAILED",
        error
    }
}

export const fetchAllAlbums = () => {
    return (dispatch) => {
        dispatch(fetchingAlbums());
        APPLE_API.get('/us/rss/topalbums/limit=100/json').then((response) => {
            dispatch(fetchingAlbumsCompleted(response.data.feed));
        }).catch((error) => {
            dispatch(fetchingAlbumsFailed(error));
        })
    }
}