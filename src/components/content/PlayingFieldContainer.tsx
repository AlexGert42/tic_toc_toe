import {connect} from "react-redux";
import {PlayingField} from "./PlayingField";
import {useEffect} from "react";
import {MoveBot, setCount, setField, setUserAction} from "../../redux/gameField/action";
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
                                   twoPlayer,
                                   MoveBot,
                                   lastMoveBot
                               }: any) => {


    useEffect(() => {
        if (game) {
            let inx = 0
            const newfield = (new Array(fieldSize).fill(new Array(fieldSize).fill({}))).map((line, indexL) => line.map((el: any, indexC: any) => {
                inx++
                return {
                    indexLine: indexL,
                    indexCell: indexC,
                    index: inx,
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





            let moveBot = bot(newField, value, lastMoveBot)
            MoveBot(moveBot)


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
    lastMoveBot: state.game.lastMoveBot,

    onePlayer: state.header.onePlayer,
    twoPlayer: state.header.twoPlayer,

})

const mapDispatchToProps = ({
    setField,
    setUserAction,
    setCount,
    MoveBot
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayingFieldContainer)


const bot = (field: any, index: any, lastMove: any) => {
    let lastMoveBot = lastMove ? lastMove : index

    let totelWinsX: any = []
    let totelWinsO: any = []

    // let movesUser = movePoll(index)
    // let movesBot = movePoll(lastMoveBot)

    let moves: any = []


    field.map((line: any) => line.map((cell: any) => {
        if (cell.player === 'X' || cell.player === 'O') {
            let move = movePoll([cell.indexLine, cell.indexCell])
            moves.push(...move)
        }
    }))




    let countPart = 0

    gameAnalisis(moves)


    let maxX = 0
    let maxO = 0

    let indexPlayerX: any = []
    let indexPlayerO: any = []





    const newBoardX = [...field.map((line: any) => {
        return [...line.map((cell: any) => {
            return {...cell}
        })]
    })]

    const newBoardO = [...field.map((line: any) => {
        return [...line.map((cell: any) => {
            return {...cell}
        })]
    })]


    newBoardX.map((line: any) => line.map((el: any) => {
        totelWinsX.map((inxLine: any) => inxLine.map((inx: any) => {
            if (inxLine.length < 2) {
                if (el.indexLine === inx[0] && el.indexCell === inx[1]) {
                    el.weligth += 5000
                }

            } else if (inxLine.length < 3) {
                if (el.indexLine === inx[0] && el.indexCell === inx[1]) {
                    el.weligth += 3000
                }

            } else if (inxLine.length < 4) {
                if (el.indexLine === inx[0] && el.indexCell === inx[1]) {
                    el.weligth += 500
                }
            }
            else {
                if (el.indexLine === inx[0] && el.indexCell === inx[1]) {
                    el.weligth += 1
                }
            }
        }))
    }))

    newBoardO.map((line: any) => line.map((el: any) => {
        totelWinsO.map((inxLine: any) => inxLine.map((inx: any) => {
            if (inxLine.length < 2) {
                if (el.indexLine === inx[0] && el.indexCell === inx[1]) {
                    el.weligth += 5000
                }

            } else if (inxLine.length < 3) {
                if (el.indexLine === inx[0] && el.indexCell === inx[1]) {
                    el.weligth += 3000
                }

            } else if (inxLine.length < 4) {
                if (el.indexLine === inx[0] && el.indexCell === inx[1]) {
                    el.weligth += 500
                }
            }
            else {
                if (el.indexLine === inx[0] && el.indexCell === inx[1]) {
                    el.weligth += 1
                }
            }
        }))
    }))







    newBoardX.map((line: any) => line.map((el: any) => {
        if (el.weligth > maxX) {
            maxX = el.weligth
            indexPlayerX = [el.indexLine, el.indexCell]
        }
    }))

    newBoardO.map((line: any) => line.map((el: any) => {
        if (el.weligth > maxX) {
            maxO = el.weligth
            indexPlayerO = [el.indexLine, el.indexCell]
        }
    }))


    let result: any = []


    if (maxX > maxO) {
        field[indexPlayerX[0]][indexPlayerX[1]].player = 'O'
        result = [indexPlayerX[0], indexPlayerX[1]]
    } else {
        field[indexPlayerO[0]][indexPlayerO[1]].player = 'O'
        result = [indexPlayerO[0], indexPlayerO[1]]
    }






    function gameAnalisis(moves: any) {
        const newField = [...field.map((line: any) => {
            return [...line.map((cell: any) => {
                return {...cell}
            })]
        })]

        let partXMove: any = []
        let partOMove: any = []

        let countGameVirtyal = 0

        let part: any = gameVirtual(moves, newField, partXMove, partOMove, [], countGameVirtyal)

        countPart++

        if (part[0] == 'x_win') {
            totelWinsX.push(part[2])
        } else if (part[0] == 'o_win') {
            totelWinsO.push(part[1])
        }


        if (countPart <= 4000) {

                gameAnalisis(moves)


        }

    }


    function gameVirtual(moves: any, field: any, movesX: any, movesO: any, winP: any, count: any) {
        let countRec = 0
        count++

        if (count % 2 === 0) {
            let moveO = rec1(moves, field, 'O', countRec)
            if (moveO) {
                movesO.push(moveO)
                let resO = movePlayer([moveO[0], moveO[1]], field, 'O')
                if (resO) {
                    winP.push('o_win')
                    return [winP, movesO, movesX]
                }
            }
        } else {
            let moveX = rec1(moves, field, 'X', countRec)
            if (moveX) {
                movesX.push(moveX)
                let resX = movePlayer([moveX[0], moveX[1]], field, 'X')
                if (resX) {
                    winP.push('x_win')
                    return [winP, movesO, movesX]
                }
            }
        }

        if (count <= moves.length) {
            gameVirtual(moves, field, movesX, movesO, winP, count)
        }


        return [winP, movesO, movesX]
    }


    function rec1(moves: any, vField: any, player: any, count: any) {
        count++
        if (count >= 50) {
            return null
        }








        let inx = Math.floor(Math.random() * (moves.length))
        let index = moves[inx]

        if (vField[index[0]][index[1]].player !== 'X' && vField[index[0]][index[1]].player !== 'O') {
            vField[index[0]][index[1]].player = player
            return [index[0], index[1]]

        }
        // vField[index[0]][index[1]].player = player
        // return [index[0], index[1]]
        else {
            rec1(moves, vField, player, count)
        }


    }






    function movePoll(index: any) {
        let move = []

        for (let i = 0; i < 6; i++) {
            if (index[0] + i >= 0 && index[0] + i <= 14) {
                if (field[index[0] + i][index[1]].player !== 'X' && field[index[0] + i][index[1]].player !== 'O') {
                    move.push([index[0] + i, index[1]])
                }
            }
            if (index[0] - i >= 0 && index[0] - i <= 14) {
                if (field[index[0] - i][index[1]].player !== 'X' && field[index[0] - i][index[1]].player !== 'O') {
                    move.push([index[0] - i, index[1]])
                }
            }
            if (index[1] + i >= 0 && index[1] + i <= 14) {
                if (field[index[0]][index[1] + i].player !== 'X' && field[index[0]][index[1] + i].player !== 'O') {
                    move.push([index[0], index[1] + i])
                }
            }
            if (index[1] - i >= 0 && index[1] - i <= 14) {
                if (field[index[0]][index[1] - i].player !== 'X' && field[index[0]][index[1] - i].player !== 'O') {
                    move.push([index[0], index[1] - i])
                }
            }
            if (index[0] + i <= 14 && index[1] + i <= 14) {
                if (field[index[0] + i][index[1] + i].player !== 'X' && field[index[0] + i][index[1] + i].player !== 'O') {
                    move.push([index[0] + i, index[1] + i])
                }
            }
            if (index[0] - i >= 0 && index[1] - i >= 0) {
                if (field[index[0] - i][index[1] - i].player !== 'X' && field[index[0] - i][index[1] - i].player !== 'O') {
                    move.push([index[0] - i, index[1] - i])
                }
            }
            if (index[0] + i <= 14 && index[1] - i >= 0) {
                if (field[index[0] + i][index[1] - i].player !== 'X' && field[index[0] + i][index[1] - i].player !== 'O') {
                    move.push([index[0] + i, index[1] - i])
                }

            }
            if (index[0] - i >= 0 && index[1] + i <= 14) {
                if (field[index[0] - i][index[1] + i].player !== 'X' && field[index[0] - i][index[1] + i].player !== 'O') {
                    move.push([index[0] - i, index[1] + i])
                }
            }
        }
        return move

    }


    return result

}









