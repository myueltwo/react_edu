import React from "react";
import './Chats.scss';
import {chats, IChats} from './Data';
import chatRow from "./Row";

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

    handlerClickToChat() {
        // console.log(this);
    }

    render() {
        const chatsList = [];
        for (let i = 0; i < this.state.chatsList.length ; i++) {
            let chat = this.state.chatsList[i];
            chatsList.push(
                chatRow({
                    chat,
                    selected: this.state.selectedChatId === chat.id,
                    onClick: this.handlerClickToChat.bind(this)
                })
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