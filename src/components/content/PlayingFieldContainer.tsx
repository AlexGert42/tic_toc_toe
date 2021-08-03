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


const bot = (field: any, index: any, player: any) => {
    // const newField = [...field.map((line: any) => {
    //     return [...line.map((cell: any) => {
    //         return {...cell}
    //     })]
    // })]

    let count = 0
    let countRec = 0

    const analisis = () => {


        if (count % 2 === 0) {
            rec(field, 'X')
        } else {
            rec(field, 'O')
        }
        count++
        if (count >= 255) {
            return
        } else {
            analisis()
        }


    }


    const rec = ( field: any, player: any) => {
        if (countRec >= 1000) {
            return
        }
        countRec++
        let pos1 = Math.floor(Math.random() * (15))
        let pos2 = Math.floor(Math.random() * (15))

        if (field[pos1][pos2].player !== 'X' && field[pos1][pos2].player !== 'O' ) {
            field[pos1][pos2].player = player
            console.log('Y:', pos1, 'X:', pos2, 'P:', player)
            movePlayer([pos1, pos2], field, player)
        } else {
            rec(field, player)
        }

    }


    analisis()





}









