import {combineReducers, createStore} from "redux";
import {HeaderReducer} from "./header/reducer";
import {GameFieldReducer} from "./gameField/reducer";


export const rootReducer = combineReducers({
    header: HeaderReducer,
    game: GameFieldReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;