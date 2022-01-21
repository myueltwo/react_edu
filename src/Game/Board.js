import React from 'react';
import {default as Square} from "./Square";
import './Board.css';

export default class Board extends React.Component {
    renderSquare(i) {
        const isWin = this.props.winnerLine ? this.props.winnerLine.indexOf(i) !== -1 : false;
        return (
            <Square
                value={this.props.squares[i]}
                key={'square' + i}
                isWin={isWin}
                selected={!isWin && this.props.selected === i}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    readerRow(key) {
        const squares = [];
        for (let i = 0; i < 3 ; i++) {
            squares.push(this.renderSquare(3*key + i));
        }
        return squares;
    }
    render() {
        const cell = [];
        for (let i = 0; i < 3 ; i++) {
            cell.push(
                <div className="board-row"
                           key={'board-row' + i}
                >
                    {this.readerRow(i)}
                </div>
            );
        }
        return (
            <div>{cell}</div>
        );
    }
}

