import React from 'react'
import './Popup.css'
import card_1 from './gif_1.gif'
import card_4 from './gif_4.gif'

function Popup_4(props) {
  return (props.trigger) ?(
    <div className='popup'>
      <div className='popup-inner'>
        <img src={card_4} 
            className="App-card" alt="back"/>
      </div>
    </div>
  ):"";
}

export default Popup_4