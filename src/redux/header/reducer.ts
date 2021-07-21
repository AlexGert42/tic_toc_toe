export const CREATE_GAME = 'CREATE_GAME'
export const ONE_PLAYER = 'ONE_PLAYER'
export const TWO_PLAYER = 'TWO_PLAYER'
export const REMOVE_GAME = 'REMOVE_GAME'


const initialState = {
    game: false,
    onePlayer: false,
    twoPlayer: false
}

export const HeaderReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case CREATE_GAME:
            return {
                ...state,
                game: true
            }
        case REMOVE_GAME:
            return {
                ...state,
                game: false,
                onePlayer: false,
                twoPlayer: false
            }
        case ONE_PLAYER:
            return {
                ...state,
                onePlayer: true,
                twoPlayer: false
            }
        case TWO_PLAYER:
            return {
                ...state,
                onePlayer: false,
                twoPlayer: true
            }
        default:
            return state
    }
}