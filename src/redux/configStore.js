import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from './reducers/ToDoListReducer'
import reduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
    ToDoListReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store