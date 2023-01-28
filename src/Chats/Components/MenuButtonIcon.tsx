import React, {SyntheticEvent, FocusEvent} from "react";
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
    handleOnMenuItemClick?: Function;
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
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
    }
    handleOnClick() {
        this.setState({
            selected: true
        });
    }
    handleOnMouseLeave() {
        this.setState({
            selected: false
        });
    }
    handleOnBlur(event: FocusEvent) {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            this.handleOnMouseLeave();
        }
    }
    handleOnClickMenuItem(key: string, event: SyntheticEvent) {
        if (typeof this.props.handleOnMenuItemClick === 'function') {
            this.props.handleOnMenuItemClick(event, key);
        }
    }
    render() {
        const listContent: any = [];
        this.props.items.forEach((item) => {
            listContent.push(
                <div className="chat-components-menu-button-icon__picker__item"
                     key={item.key}
                     onClick={this.handleOnClickMenuItem.bind(this, item.key)}
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
                 onBlur={this.handleOnBlur}
            >
                <ButtonIcon icon={this.props.icon}
                            size={this.props.size}
                            color={this.props.color}
                            handleOnClick={this.handleOnClick.bind(this)}
                />
                <div className="chat-components-menu-button-icon__picker"
                     onMouseLeave={this.handleOnMouseLeave}>
                    {listContent}
                </div>
            </div>
        );
    }
}