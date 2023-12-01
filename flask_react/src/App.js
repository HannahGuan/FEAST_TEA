import ReactDOM from 'react-dom/client';
import React, { useEffect, useState } from "react";
import './index.css';
import io from 'socket.io-client';
import flipSound from './card_flip.mp3';

const socket = io();

function Square({ isFlipped, index, called, big }) {
  const [state, setState] = useState({ value: isFlipped, ind: index, call: called });
  const [card_name] = useState(`card_${index}`);

  function flipCard() {
    console.log('flip the card!');
    setState({ ...state, value: true });
    const audio = new Audio(flipSound);
    audio.play();
    setTimeout(function() { //Start the timer
        setState({...state, value: false}) //After 1 second, set render to true
    }.bind(this), 6000);
  }

  function flipBack() {
    console.log('flip back the card!');
    setState({ ...state, value: false });
  }

  function handleClick(){
    setState({...state, value:true});
    const audio = new Audio(flipSound);
    audio.play();
    setTimeout(function() { //Start the timer
        setState({...state, value: false}) //After 1 second, set render to true
    }.bind(this), 6000)
    }

  useEffect(() => {
    if (called === true && !state.value) {
      flipCard();
    } else {
      flipBack();
    }
  }, [called, state.value]);

  return (
    <div className="square" onClick={handleClick}>
      {index === 6 && big === 0 && (
        <div>
          <img className='card' src={state.value ? `images/cards/card-${index}.png` : `images/texts/text-${index}.png`} alt="" />
          {state.value }
        </div>
      )}

      {index === 6 && big === 1 && (
        <div>
          <img className='card-big' src={state.value ? `images/cards/card-${index}.png` : `images/texts/text-${index}.png`} alt="" />
          {state.value }
        </div>
      )}

      {index === 11 && big === 0 && (
        <div>
          <img className='card' src={state.value ? `images/cards/card-${index}.png` : `images/texts/text-${index}.png`} alt="" />
          {state.value }
        </div>
      )}
      {index === 20 && big === 0 && (
        <div>
          <img className='card' src={state.value ? `images/cards/card-${index}.png` : `images/texts/text-${index}.png`} alt="" />
          {state.value }
        </div>
      )}

      {index !== 6 && index !== 11 && index !== 20 && index <= 21 && big === 0 && (
        <div>
          <img className='card' src={state.value ? `images/texts/text-${index}.png` : `images/cards/card-${index}.png`} alt="" />
          {state.value  }
        </div>
      )}

      {index !== 6 && index !== 11 && index !== 20 && index <= 21 && big === 1 && (
        <div>
          <img className='card-big' src={state.value ? `images/texts/text-${index}.png` : `images/cards/card-${index}.png`} alt="" />
          {state.value  }
        </div>
      )}

      {index > 21 && big === 0 && (
        <div>
          <img className='card' src={state.value ? `images/texts/text-${index-10}.png` : `images/cards/card-${index-10}.png`} alt="" />
          {state.value }
        </div>
      )}
    </div>
  );
}

export default function Game() {
    const [message, setMessage] = useState('');
    const [currentGame, setCurrentGame] = useState('game2');
      
    useEffect(() => {
      socket.on('trigger', data => {
        //console.log(data.message)
        setMessage(data.message);
        //console.log(parseInt(message)===1); //renderSquare(false, parseInt(data.message), true);
      });
      
      return () => socket.disconnect();
    }, []);
  
    useEffect(() => {
      socket.on('data', data => {
        //console.log(data.message)
        setMessage(data.message);
        //console.log(parseInt(message)===1); //renderSquare(false, parseInt(data.message), true);
      });
  
      return () => socket.disconnect();
    }, []);
    
    useEffect(() => {
      const switchGameInterval = setInterval(() => {
        setCurrentGame(prevGame => (prevGame === 'game1' ? 'game2' : 'game1'));
      }, 30000); // 30 seconds in milliseconds
  
      return () => clearInterval(switchGameInterval);
    }, []);
    
    function renderSquare(fl, ind, cal, big){
      return(
        <Square isFlipped={fl} index={ind} called={cal} big={big}/>
      )
    }

    return (
      <>
        {currentGame === 'game1' && (
          <div className="game1">
          <br></br>
          <div className="game-board">
            <div className="col1">
              { renderSquare(false, 1, parseInt(message)===1?true:false, 0) }
              <br></br>
              { renderSquare(false, 2, parseInt(message)===2?true:false, 0) }
              <br></br>
              { renderSquare(false, 3, parseInt(message)===3?true:false, 0) }
              <br></br>
              { renderSquare(false, 4, parseInt(message)===4?true:false, 0) }
            </div>
            <div className="col2">
              { renderSquare(false, 5, parseInt(message)===5?true:false, 0) }
              <br></br>
              { renderSquare(false, 6, parseInt(message)===6?true:false, 0) }
              <br></br>
              { renderSquare(false, 7, parseInt(message)===7?true:false, 0) }
              <br></br>
              { renderSquare(false, 8, parseInt(message)===8?true:false, 0) }
            </div>
            <div className="col3">
              { renderSquare(false, 9, parseInt(message)===9?true:false, 0) }
              <br></br>
              { renderSquare(false, 10, parseInt(message)===10?true:false, 0) }
              <br></br>
              { renderSquare(false, 11, parseInt(message)===11?true:false, 0) }
              <br></br>
              { renderSquare(false, 12, parseInt(message)===12?true:false, 0) }
            </div>
            <div className="col4">
              { renderSquare(false, 13, parseInt(message)===13?true:false, 0) }
              <br></br>
              { renderSquare(false, 14, parseInt(message)===14?true:false, 0) }
              <br></br>
              { renderSquare(false, 15, parseInt(message)===15?true:false, 0) }
              <br></br>
              { renderSquare(false, 16, parseInt(message)===16?true:false, 0) }
            </div>
            <div className="col5">
              { renderSquare(false, 17, parseInt(message)===17?true:false, 0) }
              <br></br>
              { renderSquare(false, 18, parseInt(message)===18?true:false, 0) }
              <br></br>
              { renderSquare(false, 19, parseInt(message)===19?true:false, 0) }
              <br></br>
              { renderSquare(false, 20, parseInt(message)===20?true:false, 0) }
            </div>
            <div className="col6">
              { renderSquare(false, 21, parseInt(message)===21?true:false, 0) }
              <br></br>
              { renderSquare(false, 22, parseInt(message)===22?true:false, 0) }
              <br></br>
              { renderSquare(false, 23, parseInt(message)===23?true:false, 0) }
              <br></br>
              { renderSquare(false, 24, parseInt(message)===24?true:false, 0) }
            </div>
            <div className="col7">
              { renderSquare(false, 25, parseInt(message)===25?true:false, 0) }
              <br></br>
              { renderSquare(false, 26, parseInt(message)===26?true:false, 0) }
              <br></br>
              { renderSquare(false, 27, parseInt(message)===27?true:false, 0) }
              <br></br>
              { renderSquare(false, 28, parseInt(message)===28?true:false, 0) }
            </div>
          </div>
        </div>
        )}
        {currentGame === 'game2' && ( // Render 'game2' components if currentGame is 'game2'
        <div className="game2">
          <div className="game-board-2">
          <div className='row1'>
            <div className='big-1'>
              { renderSquare(false, 6, parseInt(message)===6?true:false, 1) }
            </div>
            <div className='small-1'>
              <div className='s1-r1'>
                { renderSquare(false, 2, parseInt(message)===2?true:false, 0) }
                { renderSquare(false, 3, parseInt(message)===3?true:false, 0) }
                { renderSquare(false, 4, parseInt(message)===4?true:false, 0) }
                { renderSquare(false, 5, parseInt(message)===5?true:false, 0) }
                { renderSquare(false, 1, parseInt(message)===1?true:false, 0) }
              </div>
              <div className='s1-r2'>
                { renderSquare(false, 7, parseInt(message)===7?true:false, 0) }
                { renderSquare(false, 8, parseInt(message)===8?true:false, 0) }
                { renderSquare(false, 9, parseInt(message)===9?true:false, 0) }
                { renderSquare(false, 10, parseInt(message)===10?true:false, 0) }
                { renderSquare(false, 11, parseInt(message)===11?true:false, 0) }
              </div>
            </div>
          </div>

          <div className='row2'>
            <div className='small-2'>
                <div className='s2-r1'>
                  { renderSquare(false, 12, parseInt(message)===12?true:false, 0) }
                  { renderSquare(false, 13, parseInt(message)===13?true:false, 0) }
                </div>
                <div className='s2-r2'>
                  { renderSquare(false, 14, parseInt(message)===14?true:false, 0) }
                  { renderSquare(false, 15, parseInt(message)===15?true:false, 0) }
                </div>
            </div>
            <div className='big-2'>
                { renderSquare(false, 16, parseInt(message)===16?true:false, 1) }
            </div>
            <div className='small-3'>
                <div className='s3-r1'>
                { renderSquare(false, 17, parseInt(message)===17?true:false, 0) }
                { renderSquare(false, 18, parseInt(message)===18?true:false, 0) }
                { renderSquare(false, 19, parseInt(message)===19?true:false, 0) }
                </div>
                <div className='s3-r2'>
                { renderSquare(false, 20, parseInt(message)===20?true:false, 0) }
                { renderSquare(false, 21, parseInt(message)===21?true:false, 0) }
                { renderSquare(false, 22, parseInt(message)===22?true:false, 0) }
                </div>
            </div>

          </div>
          </div>
        </div>
      )}
      </>
      );
  }
  