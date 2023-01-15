import React, {SyntheticEvent} from "react";
import './Chats.scss';
import {chats, correspondence as correspondenceData, IChats, ICorrespondence, myUserId} from './Data';
import chatRow from "./Row";
import Correspondence from "./Correspondence/Correspondence";
import {v4} from 'uuid';
import { BiMessageAdd } from 'react-icons/bi';
import {AiOutlineUsergroupAdd, AiOutlineUserAdd} from 'react-icons/ai';
import MenuButtonIcon from "./Components/MenuButtonIcon";
import Edit from "./Edit";

interface IChatsState {
    chatsList: IChats[];
    selectedChatId: string;
    correspondence: ICorrespondence[];
    isEdit: boolean;
    edit?: {
        isNew: boolean;
        isGroup: boolean;
        chat?: IChats;
    }
}

export default class Chats extends React.Component {
    state: IChatsState;
    constructor(props: any) {
        super(props);
        this.state = {
            chatsList: [...chats],
            selectedChatId: chats[0].id,
            correspondence: [...correspondenceData],
            isEdit: false
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

    handlerClickToChat(id: string) {
        this.setState({selectedChatId: id});
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

    handleOnMenuItemClick(event: SyntheticEvent, key: string) {
        this.setState({
            isEdit: true,
            edit: {
                isNew: true,
                isGroup: key === 'createGroup'
            }
        });
    }
    handleSaveChat(event: SyntheticEvent | null, chat: IChats | null, isNew: boolean | null) {
        if (chat) {
            const chatsList = this.state.chatsList.slice();
            if (isNew) {
                if (!Array.isArray(chat.group)) {
                    for (let i = 0; i < chatsList.length; i++) {
                        const currentChat = chatsList[i];
                        if (currentChat.group === chat.group) {
                            this.setState({
                                selectedChatId: currentChat.id,
                                isEdit: false
                            });
                            return;
                        }
                    }
                }
                chatsList.push(chat);
            } else {
                for (let i = 0; i < chatsList.length ; i++) {
                    const currentChat = chatsList[i];
                    if (currentChat.id === chat.id) {
                        chatsList[i] = chat;
                        break;
                    }
                }
            }
            this.setState({
                chatsList: chatsList,
                selectedChatId: chat.id,
                isEdit: false
            });
        } else {
            this.setState({
                isEdit: false
            });
        }
    }

    handleEditChat() {
        let selectedChat;
        for (let i = 0; i < this.state.chatsList.length; i++) {
            const currentChat = this.state.chatsList[i];
            if (currentChat.id === this.state.selectedChatId) {
                selectedChat = currentChat;
                break;
            }
        }
        if (selectedChat) {
            this.setState({
                isEdit: true,
                edit: {
                    isNew: false,
                    isGroup: Array.isArray(selectedChat.group),
                    chat: selectedChat
                }
            });
        }
    }

    handleRemoveChat() {
        const chatsList = this.state.chatsList.slice();
        for (let i = 0; i < this.state.chatsList.length; i++) {
            const currentChat = this.state.chatsList[i];
            if (currentChat.id === this.state.selectedChatId) {
                chatsList.splice(i, 1);
                if (chatsList.length) {
                    const newSelectedChatInd = i < chatsList.length ? i : i - 1;
                    this.setState({
                        chatsList,
                        selectedChatId: chatsList[newSelectedChatInd].id
                    });
                } else {
                    this.setState({
                        chatsList,
                        selectedChatId: null
                    });
                }
                break;
            }
        }
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
                    onClick: () => {
                        this.handlerClickToChat(chat.id);
                    }
                })
            );
        }
        if (selectedChat) {
            return (
                <div className="react_edu-chats-main">
                    <div className="react_edu-chats-main__list">
                        <div className="react_edu-chats-main__list__scroll">
                            {chatsList}
                        </div>
                        {this.state.isEdit
                            ?
                            <div className="react_edu-chats-main__list__edit">
                                <Edit onClickSave={this.handleSaveChat.bind(this)}
                                      isGroup={this.state.edit?.isGroup}
                                      isNew={this.state.edit?.isNew}
                                      chat={this.state.edit?.chat}
                                />
                            </div>
                            : ''
                        }
                        <div className="react_edu-chats-main__list__add-btn">
                            <MenuButtonIcon icon={<BiMessageAdd/>}
                                            items={[{
                                                key: 'createGroup',
                                                name: 'New Group',
                                                icon: <AiOutlineUsergroupAdd/>
                                            }, {
                                                key: 'createPrivateChat',
                                                name: 'New Private Chat',
                                                icon: <AiOutlineUserAdd/>
                                            }]}
                                            handleOnMenuItemClick={this.handleOnMenuItemClick.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="react_edu-chats-main__correspondence">
                        <Correspondence chat={selectedChat}
                                        correspondence={selectedCorrespondence}
                                        onSendHandler={this.handlerOnSend.bind(this)}
                                        onEditHandler={this.handleEditChat.bind(this)}
                                        onRemoveHandler={this.handleRemoveChat.bind(this)}
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