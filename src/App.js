// eslint-disable-next-line
import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// eslint-disable-next-line
import Item from './components/Item.js'
// eslint-disable-next-line
import MainPage from './components/Main.js'; 
// eslint-disable-next-line
import StartSession from './components/StartSession.js';
// eslint-disable-next-line
import JoinSession from './components/JoinSession.js'; 
// eslint-disable-next-line
import PreSessionHost from './components/PreSessionHost.js'; 
// eslint-disable-next-line
import PreSessionGuest from './components/PreSessionGuest.js'; 
//eslint-disable-next-line
import SwipePage from './components/swipe';

import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://choozserver-env.eba-822ytfjc.us-east-2.elasticbeanstalk.com");

function App() {
  return (
    <div>
      <Router>
        <Route exact path = '/' render={(props) => (
          <MainPage />
        )} />
        <Route path='/create' render={(props) => (
          <StartSession socket={socket} />
        )}/>
        <Route path='/join' render={(props) => (
          <JoinSession socket={socket} />
        )} />
        <Route path='/presession-host' render={(props) => (
          <PreSessionHost {...props} socket={socket} />
        )} />
        <Route path='/presession-guest' render={(props) => (
          <PreSessionGuest {...props} socket={socket}/>
        )} />
        <Route path='/session' render={(props) => (
          <SwipePage {...props} socket={socket}/>
        )} />
      </Router>
    </div>
  ); 
}

export default App;
