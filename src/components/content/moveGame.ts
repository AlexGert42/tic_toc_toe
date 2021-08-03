import {log} from "util";


export const movePlayer = (index: any, newField: any, player: any) => {

    let wins_x = []
    let wins_y = []
    let wins_z = []
    let wins_rz = []

    let res_y;
    let res_x;
    let res_z;
    let res_rz;

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


    res_y = winsMove(wins_y, player, index)
    res_x = winsMove(wins_x, player, index)
    res_z = winsMove(wins_z, player, index)
    res_rz = winsMove(wins_rz, player, index)


    return [res_y, res_x, res_z, res_rz]
}



const winsMove = (arrWins: any, player: any, index: any) => {
    let res = false;
    for (let i = 0; i < arrWins.length; i++) {
        if (
            arrWins[i + 0] === player &&
            arrWins[i + 1] === player &&
            arrWins[i + 2] === player &&
            arrWins[i + 3] === player &&
            arrWins[i + 4] === player &&
            arrWins[i + 5] === player
        ) {
            console.log(`${player} wins`)
            res = true
            break
        }
    }
    return res
}