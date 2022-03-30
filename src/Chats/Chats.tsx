import React from "react";
import './Chats.scss';
import {chats, correspondence as correspondenceData, IChats, ICorrespondence} from './Data';
import chatRow from "./Row";
import Correspondence from "./Correspondence/Correspondence";

interface IChatsState {
    chatsList: IChats[];
    selectedChatId: string;
    correspondence: ICorrespondence[];
}

export default class Chats extends React.Component {
    state: IChatsState;
    constructor(props: any) {
        super(props);
        this.state = {
            chatsList: [...chats],
            selectedChatId: chats[0].id,
            correspondence: [...correspondenceData]
        }
    }

    getParamsToCorrespondence(): { selectedChat?: IChats,  selectedCorrespondence?: ICorrespondence} {
        let selectedChat;
        let selectedCorrespondence;
        for (let i = 0; i < this.state.chatsList.length ; i++) {
            let chat = this.state.chatsList[i];
            if (this.state.selectedChatId === chat.id) {
                selectedChat = chat;
            }
        }
        for (let i = 0; i < this.state.correspondence.length ; i++) {
            let curCorrespondence = this.state.correspondence[i];
            if (this.state.selectedChatId === curCorrespondence.chat_id) {
                selectedCorrespondence = curCorrespondence;
            }
        }
        return {
            selectedChat,
            selectedCorrespondence
        };
    }

    handlerClickToChat() {
        // console.log(this);
    }

    render() {
        const chatsList = [];
        const {selectedChat, selectedCorrespondence} = this.getParamsToCorrespondence();
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
        if (selectedChat) {
            return (
                <div className="react_edu-chats-main">
                    <div className="react_edu-chats-main__list">
                        {chatsList}
                    </div>
                    <div className="react_edu-chats-main__correspondence">
                        <Correspondence chat={selectedChat}
                                        correspondence={selectedCorrespondence}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div>Пустой экран</div>
            );
        }
    }
}