import React, {ReactElement, SyntheticEvent} from "react";
import {contacts, IUser} from './Data';
import './Members.scss';

interface IMembersProps {
    canChecked: boolean;
    checked: string[];
    updateChecked: Function;
}

interface IRowMemberProps extends IMembersProps {
    item: IUser;
    handleCheckedMembers: Function;
}

function Row(props: IRowMemberProps) {
    return (
        <div className="react_edu-chats-members__item"
             key={props.item.id}
        >
            {props.canChecked ?
                <div className="react_edu-chats-members__item-checkbox">
                    <input type="checkbox" id={props.item.id}
                           checked={props.checked.includes(props.item.id)}
                           onChange={(e) => {
                               props.handleCheckedMembers(
                                   e,
                                   e.currentTarget.id,
                                   e.target.checked
                               );
                           }}
                    />
                    <label htmlFor={props.item.id}
                           className="react_edu-chats-members__item__label"
                    >
                        {props.item.name}</label>
                </div>
                :
                <div key={props.item.id}
                     onClick={(e) => {
                         props.updateChecked(e, props.item.id);
                     }}>
                    {props.item.name}
                </div>
            }
        </div>
    );
}

export default function Members(props: IMembersProps) {
    function handleCheckedMembers(e: SyntheticEvent, key: string | null,
                                  checked: boolean
    ) {
        if (key) {
            const checked_arr = props.checked.slice();
            if (checked) {
                if (checked_arr.indexOf(key) == -1) {
                    checked_arr.push(key);
                    props.updateChecked(e, checked_arr);
                }
            } else {
                const ind = checked_arr.indexOf(key)
                if (ind !== -1) {
                    checked_arr.splice(ind, 1);
                    props.updateChecked(e, checked_arr);
                }
            }
        }
    }

    const contactsContent: ReactElement[] = [];
    contacts.forEach(item => {
        contactsContent.push(
            <Row key={`member-${item.id}`}
                 item={item}
                 handleCheckedMembers={handleCheckedMembers}
                 {...props}
            />
        );
    });

    return (
        <div className="react_edu-chats-members">
            {contactsContent}
        </div>
    )
}