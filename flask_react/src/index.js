import {ReactDOM, createRoot} from 'react-dom/client';
import React, { useEffect, useRef, StrictMode } from "react";
import './index.css';
import io from 'socket.io-client';
import { useState } from 'react';

import App from "./App";
//import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

//reportWebVitals();