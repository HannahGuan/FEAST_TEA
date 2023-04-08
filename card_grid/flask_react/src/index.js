import ReactDOM from 'react-dom/client';
import React, { useEffect, useRef } from "react";
import './index.css';
import io from 'socket.io-client';
import { useState } from 'react';

// onClick={() => {this.props.onClick()}}

const socket = io();

class Square extends React.Component {
  constructor(props){
    super(props);
    this.state = {isFlipped:false};

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    setTimeout(function() { //Start the timer
        this.setState({isFlipped: false}) //After 1 second, set render to true
    }.bind(this), 6000)
  }

  handleClick(){
    this.setState(prevState => ({
      isFlipped: true
    }));
    this.componentDidMount();
  }

  render() {
    useEffect(() => {
      socket.on('data', data => {
        setMessage(data.message);
        this.handleClick();
      });
  
      return () => socket.disconnect();
    }, []);

      return (
        <div className="square" onClick={this.handleClick}> 
          <img className='card' src = {this.state.isFlipped?"images/gif_1.gif":"images/gif_2.gif"}></img>
        </div>
      );
    }
  }

/*
function Square(props){
  return (
    <div className="square" onClick={() => {props.onClick()}}> 
        <img className='card' src = {props.value}></img>
    </div>
  );
} */

  
  class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        //squares[i] = this.state.xIsNext ? "images/gif_1.gif":"images/gif_2.gif";
        squares[i] = squares.xIsNext ? "images/gif_1.gif":"images/gif_2.gif";
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
      return (
        <Square 
            value={this.state.squares[i]} 
            onClick = {()=> this.handleClick(i)}
        />);
    }
  
    render() {
      const status = 'Teacard Grid';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    render() {
      const [message, setMessage] = useState('');

      useEffect(() => {
        socket.on('data', data => {
          setMessage(data.message);
        });

        return () => socket.disconnect();
      }, []);

      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);

