import React from "react";
import {IMessage, myUserId} from "../Data";
import Item from "./Item";

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
        const messagesContent = messagesList.length ? messagesList : <div>Write first</div>;
        return (
            <div className="react_edu-chats-messages">
                {messagesContent}
            </div>
        );
    }
}