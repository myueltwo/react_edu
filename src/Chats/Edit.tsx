import React, {SyntheticEvent} from "react";
import ButtonIcon from "./Components/ButtonIcon";
import {IoMdClose, IoMdSave} from 'react-icons/io';
import Members from "./Members";
import {IChats} from "./Data";
import './Edit.scss';

interface IEditProps {
    onClickSave: Function;
    isNew: boolean;
    isGroup: boolean;
    chat?: IChats;
}

export default class Edit extends React.Component<IEditProps> {
    static defaultProps = {
        isNew: true,
        isGroup: false
    }
    handleOnSave(event: SyntheticEvent) {
        if (typeof this.props.onClickSave === 'function') {
            this.props.onClickSave(event, true);
        }
    }
    handleOnClose(event: SyntheticEvent) {
        if (typeof this.props.onClickSave === 'function') {
            this.props.onClickSave(event, false);
        }
    }
    render() {
        const checkedMembers = this.props.chat && this.props.chat.group && Array.isArray(this.props.chat.group)
            ? this.props.chat.group : [];
        return (
            <div className="react_edu-chats-edit">
                <div className="react_edu-chats-edit__top">
                    <input type="search" className="react_edu-chats-edit__top__search"/>
                    <ButtonIcon icon={<IoMdClose/>}
                                handleOnClick={this.handleOnClose.bind(this)}
                    />
                </div>
                <div className="react_edu-chats-edit__middle">
                    <Members canChecked={this.props.isGroup}
                             checked={checkedMembers}
                    />
                </div>
                <div className="react_edu-chats-edit__bottom">
                <ButtonIcon icon={<IoMdSave/>}
                            color="action"
                            handleOnClick={this.handleOnSave.bind(this)}
                />
                </div>
            </div>
        );
    }
}