import React from 'react';
import '../../css/App.css';
import { Route, Switch } from 'react-router-dom'

import Home from '../../routes/home/home'
import MeetupList from '../../routes/searchResult/searchFlower'
import Signin from '../../routes/signin'
import Signup from '../../routes/signup'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/meetup' component={() => <MeetupList testprops={'a'} />} />  
        <Route path='/signin' component={() => <Signin testprops={'a'} />} />  
        <Route path='/signup' component={() => <Signup testprops={'a'} />} />  
        <Route path='/' component={() => <Home testprops={'a'} />} />
      </Switch>
    </div>
  );
}

export default App;