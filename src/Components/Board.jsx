import React, { Component } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Position from './Position';
import Minimax from 'tic-tac-toe-minimax';
import { stringEmpty, revertSymbol, winningCombinations, drawLine, getImage } from '../helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptop } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons'

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
        this.exitGame = this.exitGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
    }


    componentDidMount() {
        this.setState({ ...this.props.setupData, side: this.props.setupData.player });
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
        
        winningCombinations().forEach((combArr) => {
            if (combArr.every(id => !stringEmpty(board[id]))) {//positions not empty
                if (combArr.every(id => board[id] === state.player)) {
                    // Player wins
                    endResult.playerWin += 1;
                    endGame = true;
                    drawLine(combArr[0], combArr[2]);
                } else if (combArr.every(id => board[id] === state.oponent)) {
                    // Oponent wins
                    endResult.oponentWin += 1;
                    endGame = true;
                    drawLine(combArr[0], combArr[2]);
                } 
            }
        });
        //computer makes one more move
        let maxMoves = state.setup === 'computer' ? 10 : 9;
        if (state.moves === maxMoves && !endGame) {
            // Draw
            endResult.draw += 1;
            endGame = true;
        }
        this.setState({
            end: endGame,
            stats: endResult
        });
    }

    restartGame() {
        this.setState(prevState => ({
            ...prevState,
            moves: 0,
            end: false,
            board: ['', '', '', '', '', '', '', '', '']
        }), () => {
            //remove svg line
            var elements = document.getElementsByTagName('line')
            while (elements[0]) elements[0].parentNode.removeChild(elements[0])
        });
    }

    exitGame() {
        this.props.exitgame()
    }

    render() {
        // console.log(this.state)
        const restart = () => {
            if (this.state.end) {
                return (<Image src={getImage('restart')} width="40px" height="40px" className="mx-auto"
                    onClick={this.restartGame}
                />)
            }
        }
        const exit = () => {
            if (this.state.end) {
                return (<Image src={getImage('exit')} width="40px" height="40px" className="mx-auto"
                    onClick={this.exitGame}
                />)
            }
        }

        const boardImg = {
            backgroundImage: `url(`+getImage('board')+`)`
        }
        
        return (
            <Container className="board_container p-5">
                <Row className="pb-4">
                    <Col className="text-center">
                        {this.state.setup === 'computer' ? (<FontAwesomeIcon icon={faUser} />) : 'Player:'}
                        {' '}
                        {this.state.stats.playerWin}
                    </Col>
                    <Col className="text-center">
                        {this.state.setup === 'computer' ? (<FontAwesomeIcon icon={faBalanceScale} />) : 'Draw:'}
                        {' '}
                        {this.state.stats.draw}
                    </Col>
                    <Col className="text-center">
                        {this.state.setup === 'computer' ? (<FontAwesomeIcon icon={faLaptop} />) : 'Oponent:'}
                        {' '}
                        {this.state.stats.oponentWin}
                    </Col>
                </Row>
                <div className="board mx-auto" style={boardImg}>
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
                <Row className="pt-4">
                    {
                        exit()
                    }
                    {
                        restart()
                    }
                </Row>
            </Container>
        );
    }
}

export default Board;