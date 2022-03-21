import React from "react";
import './Chats.scss';
export default class Chats extends React.Component {
    render() {
        return (
            <div className="react_edu-chats-main">
                <div className="react_edu-chats-main__list"></div>
                <div className="react_edu-chats-main__correspondence"></div>
            </div>
        );
    }
}