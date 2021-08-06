export const CREATE_FIELD ='SET_FIELD'
export const USER_ACTION = 'USER_ACTION'
export const SET_COUNT = 'SET_COUNT'

export const MOVE_BOT = 'MOVE_BOT'



const initialState = {
    fieldSize: 15,
    field: null,
    count: 0,
    lastMoveBot: null
}

export const GameFieldReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case CREATE_FIELD:
            return {
                ...state,
                field: action.payload
            }
        case USER_ACTION:
            return {
                ...state,
                field: action.payload
            }
        case SET_COUNT:
            return {
                ...state,
                count: state.count + 1
            }
        case MOVE_BOT:
            return {
                ...state,
                lastMoveBot: action.payload
            }
        default:
            return state
    }
}