import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Store from './store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

ReactDOM.render(
                <Provider store={Store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>,
                document.querySelector('#root'));