import React from "react";
import {IMessage, myUserId} from "../Data";
import Item from "./Item";
import './Messages.scss';

interface IMessagesProps {
    items?: IMessage[];
}
export default class Messages extends React.Component<IMessagesProps> {
    render() {
        let messagesList = [];
        if (this.props.items) {
            for (let i = 0; i < this.props.items.length; i++) {
                let msg = this.props.items[i];
                messagesList.push(
                    Item({
                        msg,
                        isOutgoing: msg.sender_id === myUserId
                    })
                );
            }
        }
        const messagesContent = messagesList.length ? messagesList
            : <div className="react_edu-chats-messages__empty">Write first</div>;
        return (
            <div className="react_edu-chats-messages">
                <div className="react_edu-chats-messages__content">
                    {messagesContent}
                </div>
            </div>
        );
    }
}