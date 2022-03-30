import React from "react";
import './Header.scss';

interface IHeaderProps {
    chatName: string;
}

export default class Header extends React.Component<IHeaderProps> {
    render() {
        return (
            <div className="chat-correspondence">
                <div className="chat-correspondence__name">{this.props.chatName}</div>
            </div>
        );
    }
}