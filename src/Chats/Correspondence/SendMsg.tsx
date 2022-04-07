import React, {BaseSyntheticEvent, SyntheticEvent} from "react";
import './SendMsg.scss';
import {FiSend} from "react-icons/fi";
import ButtonIcon from "../Components/ButtonIcon";

interface ISendMsg {
    id: string;
    onSendHandler?: Function;
}
interface ISendMsgState {
    value: string;
}

export default class SendMsg extends React.Component<ISendMsg> {
    state: ISendMsgState;
    constructor(props: any) {
        super(props);
        this.state = {
            value: ''
        };
    }
    handlerOnSend(event?: SyntheticEvent) {
        if (typeof this.props.onSendHandler === 'function') {
            this.props.onSendHandler(event, this.props.id, this.state.value);
        }
        this.setState({
            value: ''
        });
    }
    handleChange(event: BaseSyntheticEvent) {
        this.setState({value: event.target.value});
    }
    handleKeyUp(event: React.KeyboardEvent) {
        if (event.ctrlKey && event.code.toLowerCase() === 'enter') {
            this.handlerOnSend();
        }
    }
    render() {
        return (
            <div className="react_edu-chats-send-msg" onKeyUp={this.handleKeyUp.bind(this)}>
                <textarea className="react_edu-chats-send-msg__text-area"
                          value={this.state.value}
                          onChange={this.handleChange.bind(this)}
                />
                <ButtonIcon icon={<FiSend/>}
                            handleOnClick={this.handlerOnSend.bind(this)}
                            color="action"
                />
            </div>
        );
    }
}