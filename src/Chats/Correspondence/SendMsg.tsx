import React, {BaseSyntheticEvent, SyntheticEvent} from "react";
import './SendMsg.scss';

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
    handlerOnSend(event: SyntheticEvent) {
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
    render() {
        return (
            <div className="react_edu-chats-send-msg">
                <textarea className="react_edu-chats-send-msg__text-area"
                          value={this.state.value}
                          onChange={this.handleChange.bind(this)}
                />
                <input type="submit" value="Отправить" onClick={this.handlerOnSend.bind(this)}/>
            </div>
        );
    }
}