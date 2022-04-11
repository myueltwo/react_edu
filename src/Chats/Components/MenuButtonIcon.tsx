import React from "react";
import ButtonIcon from "./ButtonIcon";
import './MenuButtonIcon.scss';

interface IMenuButtonIconItem {
    key: string;
    name: string;
    icon?: any;
}

interface IMenuButtonIconProps {
    icon: any;
    size?: 's' | 'm' | 'l';
    color?: 'secondary' | 'action';
    handleOnMenuClick?: Function;
    items: IMenuButtonIconItem[];
}

export default class MenuButtonIcon extends React.Component<IMenuButtonIconProps> {
    state: {
        selected: boolean;
    }
    constructor(props: IMenuButtonIconProps) {
        super(props);
        this.state = {
            selected: false
        };
    }
    handleOnClick() {
        this.setState({
            selected: true
        });
    }
    handleOnBlur() {
        this.setState({
            selected: false
        });
    }
    handleOnClickMenuItem() {
        console.log(arguments);
        if (typeof this.props.handleOnMenuClick === 'function') {
            this.props.handleOnMenuClick();
        }
    }
    render() {
        const listContent: any = [];
        this.props.items.forEach((item) => {
            listContent.push(
                <div className="chat-components-menu-button-icon__picker__item"
                     key={item.key}
                     onClick={this.handleOnClickMenuItem.bind(this)}
                >
                    {item.icon ?
                        <div className="chat-components-menu-button-icon__picker__item__icon">
                            {item.icon}
                        </div>
                        : ''}
                    {item.name}
                </div>
            );
        });
        return (
            <div className={'chat-components-menu-button-icon' + (this.state.selected
                ? ' chat-components-menu-button-icon-selected' : '')  }
                 tabIndex={1}
                 onBlur={this.handleOnBlur.bind(this)}
            >
                <ButtonIcon icon={this.props.icon}
                            size={this.props.size}
                            color={this.props.color}
                            handleOnClick={this.handleOnClick.bind(this)}
                />
                <div className="chat-components-menu-button-icon__picker"
                     onMouseLeave={this.handleOnBlur.bind(this)}>
                    {listContent}
                </div>
            </div>
        );
    }
}