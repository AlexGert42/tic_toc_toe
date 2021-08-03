import style from './PlayingField.module.scss'

export const PlayingField = ({field, setUser}: any) => {

    const clickHendler = (value: any) => setUser(value)


    return (
        <div className={style.field}>

            {!field ? '' : field.map((line: any, indexL: number) => line.map((el: any, indexC: number) => {
                return (
                    <div
                        className={style.field__cell}
                        key={indexL + indexC}
                        onClick={() => !el.player ? clickHendler([el.indexLine, el.indexCell]) : ''}
                    >
                        {/*<div>{el.index}</div>*/}
                        <div>{el.player}</div>
                    </div>
                )
            }))}

        </div>
    )
}