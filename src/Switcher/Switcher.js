import React from "react";
import Game from "../Game/Game";
export default class Switcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runApp: 'default'
        }
    }
    handleClickGame = () => {
        this.setState({
            runApp: 'Game'
        });
    }
    handleClickBack = () => {
        this.setState({
            runApp: 'default'
        });
    }
    render() {
        const runApp = this.state.runApp;
        const backBtn = <a href="#" onClick={this.handleClickBack}>Назад</a>;
        let status;
        switch (runApp) {
            case 'Game':
                status =
                    <div>
                        {backBtn}
                        <Game/>
                    </div>
                break;
            default:
                status = <a href="#" onClick={this.handleClickGame}>Игра "Крестики-нолики"</a>;
        }
        return (
            <div>{status}</div>
        );
    }
}