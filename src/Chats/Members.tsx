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
            checked: []
        };
    }
    handleCheckedMembers() {
        console.log(arguments);
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
                               onChange={this.handleCheckedMembers.bind(this)}
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