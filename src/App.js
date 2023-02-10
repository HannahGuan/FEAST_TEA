import back from './back.gif';
import './index.css';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './components/Popup'
import Popup_2 from './components/Popup_2'
import Popup_3 from './components/Popup_3'
import Popup_4 from './components/Popup_4'
import Popup_5 from './components/Popup_5'

const test = () =>{
  console.log("hool")
}

const endPop = ()=>{
  setTimeout(()=>{
    this.setTrigger(false);
  },3000);
}

var count =0;

function App(){


  const [buttonPopup, setButtonPopup] = useState(false);
  const [delay, setDelay] = useState(false);
  const [delay_2, setDelay_2] = useState(false);
  const [delay_3, setDelay_3] = useState(false);
  const [delay_4, setDelay_4] = useState(false);


  return (
    <div className="App">
      <header className="App-background">
      <img src={back} className="App-board" alt="back" 
        onClick={test}
      />

        <p> Tea Card demo </p>

        <button onClick = {()=>{
          if(count%5==0) {
            setButtonPopup(true);
            setTimeout(()=>{
              setButtonPopup(false); },3000);
          } else if(count%5==1){
            setDelay(true);
              setTimeout(()=>{
                setDelay(false); },3000);
          } else if(count%5==2){
            setDelay_2(true);
            setTimeout(()=>{
                setDelay_2(false); },3000);
          } else if(count%5==3){
            setDelay_3(true);
            setTimeout(()=>{
                setDelay_3(false); },3000);
          } else if(count%5==4){
            setDelay_4(true);
            setTimeout(()=>{
                setDelay_4(false); },3000);
          }
          count +=1;
          console.log(count)
        }}>
          Try to show the card!
        </button>

        <div class="card-container">
          <div class="App-card">
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3>my popup</h3>
            <p>This is my button triggered popup?</p>
          </Popup>
          </div>
          <div class="App-card">
          <Popup_2 class = "App-card" trigger={delay} setTrigger={setDelay}>
            <h3>my popup</h3>
            <p>This is my button triggered popup?</p>
          </Popup_2>
          </div>
          <div class="App-card">
          <Popup_3 class = "App-card" trigger={delay_2} setTrigger={setDelay_2}>
            <h3>my popup</h3>
            <p>This is my button triggered popup?</p>
          </Popup_3>
          </div>
          <div class="App-card">
          <Popup_4 class = "App-card" trigger={delay_3} setTrigger={setDelay_3}>
            <h3>my popup</h3>
            <p>This is my button triggered popup?</p>
          </Popup_4>
          </div>
          <div class="App-card">
          <Popup_5 class = "App-card" trigger={delay_4} setTrigger={setDelay_4}>
            <h3>my popup</h3>
            <p>This is my button triggered popup?</p>
          </Popup_5>
          </div>
        </div>

      </header>
    </div>
  );
  
}


export default App;