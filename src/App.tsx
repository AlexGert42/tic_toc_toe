import React from 'react';
import HeaderContainer from "./components/header/HeaderContainer"
import PlayingFieldContainer from "./components/content/PlayingFieldContainer";


export const App = () => {

    return (
        <div>
            <HeaderContainer/>
            <PlayingFieldContainer/>
        </div>
    )
}
