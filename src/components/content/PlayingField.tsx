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
                        {/*<div style={el.weligth == '0' ? {color: 'black', fontSize: '1px'} : {color: 'red', fontSize: '25px'}}>{el.weligth}</div>*/}
                        <div>{el.player}</div>
                    </div>
                )
            }))}

        </div>
    )
}