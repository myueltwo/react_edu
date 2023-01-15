import React, {SyntheticEvent} from "react";
import {v4} from 'uuid';
import ButtonIcon from "./Components/ButtonIcon";
import {IoMdClose, IoMdSave} from 'react-icons/io';
import Members from "./Members";
import {IChats, contacts} from "./Data";
import './Edit.scss';

interface IEditProps {
    onClickSave: Function;
    isNew: boolean;
    isGroup: boolean;
    chat?: IChats;
}
interface IEditState {
    name: string;
    checkedMembers: string | string[];
}

export default class Edit extends React.Component<IEditProps> {
    state: IEditState;
    static defaultProps = {
        isNew: true,
        isGroup: false
    }
    private nameInput: React.RefObject<HTMLInputElement>;

    constructor(props: IEditProps) {
        super(props);
        this.nameInput = React.createRef();
        this.state = {
            name: props.chat?.name || '',
            checkedMembers: props.chat && props.chat.group && Array.isArray(props.chat.group)
                ? props.chat.group : ''
        };
    }

    componentDidMount(){
        if (this.nameInput) {
            this.nameInput.current?.focus();
        }
    }

    componentDidUpdate(prevProps: IEditProps, prevState: IEditState) {
        if (!this.props.isGroup && prevState.checkedMembers !== this.state.checkedMembers) {
            this.handleOnSave(null);
        }
    }

    handleOnSave(event: SyntheticEvent | null) {
        if (typeof this.props.onClickSave === 'function') {
            let chat = {...this.props.chat};
            if (this.props.isNew) {
                let name = '';
                if (this.props.isGroup) {
                    name = this.state.name;
                } else {
                    for (let i = 0; i < contacts.length; i++) {
                        const contact = contacts[i];
                        if (contact.id === this.state.checkedMembers) {
                            name = contact.name;
                            break;
                        }
                    }
                }
                chat = {
                    id: v4(),
                    name,
                    group: this.state.checkedMembers
                }
            } else {
                chat.name = this.state.name;
                chat.group = this.state.checkedMembers;
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
        return (
            <div className="react_edu-chats-edit">
                {this.props.isGroup ?
                    <div className="react_edu-chats-edit__top">
                        <input
                            ref={this.nameInput}
                            type="text" placeholder="Enter chat's name"
                            className="react_edu-chats-edit__top__search"
                            value={this.state.name}
                            onChange={(e) => {
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
                             checked={Array.isArray(this.state.checkedMembers) ?
                                 this.state.checkedMembers : []}
                             updateChecked={(e: SyntheticEvent, checkedMembers: string | string[]) => {
                                 this.setState({
                                     checkedMembers: checkedMembers
                                 });
                             }}
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
                                handleOnClick={(e: SyntheticEvent) => {
                                    this.handleOnSave(e)
                                }}
                    />
                </div>
            </div>
        );
    }
}