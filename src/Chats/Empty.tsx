import React, {SyntheticEvent, useState} from "react";
import Edit from "./Edit";
import {IChats} from "./Data";
import "./Empty.scss";

interface IEmptyProps {
    handleSaveChat: (event: SyntheticEvent | null, chat: IChats | null, isNew: boolean | null) => void;
}

export const Empty: React.FC<IEmptyProps> = ({handleSaveChat}) => {
    const [isEdit, setIsEdit] =  useState(false);
    const [isGroup, setIsGroup] = useState(false);
    const onClick = (event: SyntheticEvent, newGroup = false) => {
        setIsEdit(true);
        setIsGroup(newGroup);
    };
    const onSaveChat = (event: SyntheticEvent | null, chat: IChats | null, isNew: boolean | null) => {
        if (chat) {
            handleSaveChat(event, chat, isNew);
        }
        else {
            setIsEdit(false);
        }
    };

    return (
        <div className="react_edu-chats-main-empty">
            <div className="react_edu-chats-main-empty_text">
                <span>
                    You haven't had chats yet. Please add <a href="#" onClick={(_) => onClick(_, true)}>New Group</a> or <a href="#" onClick={onClick}>New Private Chat</a>
                </span>
            </div>
            {isEdit
                ?
                <div className="react_edu-chats-main__list__edit">
                    <Edit onClickSave={onSaveChat}
                          isGroup={isGroup}
                          isNew={true}
                    />
                </div>
                : ''
            }
        </div>
    );
}