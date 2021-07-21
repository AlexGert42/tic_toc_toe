import { Header } from "./Header"
import {connect} from "react-redux";
import {gameAction, onePlayerAction, removeGameAction, twoPlayerAction} from "../../redux/header/action";



const HeaderContainer = (props: any) => {

    return (
        <Header {...props} />
    )
}


const mapStateToProps = (state: any) => ({
    game: state.header.game,
    onePlayer: state.header.onePlayer,
    twoPlayer: state.header.twoPlayer,

    count: state.game.count
})

const mapDispatchToProps = ({
    gameAction,
    onePlayerAction,
    twoPlayerAction,
    removeGameAction
})


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)