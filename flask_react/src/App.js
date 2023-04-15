import ReactDOM from 'react-dom/client';
import React, { useEffect, useState } from "react";
import './index.css';
import io from 'socket.io-client';

const socket = io();

function Square({isFlipped, index, called}){

  const [state, setState] = useState({ value: isFlipped, ind: index, call:called});

    function handleClick(){
        setState({...state, value:true});
        setTimeout(function() { //Start the timer
            setState({...state, value: false}) //After 1 second, set render to true
        }.bind(this), 6000)
    }

    function handleSignal(){
      console.log("is handle Signal called?");
      console.log(state.call, called);
      if(called===true){
        console.log("is state.call true?");
        setState({...state, value:true});
        setTimeout(function() { //Start the timer
            setState({...state, value: false}) //After 1 second, set render to true
        }.bind(this), 6000)
      }
    }

    useEffect(() => {
      handleSignal()
    }, [called]);  

    return (
        <div className="square" onClick={handleClick}> 
          <img className='card' src = {state.value?"images/img_2.jpeg":"images/img_1.jpeg"}></img>
        </div>
      );

}

export default function Game() {
    const [message, setMessage] = useState('');
      
      useEffect(() => {
        socket.on('trigger', data => {
          //console.log(data.message)
          setMessage(data.message);
          //console.log(parseInt(message)===1);
          //renderSquare(false, parseInt(data.message), true);
          console.log("here?");
        });
    
        return () => socket.disconnect();
      }, []);
    

      useEffect(() => {
        socket.on('data', data => {
          //console.log(data.message)
          setMessage(data.message);
          //console.log(parseInt(message)===1);
          //renderSquare(false, parseInt(data.message), true);
          console.log("cup set");
        });
    
        return () => socket.disconnect();
      }, []);
      
    
    function renderSquare(fl, ind, cal){
      console.log(message, fl, ind, cal);
      console.log(parseInt(message)===ind);
      return(
        <Square isFlipped={fl} index={ind} called={cal}/>
      )
    }
    //<Square isFlipped={false} index={1} called={parseInt(message)===1?true:false}/>

    return (
      <>
        <div className="game">
          <div className="title">
                <h1>Teacard Grid</h1>
            </div>
          <div className="game-board">
            <div className="board-row">
              { renderSquare(false, 1, parseInt(message)===1?true:false) }
              { renderSquare(false, 2, parseInt(message)===2?true:false) }
              { renderSquare(false, 3, parseInt(message)===3?true:false) }
              { renderSquare(false, 4, parseInt(message)===4?true:false) }
              { renderSquare(false, 5, parseInt(message)===5?true:false) }
            </div>
            <div className="board-row">
              { renderSquare(false, 6, parseInt(message)===6?true:false) }
              { renderSquare(false, 7, parseInt(message)===7?true:false) }
              { renderSquare(false, 8, parseInt(message)===7?true:false) }
              { renderSquare(false, 9, parseInt(message)===9?true:false) }
              { renderSquare(false, 10, parseInt(message)===10?true:false) }
            </div>
            <div className="board-row">
              { renderSquare(false, 11, parseInt(message)===11?true:false) }
              { renderSquare(false, 12, parseInt(message)===12?true:false) }
              { renderSquare(false, 13, parseInt(message)===13?true:false) }
              { renderSquare(false, 14, parseInt(message)===14?true:false) }
              { renderSquare(false, 15, parseInt(message)===15?true:false) }
            </div>
            <div className="board-row">
              { renderSquare(false, 16, parseInt(message)===16?true:false) }
              { renderSquare(false, 17, parseInt(message)===17?true:false) }
              { renderSquare(false, 18, parseInt(message)===18?true:false) }
              { renderSquare(false, 19, parseInt(message)===19?true:false) }
              { renderSquare(false, 20, parseInt(message)===20?true:false) }
            </div>
            <div className="board-row">
              { renderSquare(false, 21, parseInt(message)===21?true:false) }
              { renderSquare(false, 22, parseInt(message)===22?true:false) }
              { renderSquare(false, 23, parseInt(message)===23?true:false) }
              { renderSquare(false, 24, parseInt(message)===24?true:false) }
              { renderSquare(false, 25, parseInt(message)===25?true:false) }
            </div>
            <h1>{message}</h1>
          </div>
        </div>
      </>
      );
  }
  
  


/*
<Square isFlipped={false} index={1} called={parseInt(message)===1?true:false}/>
<Square isFlipped={false} index={2} called={parseInt(message)===2?true:false}/>
<Square isFlipped={false} index={3} called={parseInt(message)===3?true:false}/>
*/