import style from './Header.module.scss'


export const Header = ({gameAction, onePlayerAction, twoPlayerAction, removeGameAction, onePlayer, twoPlayer, count}: any) => {

    const clickHendlerGame = () => gameAction()
    const clickHendlerOnePlayer = () => onePlayerAction()
    const clickHendlerTwoPlayer = () => twoPlayerAction()
    const clickHendlerOutGame = () => removeGameAction()


    return (
        <div className={style.header}>
            <div className={style.header__inner}>
                <h1 className={style.header__logo}>Tic Toc Toe</h1>
                <div style={{color: '#fff'}}>{count}</div>
                <nav className={style.header__menu}>
                    <button className={style.header__btn} onClick={clickHendlerGame}>Game</button>
                    <button className={style.header__btn} disabled={twoPlayer} onClick={clickHendlerOnePlayer}>One Player</button>
                    <button className={style.header__btn} disabled={onePlayer} onClick={clickHendlerTwoPlayer}>Two Player</button>
                    <button className={style.header__btn} onClick={clickHendlerOutGame}>Out Game</button>
                </nav>
            </div>
        </div>
    )
}