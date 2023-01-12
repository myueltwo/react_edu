import React, {ReactElement} from "react";
import {contacts} from './Data';

interface IMembersProps {
    canChecked: boolean;
    checked: string[];
    updateChecked: Function;
}

export default class Members extends React.Component<IMembersProps> {
    handleCheckedMembers(key: string | null, checked: boolean) {
        if (key) {
            const checked_arr = this.props.checked.slice();
            if (checked) {
                if (checked_arr.indexOf(key) == -1) {
                    checked_arr.push(key);
                    this.props.updateChecked(checked_arr);
                }
            } else {
                const ind = checked_arr.indexOf(key)
                if (ind !== -1) {
                    checked_arr.splice(ind, 1);
                    this.props.updateChecked(checked_arr);
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
                        <input type="checkbox" name={item.id}
                               checked={this.props.checked.indexOf(item.id) !== -1}
                               onChange={(e) => {
                                   this.handleCheckedMembers(
                                       e.currentTarget.getAttribute("name"),
                                       e.target.checked
                                   );
                               }}
                        />
                        : ''
                    }
                    {item.name}
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