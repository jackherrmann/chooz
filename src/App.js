// eslint-disable-next-line
import React from 'react';
import SwipePage from './components/swipe';
// eslint-disable-next-line
import Item from './components/Item.js'
// eslint-disable-next-line
import MainScreen from './components/Main.js'; 
// eslint-disable-next-line
import StartSession from './components/StartSession.js';
// eslint-disable-next-line
import JoinSession from './components/JoinSession.js'; 
// eslint-disable-next-line
import PreSession from './components/PreSession.js'; 

import socketIOClient from "socket.io-client";

const socket = socketIOClient("localhost:4000");

function App() {
  return <StartSession socket = { socket }/>; 
}

export default App;
