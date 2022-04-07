import React from "react";

import './ButtonIcon.scss';

interface IButtonIconProps {
    icon?: any;
    size: 's' | 'm' | 'l';
    color: 'secondary' | 'action';
}

export default class ButtonIcon extends React.Component<IButtonIconProps> {
    static defaultProps = {
        size: "m",
        color: "secondary"
    }
    render() {
        return (
            <div className={"chat-components-button-icon chat-components-button-icon-size-" + this.props.size +
                " chat-components-button-icon-color-" + this.props.color}>
                {this.props.icon}
            </div>
        );
    }
}