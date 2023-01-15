import React from "react";
import './Header.scss';
import {FiEdit, FiTrash2} from "react-icons/fi";
import ButtonIcon from "../Components/ButtonIcon";

interface IHeaderProps {
    chatName: string;
    canEdit: boolean;
    onEditHandler: Function;
    onRemoveHandler: Function;
}

export default class Header extends React.Component<IHeaderProps> {
    static defaultProps = {
        canEdit: false
    }

    render() {
        return (
            <div className="react_edu-chats-header">
                <div className="react_edu-chats-header__name">{this.props.chatName}</div>
                <div className="react_edu-chats-header__tools">
                    {this.props.canEdit ?
                        <div className="react_edu-chats-header__tools__edit">
                            <ButtonIcon icon={<FiEdit/>}
                                        size="s"
                                        handleOnClick={this.props.onEditHandler}
                                        color="secondary"
                            />
                        </div> : ''
                    }
                    <ButtonIcon icon={<FiTrash2/>}
                                size="s"
                                handleOnClick={this.props.onRemoveHandler}
                                color="secondary"
                    />
                </div>
            </div>
        );
    }
}