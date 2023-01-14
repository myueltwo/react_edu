import React, {ReactElement, SyntheticEvent} from "react";
import {contacts} from './Data';

interface IMembersProps {
    canChecked: boolean;
    checked: string[];
    updateChecked: Function;
}

export default class Members extends React.Component<IMembersProps> {
    handleCheckedMembers(e: SyntheticEvent, key: string | null, checked: boolean) {
        if (key) {
            const checked_arr = this.props.checked.slice();
            if (checked) {
                if (checked_arr.indexOf(key) == -1) {
                    checked_arr.push(key);
                    this.props.updateChecked(e, checked_arr);
                }
            } else {
                const ind = checked_arr.indexOf(key)
                if (ind !== -1) {
                    checked_arr.splice(ind, 1);
                    this.props.updateChecked(e, checked_arr);
                }
            }
        }
    }

    render() {
        const contactsContent: ReactElement[] = [];
        contacts.forEach(item => {
            contactsContent.push(
                <div className="react_edu-chats-members__item"
                     key={item.id}
                >
                    {this.props.canChecked ?
                        <div>
                            <input type="checkbox" name={item.id}
                                   checked={this.props.checked.indexOf(item.id) !== -1}
                                   onChange={(e) => {
                                       this.handleCheckedMembers(
                                           e,
                                           e.currentTarget.getAttribute("name"),
                                           e.target.checked
                                       );
                                   }}
                            />
                            <label htmlFor={item.id}>{item.name}</label>
                        </div>
                        :
                        <div key={item.id}
                             onClick={(e) => {
                                 this.props.updateChecked(e, item.id);
                             }}>
                            {item.name}
                        </div>
                    }
                </div>
            );
        });
        return (
            <div className="react_edu-chats-members">
                {contactsContent}
            </div>
        );
    }
}