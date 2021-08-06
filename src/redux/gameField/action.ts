import {SET_COUNT, CREATE_FIELD, USER_ACTION, MOVE_BOT} from "./reducer";


export const setField = (field: any) => ({
    type: CREATE_FIELD,
    payload: field
})

export const setUserAction = (field: any) => ({
    type: USER_ACTION,
    payload: field
})

export const setCount = () => ({type: SET_COUNT})


export const MoveBot = (move: any) => ({
    type: MOVE_BOT,
    payload: move
})
