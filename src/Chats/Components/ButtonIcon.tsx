import React, {SyntheticEvent} from "react";

import './ButtonIcon.scss';

interface IButtonIconProps {
    icon: any;
    size: 's' | 'm' | 'l';
    color: 'secondary' | 'action';
    handleOnClick?: Function;
}

export default class ButtonIcon extends React.Component<IButtonIconProps> {
    static defaultProps = {
        size: "m",
        color: "secondary"
    }

    handleOnClick(event: SyntheticEvent) {
        if (this.props.handleOnClick) {
            this.props.handleOnClick(event);
        }
    }
    render() {
        return (
            <div className={"chat-components-button-icon chat-components-button-icon-size-" + this.props.size +
                " chat-components-button-icon-color-" + this.props.color}
                onClick={this.handleOnClick.bind(this)}>
                {this.props.icon}
            </div>
        );
    }
}