import React from 'react';
import Albums from './../routes/albums';
import AlbumDetails from './../routes/albums/albumDetails';

import {Route, Switch} from 'react-router-dom';
const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Albums} />
            <Route path="/:id" component={AlbumDetails} />
        </Switch>
    )
}

export default App;