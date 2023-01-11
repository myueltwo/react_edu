import React, {ReactElement} from "react";
import {contacts} from './Data';

interface IMembersProps {
    canChecked: boolean;
    checked: string[];
}

export default class Members extends React.Component<IMembersProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            checked: props.checked
        };
    }
    handleCheckedMembers(key: string | null, checked: boolean) {
        if (key) {
            if (checked) {
                if (this.props.checked.indexOf(key) == -1) {
                    this.props.checked.push(key);
                    this.setState({
                        checked: this.props.checked
                    });
                }
            } else {
                const ind = this.props.checked.indexOf(key)
                if (ind !== -1) {
                    this.props.checked.splice(ind, 1);
                    this.setState({
                        checked: this.props.checked
                    });
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