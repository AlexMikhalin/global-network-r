import { applyMiddleware, combineReducers, createStore } from "redux";
import dialogsReducer from "./dialogs-reducer.ts";
import sidebarReducer from "./sidedar-reducer.ts";
import profileReducer from "./profile-reducer.ts";
import usersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.ts";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer.ts";
import { compose } from "redux";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

let state: AppStateType;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store