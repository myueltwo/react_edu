import React from "react";
import Game from "../Game/Game";
import Chats from "../Chats/Chats";
import './Switcher.scss';
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
    handleClickChats = () => {
        this.setState({
            runApp: 'Chats'
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
            case 'Chats':
                status =
                    <div>
                        {backBtn}
                        <Chats/>
                    </div>
                break;
            default:
                status = <ul class="react_edu-switcher-main">
                    <li>
                        <a href="#" onClick={this.handleClickGame}>Игра
                            "Крестики-нолики"
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={this.handleClickChats}>"Чаты"</a>
                    </li>
                </ul>;
        }
        return (
            <div>{status}</div>
        );
    }
}