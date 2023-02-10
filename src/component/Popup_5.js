import React from 'react'
import './Popup.css'
import card_1 from './gif_1.gif'
import card_5 from './gif_5.gif'

function Popup_5(props) {
  return (props.trigger) ?(
    <div className='popup'>
      <div className='popup-inner'>
        <img src={card_5} 
            className="App-card" alt="back"/>
      </div>
    </div>
  ):"";
}

export default Popup_5