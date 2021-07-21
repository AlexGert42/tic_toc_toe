import {connect} from "react-redux";
import {PlayingField} from "./PlayingField";
import {useEffect} from "react";
import {setCount, setField, setUserAction} from "../../redux/gameField/action";


const PlayingFieldContainer = ({
                                   fieldSize,
                                   game,
                                   setField,
                                   field,
                                   setUserAction,
                                   setCount,
                                   count,
                                   onePlayer,
                                   twoPlayer
                               }: any) => {


    useEffect(() => {
        if (game) {
            const newfield = (new Array(fieldSize).fill(new Array(fieldSize).fill({}))).map((line, indexL) => line.map((el: any, indexC: any) => {
                return {
                    indexLine: indexL,
                    indexCell: indexC,
                    weligth: 0,
                    player: null,
                }
            }))
            setField(newfield)
        }
    }, [game])


    const setUser = (value: any) => {
        const newField = [...field.map((line: any) => {
            return [...line.map((cell: any) => {
                return {...cell}
            })]
        })]
        if (twoPlayer) {
            if (count % 2 === 0) {
                newField.map(line => line.map((el: any) => {
                    if (el.indexLine === value[0] && el.indexCell === value[1] && el.player !== 'X' && el.player !== 'O') {
                        el.player = 'X'
                        setCount()
                    }
                }))
                movePlayer(value, newField, 'X')
            } else {
                newField.map(line => line.map((el: any) => {
                    if (el.indexLine === value[0] && el.indexCell === value[1] && el.player !== 'O' && el.player !== 'X') {
                        el.player = 'O'
                        setCount()
                    }
                }))
                movePlayer(value, newField, 'O')
            }
        }

        if (onePlayer) {

            newField.map(line => line.map((el: any) => {
                if (el.indexLine === value[0] && el.indexCell === value[1] && el.player !== 'X' && el.player !== 'O') {
                    el.player = 'X'
                    setCount()
                }
            }))
            movePlayer(value, newField, 'X')

            bot(newField, 'O')

        }

        setUserAction(newField)
    }


    return (
        <PlayingField field={field} setUser={setUser}/>
    )
}


const mapStateToProps = (state: any) => ({
    fieldSize: state.game.fieldSize,
    game: state.header.game,
    field: state.game.field,
    count: state.game.count,

    onePlayer: state.header.onePlayer,
    twoPlayer: state.header.twoPlayer,
})

const mapDispatchToProps = ({
    setField,
    setUserAction,
    setCount
})


export default connect(mapStateToProps, mapDispatchToProps)(PlayingFieldContainer)


const bot = (field: any, player: any) => {
    const newField = [...field.map((line: any) => {
        return [...line.map((cell: any) => {
            return {...cell}
        })]
    })]

    let count = 0

    for (let i = 0; i <= 14; i++) {

        for (let j = 0; j <= 14; j++) {
            if (newField[i][j].player !== 'X' && newField[i][j].player !== 'O' ) {
                newField[i][j].player = player
                count += movePlayerBot([i, j], newField, player)
            }

        }
    }
    console.log(count)
}


const movePlayer = (index: any, newField: any, player: any) => {

    let wins_x = []
    let wins_y = []
    let wins_z = []
    let wins_rz = []

    for (let i = 0; i < 7; i++) {
        if (index[0] + i >= 0 && index[0] + i <= 14) {
            if (newField[index[0] + i][index[1]].player === player) {
                wins_y.unshift(player)
            } else {
                wins_y.unshift(0)
            }
        }
        if (index[0] - i >= 0 && index[0] - i <= 14) {
            if (newField[index[0] - i][index[1]].player === player) {
                wins_y.push(player)

            } else {
                wins_y.push(0)
            }
        }
    }


    for (let i = 0; i < 7; i++) {
        if (index[1] + i >= 0 && index[1] + i <= 14) {
            if (newField[index[0]][index[1] + i].player === player) {
                wins_x.unshift(player)
            } else {
                wins_x.unshift(0)
            }
        }
        if (index[1] - i >= 0 && index[1] - i <= 14) {
            if (newField[index[0]][index[1] - i].player === player) {
                wins_x.push(player)
            } else {
                wins_x.push(0)
            }
        }
    }


    for (let i = 0; i < 7; i++) {
        if (index[0] + i <= 14 && index[1] + i <= 14) {
            if (newField[index[0] + i][index[1] + i].player === player) {
                wins_z.unshift(player)
            } else {
                wins_z.unshift(0)
            }
        }
        if (index[0] - i >= 0 && index[1] - i >= 0) {
            if (newField[index[0] - i][index[1] - i].player === player) {
                wins_z.push(player)
            } else {
                wins_z.push(0)
            }
        }
    }


    for (let i = 0; i < 7; i++) {
        if (index[0] + i <= 14 && index[1] - i >= 0) {
            if (newField[index[0] + i][index[1] - i].player === player) {
                wins_rz.unshift(player)
            } else {
                wins_rz.unshift(0)
            }
        }
        if (index[0] - i >= 0 && index[1] + i <= 14) {
            if (newField[index[0] - i][index[1] + i].player === player) {
                wins_rz.push(player)
            } else {
                wins_rz.push(0)
            }
        }
    }

    console.log(wins_x, player)
    winsMove(wins_y, player)
    winsMove(wins_x, player)
    winsMove(wins_z, player)
    winsMove(wins_rz, player)

}

const movePlayerBot = (index: any, newField: any, player: any) => {

    let wins_x = []
    let wins_y = []
    let wins_z = []
    let wins_rz = []

    let count = 0

    for (let i = 0; i < 7; i++) {
        if (index[0] + i >= 0 && index[0] + i <= 14) {
            if (newField[index[0] + i][index[1]].player === player) {
                wins_y.unshift(player)
            } else {
                wins_y.unshift(0)
            }
        }
        if (index[0] - i >= 0 && index[0] - i <= 14) {
            if (newField[index[0] - i][index[1]].player === player) {
                wins_y.push(player)

            } else {
                wins_y.push(0)
            }
        }
    }


    for (let i = 0; i < 7; i++) {
        if (index[1] + i >= 0 && index[1] + i <= 14) {
            if (newField[index[0]][index[1] + i].player === player) {
                wins_x.unshift(player)
            } else {
                wins_x.unshift(0)
            }
        }
        if (index[1] - i >= 0 && index[1] - i <= 14) {
            if (newField[index[0]][index[1] - i].player === player) {
                wins_x.push(player)
            } else {
                wins_x.push(0)
            }
        }
    }


    for (let i = 0; i < 7; i++) {
        if (index[0] + i <= 14 && index[1] + i <= 14) {
            if (newField[index[0] + i][index[1] + i].player === player) {
                wins_z.unshift(player)
            } else {
                wins_z.unshift(0)
            }
        }
        if (index[0] - i >= 0 && index[1] - i >= 0) {
            if (newField[index[0] - i][index[1] - i].player === player) {
                wins_z.push(player)
            } else {
                wins_z.push(0)
            }
        }
    }


    for (let i = 0; i < 7; i++) {
        if (index[0] + i <= 14 && index[1] - i >= 0) {
            if (newField[index[0] + i][index[1] - i].player === player) {
                wins_rz.unshift(player)
            } else {
                wins_rz.unshift(0)
            }
        }
        if (index[0] - i >= 0 && index[1] + i <= 14) {
            if (newField[index[0] - i][index[1] + i].player === player) {
                wins_rz.push(player)
            } else {
                wins_rz.push(0)
            }
        }
    }

    winsMoveBot(wins_y, player) && count++
    winsMoveBot(wins_x, player) && count++
    winsMoveBot(wins_z, player) && count++
    winsMoveBot(wins_rz, player) && count++

    return count
}


const winsMove = (arrWins: any, player: any) => {
    for (let i = 0; i < arrWins.length; i++) {
        if (
            arrWins[i + 0] === player &&
            arrWins[i + 1] === player &&
            arrWins[i + 2] === player &&
            arrWins[i + 3] === player &&
            arrWins[i + 4] === player &&
            arrWins[i + 5] === player
        ) {
            alert(`${player} wins`)
            break
        }
    }
}


const winsMoveBot = (arrWins: any, player: any) => {

    for (let i = 0; i < arrWins.length; i++) {
        if (
            arrWins[i + 0] === player &&
            arrWins[i + 1] === player &&
            arrWins[i + 2] === player &&
            arrWins[i + 3] === player &&
            arrWins[i + 4] === player &&
            arrWins[i + 5] === player
        ) {
            return true
        }
    }
}