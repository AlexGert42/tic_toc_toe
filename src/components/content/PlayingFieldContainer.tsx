import {connect} from "react-redux";
import {PlayingField} from "./PlayingField";
import {useEffect} from "react";
import {setCount, setField, setUserAction} from "../../redux/gameField/action";
import {movePlayer} from "./moveGame";


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

            bot(newField, value, 'O')

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


const bot = (newField: any, index: any, player: any) => {
    // const newField = [...field.map((line: any) => {
    //     return [...line.map((cell: any) => {
    //         return {...cell}
    //     })]
    // })]




    let kefUser = [0.1, 2 , 4, 10]
    let kefBot = [0.2, 2.2 , 4.5, 10.5]


    let res_user;
    let res_bot;
    let min_user = 0
    let min_bot = 0
    let x_user = 0
    let y_user = 0
    let x_bot = 0
    let y_bot = 0




    for (let i = 0; i <= newField.length - 1; i++) {
        for (let j = 0; j <= newField[i].length - 1; j++) {
            if (newField[i][j].player === 'X') {
                res_user = movePlayerBot([i, j], newField, 'X', 'O', kefUser)
                for (let i = 0; i <= res_user.length - 1; i++) {
                    for (let j = 0; j <= res_user[i].length - 1; j++) {
                        if (res_user[i][j].weligth > min_user) {
                            if (res_user[i][j].player !== 'X' && res_user[i][j].player !== 'O') {
                                min_user = res_user[i][j].weligth
                                y_user = i
                                x_user = j
                            }

                        }
                    }
                }
            }

            if (newField[i][j].player === 'O') {
                res_bot = movePlayerBot([i, j], newField, 'O', 'X', kefBot)
                for (let i = 0; i <= res_bot.length - 1; i++) {
                    for (let j = 0; j <= res_bot[i].length - 1; j++) {
                        if (res_bot[i][j].weligth > min_bot) {
                            if (res_bot[i][j].player !== 'X' && res_bot[i][j].player !== 'O') {
                                min_bot = res_bot[i][j].weligth
                                y_bot = i
                                x_bot = j
                            }

                        }
                    }
                }
            }

        }
    }





    if (min_user >= min_bot) {
        newField[y_user][x_user].player = 'O'
        movePlayer([y_user, x_user], newField, 'O')
    } else {
        newField[y_bot][x_bot].player = 'O'
        movePlayer([y_bot, x_bot], newField, 'O')
    }



}


const movePlayerBot = (index: any, newField: any, player1: any, player2: any, kefPlayer: any) => {
    // const newField = [...field.map((line: any) => {
    //     return [...line.map((cell: any) => {
    //         return {...cell}
    //     })]
    // })]

    let y_m = 1
    let y_p = 1
    let x_m = 1
    let x_p = 1
    let z_m = 1
    let z_p = 1
    let rz_m = 1
    let rz_p = 1

    const kef = (i: any) => {
        let res = i
        if (i === 1) {
            res = kefPlayer[0]
        }
        if (i === 2) {
            res = kefPlayer[1]
        }
        if (i === 3) {
            res = kefPlayer[2]
        }
        if (i === 4) {
            res = kefPlayer[3]
        }
        return res
    }


    let kef_y = [0, 1]
    let kef_x = [0, 1]
    let kef_z = [0, 1]
    let kef_rz = [0, 1]





    for (let i = 1; i < 5; i++) {
        if (index[0] - i >= 0 && index[0] - i <= 14) {

            if (newField[index[0] - i][index[1]].player !== player2) {
                kef_y[0]++
            }
            if (newField[index[0] - i][index[1]].player === player1) {
                kef_y[1]++
            }
        }
    }


    for (let i = 1; i < 5; i++) {
        if (index[0] + i >= 0 && index[0] + i <= 14) {
            if (newField[index[0] + i][index[1]].player !== player2 ) {
                kef_y[0]++
            }
            if (newField[index[0] + i][index[1]].player === player1) {
                kef_y[1]++
            }
        }

    }


    for (let i = 1; i < 5; i++) {
        if (index[1] + i >= 0 && index[1] + i <= 14) {
            if (newField[index[0]][index[1] + i].player !== player2) {
                kef_x[0]++
            }
            if (newField[index[0]][index[1] + i].player === player1) {
                kef_x[1]++
            }
        }
    }

    for (let i = 1; i < 5; i++) {
        if (index[1] - i >= 0 && index[1] - i <= 14) {
            if (newField[index[0]][index[1] - i].player !== player2) {
                kef_x[0]++
            }
            if (newField[index[0]][index[1] - i].player === player1) {
                kef_x[1]++
            }
        }
    }


    for (let i = 1; i < 5; i++) {
        if (index[0] + i <= 14 && index[1] + i <= 14) {
            if (newField[index[0] + i][index[1] + i].player !== player2) {
                kef_z[0]++
            }
            if (newField[index[0] + i][index[1] + i].player === player1) {
                kef_z[1]++
            }
        }

    }

    for (let i = 1; i < 5; i++) {
        if (index[0] - i >= 0 && index[1] - i >= 0) {
            if (newField[index[0] - i][index[1] - i].player !== player2) {
                kef_z[0]++
            }
            if (newField[index[0] - i][index[1] - i].player === player1) {
                kef_z[1]++
            }
        }
    }

    for (let i = 1; i < 5; i++) {
        if (index[0] + i <= 14 && index[1] - i >= 0) {
            if (newField[index[0] + i][index[1] - i].player !== player2) {
                kef_rz[0]++
            }
            if (newField[index[0] + i][index[1] - i].player === player1) {
                kef_rz[1]++
            }
        }
    }

    for (let i = 1; i < 5; i++) {
        if (index[0] - i >= 0 && index[1] + i <= 14) {
            if (newField[index[0] - i][index[1] + i].player !== player2) {
                kef_rz[0]++
            }
            if (newField[index[0] - i][index[1] + i].player === player1) {
                kef_rz[1]++
            }
        }
    }


    const rec = (newField: any, index: any, player1: any,player2:any) => {
        console.log(index)
        if (newField[index[0]][index[1]].player !== player2) {
            newField[index[0]][index[1]].player = player1
            movePlayer([index[0], index[1]], newField, player1)
        }


    }


    /////////////////////////////////////////////////////////

    for (let i = 1; i < 5; i++) {
        if (index[0] - i >= 0 && index[0] - i <= 14) {
            rec(newField, [index[0] - i, index[1]], player1, player2)
            if (newField[index[0] - i][index[1]].player !== player1) {
                newField[index[0] - i][index[1]].weligth += 10 * kef(y_m) / i * kef_y[1] * (kef_y[0] <= 4 ? 1 : 2)
            } else {
                y_m++

            }
        }
    }

    for (let i = 1; i < 5; i++) {
        if (index[0] + i >= 0 && index[0] + i <= 14) {
            if (newField[index[0] + i][index[1]].player !== player1) {
                newField[index[0] + i][index[1]].weligth += 10 * kef(y_p) / i * kef_y[1] * (kef_y[0] <= 4 ? 1 : 2)

            } else {
                y_p++

            }
        }

    }



    for (let i = 1; i < 5; i++) {
        if (index[1] + i >= 0 && index[1] + i <= 14) {
            if (newField[index[0]][index[1] + i].player !== player1) {
                newField[index[0]][index[1] + i].weligth = 10 * kef(x_p) / i * kef_x[1] * (kef_x[0] <= 4 ? 1 : 2)
            } else {
                x_p++
            }
        }
    }

    for (let i = 1; i < 5; i++) {
        if (index[1] - i >= 0 && index[1] - i <= 14) {
            if (newField[index[0]][index[1] - i].player !== player1) {
                newField[index[0]][index[1] - i].weligth =  10 * kef(x_m) / i * kef_x[1] * (kef_x[0] <= 4 ? 1 : 2)
            } else {
                x_m++
            }
        }
    }


    for (let i = 1; i < 5; i++) {
        if (index[0] + i <= 14 && index[1] + i <= 14) {
            if (newField[index[0] + i][index[1] + i].player !== player1) {
                newField[index[0] + i][index[1] + i].weligth = 10 * kef(z_p) / i * kef_z[1] * (kef_z[0] <= 4 ? 1 : 2)
            } else {
                z_p++
            }
        }

    }

    for (let i = 1; i < 5; i++) {
        if (index[0] - i >= 0 && index[1] - i >= 0) {
            if (newField[index[0] - i][index[1] - i].player !== player1) {
                newField[index[0] - i][index[1] - i].weligth = 10 * kef(z_m) / i * kef_z[1] * (kef_z[0] <= 4 ? 1 : 2)
            } else {
                z_m++
            }
        }
    }


    for (let i = 1; i < 5; i++) {
        if (index[0] + i <= 14 && index[1] - i >= 0) {
            if (newField[index[0] + i][index[1] - i].player !== player1) {
                newField[index[0] + i][index[1] - i].weligth = 10 * kef(rz_p) / i * kef_rz[1] * (kef_rz[0] <= 4 ? 1 : 2)
            } else {
                rz_p++

            }
        }

    }

    for (let i = 1; i < 5; i++) {
        if (index[0] - i >= 0 && index[1] + i <= 14) {
            if (newField[index[0] - i][index[1] + i].player !== player1) {
                newField[index[0] - i][index[1] + i].weligth = 10 * kef(rz_m) / i * (kef_rz[0] <= 4 ? 1 : 2) * kef_rz[1]
            } else {
                rz_m++

            }
        }
    }


    return newField

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