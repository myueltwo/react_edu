import {IChats} from "./Data";
import {MouseEventHandler} from "react";
import './Row.scss';

interface IRowProps {
    chat: IChats;
    selected?: boolean;
    onClick: MouseEventHandler;
}

export default function chatRow(props: IRowProps) {
        return (
            <div className={"chat-row" + (props.selected ? ' chat-row-selected' : '')}
                 key={'chat-row' + props.chat.id}
                 onClick={props.onClick}
            >
                <div className="chat-row__name">
                {props.chat.name}
                </div>
            </div>
        );
}