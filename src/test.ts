

export const move32321PlayerBot = (index: any, field: any, player: any, kefPlayer: any) => {
    const newField = [...field.map((line: any) => {
        return [...line.map((cell: any) => {
            return {...cell}
        })]
    })]

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


    let arr_y_m = 0
    let arr_y_p = 0




    for (let i = 1; i < 5; i++) {
        if (index[0] - i >= 0 && index[0] - i <= 14) {

            if (newField[index[0] - i][index[1]].player !== 'X' && newField[index[0] - i][index[1]].player !== 'O') {
                arr_y_m++
            }
        }
    }
    console.log(arr_y_m)

    for (let i = 1; i < 5; i++) {
        if (index[0] + i >= 0 && index[0] + i <= 14) {
            if (newField[index[0] + i][index[1]].player !== 'X' && newField[index[0] + i][index[1]].player !== 'O') {
                arr_y_p++

            }
        }

    }

    console.log(arr_y_p)

    for (let i = 1; i < 5; i++) {
        if (index[0] - i >= 0 && index[0] - i <= 14) {

            if (newField[index[0] - i][index[1]].player !== player) {
                newField[index[0] - i][index[1]].weligth = 10 * kef(y_m) / i
            } else {
                y_m++

            }
        }
    }

    for (let i = 1; i < 5; i++) {
        if (index[0] + i >= 0 && index[0] + i <= 14) {
            if (newField[index[0] + i][index[1]].player !== player) {
                newField[index[0] + i][index[1]].weligth = 10 * kef(y_p) / i

            } else {
                y_p++

            }
        }

    }



    for (let i = 1; i < 5; i++) {
        if (index[1] + i >= 0 && index[1] + i <= 14) {
            if (newField[index[0]][index[1] + i].player !== player) {
                newField[index[0]][index[1] + i].weligth = 10 * kef(x_p) / i
            } else {
                x_p++
            }
        }
    }

    for (let i = 1; i < 5; i++) {
        if (index[1] - i >= 0 && index[1] - i <= 14) {
            if (newField[index[0]][index[1] - i].player !== player) {
                newField[index[0]][index[1] - i].weligth =  10 * kef(x_m) / i
            } else {
                x_m++
            }
        }
    }


    for (let i = 1; i < 5; i++) {
        if (index[0] + i <= 14 && index[1] + i <= 14) {
            if (newField[index[0] + i][index[1] + i].player !== player) {
                newField[index[0] + i][index[1] + i].weligth = 10 * kef(z_p) / i
            } else {
                z_p++
            }
        }

    }

    for (let i = 1; i < 5; i++) {
        if (index[0] - i >= 0 && index[1] - i >= 0) {
            if (newField[index[0] - i][index[1] - i].player !== player) {
                newField[index[0] - i][index[1] - i].weligth = 10 * kef(z_m) / i
            } else {
                z_m++
            }
        }
    }


    for (let i = 1; i < 5; i++) {
        if (index[0] + i <= 14 && index[1] - i >= 0) {
            if (newField[index[0] + i][index[1] - i].player !== player) {
                newField[index[0] + i][index[1] - i].weligth = 10 * kef(rz_p) / i
            } else {
                rz_p++

            }
        }

    }

    for (let i = 1; i < 5; i++) {
        if (index[0] - i >= 0 && index[1] + i <= 14) {
            if (newField[index[0] - i][index[1] + i].player !== player) {
                newField[index[0] - i][index[1] + i].weligth = 10 * kef(rz_m) / i
            } else {
                rz_m++

            }
        }
    }

    // winsMoveBot(wins_y, player)
    return newField
    // winsMoveBot(wins_x, player) && count++
    // winsMoveBot(wins_z, player) && count++
    // winsMoveBot(wins_rz, player) && count++
    //
    // return count
}