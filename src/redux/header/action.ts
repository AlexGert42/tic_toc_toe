import {CREATE_GAME, ONE_PLAYER, TWO_PLAYER, REMOVE_GAME} from "./reducer";


export const gameAction = () => ({type: CREATE_GAME})

export const onePlayerAction = () => ({type: ONE_PLAYER})

export const twoPlayerAction = () => ({type: TWO_PLAYER})

export const removeGameAction = () => ({type: REMOVE_GAME})