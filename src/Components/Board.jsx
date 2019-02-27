import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Position from './Position';
import Minimax from 'tic-tac-toe-minimax';
import { stringEmpty, revertSymbol, winningCombinations, drawLine } from '../helpers';
const { GameStep } = Minimax;

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moves: 0,
            end: false,
            stats: {
                games: 0,
                playerWin: 0,
                oponentWin: 0,
                draw: 0
            },
            board: ['', '', '', '', '', '', '', '', '']
        }
        this.placePiece = this.placePiece.bind(this);
    }

    placePiece(id) {
        // Game logic
        const state = this.state;
        if (state.board[id] === '' && !state.end) {//validate position
            const board = state.board;
            if (state.setup === 'oponent') {//oponent alternate move
                const newBoard = [...board];
                newBoard[id] = state.side;
                this.setState(prevState => ({
                    side: revertSymbol(prevState.side),
                    board: newBoard,
                    moves: prevState.moves + 1
                }), () => {
                    this.checkEndGame();
                });
            }
            if (state.setup === 'computer') {//if human moves when play computer
                if (state.side !== state.oponent) {
                    const newBoard = [...board];
                    newBoard[id] = state.side;
                    this.setState(prevState => ({
                        side: revertSymbol(prevState.side),
                        board: newBoard,
                        moves: prevState.moves + 1
                    }), () => {
                        this.computerPlacePiece();
                    });
                }
            }
        }
    }

    computerPlacePiece() {
        const state = this.state;
        const symbols = {
            huPlayer: state.player,
            aiPlayer: state.oponent
        }
        const newboard = [...state.board].map((pos, index) => {
            return stringEmpty(pos) ? index : pos;
        });
        let step = GameStep(newboard, symbols, state.level).board;
        step = step.map((pos) => {
            return typeof pos !== 'string' ? '' : pos;
        });
        this.setState(prevState => ({
            side: revertSymbol(prevState.side),
            board: step,
            moves: prevState.moves + 1
        }), () => {
            this.checkEndGame();
        });
    }

    checkEndGame() {
        const state = this.state;
        const board = state.board;
        let endResult = {...state.stats};
        let endGame = false;
        if (state.moves === 9) {
            // Draw
            endResult.draw += 1;
            endGame = true;
        }
        winningCombinations().forEach((combArr) => {
            if (combArr.every(id => !stringEmpty(board[id]))) {//positions not empty
                if (combArr.every(id => board[id] === state.player)) {
                    // Player wins
                    endResult.playerWin += 1;
                    endGame = true;
                    if (state.moves === 9) endResult.draw -= 1;
                    drawLine(combArr[0], combArr[2]);
                } else if (combArr.every(id => board[id] === state.oponent)) {
                    // Oponent wins
                    endResult.oponentWin += 1;
                    endGame = true;
                    if (state.moves === 9) endResult.draw -= 1;
                    drawLine(combArr[0], combArr[2]);
                } 
            }
        });
        this.setState({
            end: endGame,
            stats: endResult
        });
    }

    componentDidMount() {
        this.setState({ ...this.props.setupData, side: this.props.setupData.player });
    }

    render() {
        // console.log(this.state)
        return (
            <Container className="board_container p-5">
                <div className="board mx-auto">
                    <div className="board_row">
                        <Position id={0} click={this.placePiece} symbol={this.state.board[0]} />
                        <Position id={3} click={this.placePiece} symbol={this.state.board[3]} />
                        <Position id={6} click={this.placePiece} symbol={this.state.board[6]} />
                    </div>
                    <div className="board_row">
                        <Position id={1} click={this.placePiece} symbol={this.state.board[1]} />
                        <Position id={4} click={this.placePiece} symbol={this.state.board[4]} />
                        <Position id={7} click={this.placePiece} symbol={this.state.board[7]} />
                    </div>
                    <div className="board_row">
                        <Position id={2} click={this.placePiece} symbol={this.state.board[2]} />
                        <Position id={5} click={this.placePiece} symbol={this.state.board[5]} />
                        <Position id={8} click={this.placePiece} symbol={this.state.board[8]} />
                    </div>
                </div>
                <svg id="svg"></svg>
            </Container>
        );
    }
}

export default Board;