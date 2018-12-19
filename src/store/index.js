import { createStore, combineReducers } from 'redux'

import headerRedux from './header'

const reducer = combineReducers({
    header: headerRedux,
})

const store = createStore(reducer);

export default store;
