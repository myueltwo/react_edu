import './Square.css';

export default function Square(props) {
    return (
        <button className={'square' + (props.selected ? ' square-selected' : '') +
            (props.isWin ? ' square-winner' : '')}
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}