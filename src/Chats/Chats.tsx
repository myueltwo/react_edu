import React from "react";
import './Chats.scss';
import {chats, IChats} from './Data';

interface IChatsState {
    chatsList: IChats[];
    selectedChatId: string;
}

export default class Chats extends React.Component {
    state: IChatsState;
    constructor(props: any) {
        super(props);
        this.state = {
            chatsList: [...chats],
            selectedChatId: chats[0].id
        }
    }

    render() {
        const chatsList = [];
        for (let i = 0; i < this.state.chatsList.length ; i++) {
            chatsList.push(
                <div className="board-row"
                     key={'board-row' + i}
                >
                    {this.state.chatsList[i].name}
                </div>
            );
        }
        return (
            <div className="react_edu-chats-main">
                <div className="react_edu-chats-main__list">
                    {chatsList}
                </div>
                <div className="react_edu-chats-main__correspondence"></div>
            </div>
        );
    }
}