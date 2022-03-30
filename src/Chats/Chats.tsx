import React, {SyntheticEvent} from "react";
import './Chats.scss';
import {chats, correspondence as correspondenceData, IChats, ICorrespondence, myUserId} from './Data';
import chatRow from "./Row";
import Correspondence from "./Correspondence/Correspondence";
import {v4} from 'uuid';

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
    handlerOnSend(event: SyntheticEvent, chatId: string, text: string) {
        const newCorrespondence = [...this.state.correspondence];
        let isExistCorrespondence = false;
        const addMsg = function () {
            return {
                sender_id: myUserId,
                dateTime: new Date(),
                text,
                id: v4()
            };
        }
        for (let i = 0; i < newCorrespondence.length ; i++) {
            let curCorrespondence = newCorrespondence[i];
            if (chatId === curCorrespondence.chat_id) {
                isExistCorrespondence = true;
                curCorrespondence.messages.push(addMsg());
                break;
            }
        }
        if (!isExistCorrespondence) {
            newCorrespondence.push({
                id: v4(),
                chat_id: chatId,
                messages: [
                    addMsg()
                ]
            });
        }
        this.setState({
            correspondence: newCorrespondence
        });
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
                                        onSendHandler={this.handlerOnSend.bind(this)}
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