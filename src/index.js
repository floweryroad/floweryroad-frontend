import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import auth from './reducers/authReducer'
import ReduxThunk from 'redux-thunk';


import axios from 'axios';

axios.defaults.baseURL = 'http://ec2-15-164-210-94.ap-northeast-2.compute.amazonaws.com'

const rootReducer = combineReducers({
    auth
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter> 
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
