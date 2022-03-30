import React from "react";
import './SendMsg.scss';

interface ISendMsg {
    id: string;
    onSendHandler?: Function;
}

export default class SendMsg extends React.Component<ISendMsg> {
    render() {
        return (
            <div className="react_edu-chats-send-msg">
                <textarea className="react_edu-chats-send-msg__text-area"/>
                <input type="submit" value="Отправить"/>
            </div>
        );
    }
}