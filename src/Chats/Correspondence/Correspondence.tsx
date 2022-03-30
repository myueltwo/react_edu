import React from "react";
import {IChats, ICorrespondence} from "../Data";
import Header from "./Header";
import Messages from "./Messages";
import SendMsg from "./SendMsg";
import './Correspondence.scss';
interface ICorrespondenceProps {
    chat: IChats;
    correspondence?: ICorrespondence;
    onSendHandler?: Function;
}
export default class Correspondence extends React.Component<ICorrespondenceProps> {
    render() {
        let messagesContent =
            <div className="react_edu-chats-correspondence__messages">
                <Messages items={this.props.correspondence?.messages}/>
            </div>;

        return (
            <div className="react_edu-chats-correspondence">
                <div className="react_edu-chats-correspondence__header">
                <Header
                    chatName={this.props.chat.name}
                />
                </div>
                {messagesContent}
                <SendMsg id={this.props.chat.id}
                         onSendHandler={this.props.onSendHandler}
                />
            </div>
        );
    }
}