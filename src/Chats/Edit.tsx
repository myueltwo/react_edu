import React, {SyntheticEvent} from "react";
import {v4} from 'uuid';
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
    state: {
        name: string;
    }
    static defaultProps = {
        isNew: true,
        isGroup: false
    }
    constructor(props: IEditProps) {
        super(props);
        this.state = {
            name: ''
        };
    }

    handleOnSave(event: SyntheticEvent, checkedMembers: string[]) {
        if (typeof this.props.onClickSave === 'function') {
            let chat = this.props.chat;
            if (this.props.isNew) {
                chat = {
                    id: v4(),
                    name: this.state.name,
                    group: checkedMembers
                }
            }
            this.props.onClickSave(event, chat, this.props.isNew);
        }
    }

    handleOnClose(event: SyntheticEvent) {
        if (typeof this.props.onClickSave === 'function') {
            this.props.onClickSave(event);
        }
    }

    render() {
        const checkedMembers = this.props.chat && this.props.chat.group && Array.isArray(this.props.chat.group)
            ? this.props.chat.group : [];
        return (
            <div className="react_edu-chats-edit">
                {this.props.isGroup ?
                    <div className="react_edu-chats-edit__top">
                        <input type="text" placeholder="Enter chat's name"
                               className="react_edu-chats-edit__top__search"
                               value={this.state.name}
                               onChange={(e)=> {
                                    this.setState({name: e.target.value})
                               }}
                        />
                        <ButtonIcon icon={<IoMdClose/>}
                                    size="s"
                                    handleOnClick={this.handleOnClose.bind(this)}
                        />
                    </div>
                    : ''
                }
                <div className="react_edu-chats-edit__middle">
                    <Members canChecked={this.props.isGroup}
                             checked={checkedMembers}
                    />
                    {!this.props.isGroup ?
                        <div className="react_edu-chats-edit__middle__close">
                            <ButtonIcon icon={<IoMdClose/>}
                                        size="s"
                                        handleOnClick={this.handleOnClose.bind(this)}
                            />
                        </div>
                        : ""
                    }
                </div>
                <div className="react_edu-chats-edit__bottom">
                    <ButtonIcon icon={<IoMdSave/>}
                                color="action"
                                handleOnClick={(e: SyntheticEvent)=>{
                                    this.handleOnSave(e, checkedMembers)
                                }}
                    />
                </div>
            </div>
        );
    }
}