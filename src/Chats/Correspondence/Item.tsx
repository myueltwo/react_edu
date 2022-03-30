import {IMessage} from "../Data";

interface IItemMsgProps {
    msg: IMessage;
    isOutgoing: boolean;
}

export default function Item(props: IItemMsgProps) {
    const dateToString = props.msg.dateTime.toLocaleTimeString();
    return (
        <div className={'react_edu-chats-messages-item' + props.isOutgoing ? 'react_edu-chats-messages-item-outgoing'
            : ''}
             key={'messages-item' + props.msg.id}>
            <div className="react_edu-chats-messages-item__text">{props.msg.text}</div>
            <div className="react_edu-chats-messages-item__date">{dateToString}</div>
        </div>
    );
}