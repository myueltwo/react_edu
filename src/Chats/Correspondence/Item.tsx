import {IMessage} from "../Data";
import './Item.scss';

interface IItemMsgProps {
    msg: IMessage;
    isOutgoing: boolean;
}

export default function Item(props: IItemMsgProps) {
    const dateToString = props.msg.dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const outgoingContent = 'react_edu-chats-messages-item__content-' +
        (props.isOutgoing ? 'outgoing' : 'inner')
    const outgoing = 'react_edu-chats-messages-item-' +
        (props.isOutgoing ? 'outgoing' : 'inner')
    return (
        <div className={'react_edu-chats-messages-item ' + outgoing}
             key={'messages-item' + props.msg.id}>
            <div className={'react_edu-chats-messages-item__content ' + outgoingContent}>
                <div className="react_edu-chats-messages-item__text">{props.msg.text}</div>
                <div className="react_edu-chats-messages-item__date">{dateToString}</div>
            </div>
        </div>
    );
}