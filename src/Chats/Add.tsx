import React, {SyntheticEvent} from "react";
import {BiMessageAdd} from "react-icons/bi";
import {AiOutlineUserAdd, AiOutlineUsergroupAdd} from "react-icons/ai";
import MenuButtonIcon from "./Components/MenuButtonIcon";

interface IAddProps {
    handleOnMenuItemClick: (event: SyntheticEvent, key: string) => void;
}

export const Add: React.FC<IAddProps> = ({handleOnMenuItemClick}) => {
    return (
        <MenuButtonIcon icon={<BiMessageAdd/>}
                        items={[{
                            key: 'createGroup',
                            name: 'New Group',
                            icon: <AiOutlineUsergroupAdd/>
                        }, {
                            key: 'createPrivateChat',
                            name: 'New Private Chat',
                            icon: <AiOutlineUserAdd/>
                        }]}
                        handleOnMenuItemClick={handleOnMenuItemClick}
        />
    );
}