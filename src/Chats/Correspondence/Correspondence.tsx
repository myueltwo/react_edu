import React from "react";
import {IChats, ICorrespondence} from "../Data";
import Header from "./Header";
import Messages from "./Messages";
interface ICorrespondenceProps {
    chat: IChats;
    correspondence?: ICorrespondence;
}
export default class Correspondence extends React.Component<ICorrespondenceProps> {
    render() {
        let messagesContent;
        if (this.props.correspondence) {
            const messages = this.props.correspondence.messages;
            if (messages.length) {
                messagesContent = <Messages items={messages}/>
            }

        }
        return (
            <div>
                <Header
                    name={this.props.chat.name}
                />
                {messagesContent}
            </div>
        );
    }
}