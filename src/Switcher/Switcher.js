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
    updateStatus = (app) => {
        return <div className="react_edu-switcher-main__app">
            <a href="#" className="react_edu-switcher-main__app__back" onClick={this.handleClickBack}>Назад</a>
            <div className="react_edu-switcher-main__app__content">
                {app}
            </div>
        </div>
    }

    render() {
        const runApp = this.state.runApp;
        let status;
        switch (runApp) {
            case 'Game':
                status = this.updateStatus(<Game/>);
                break;
            case 'Chats':
                status = this.updateStatus(<Chats/>);
                break;
            default:
                status = <ul className="react_edu-switcher-main__list">
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
            <div className="react_edu-switcher-main">
                {status}
            </div>
        );
    }
}