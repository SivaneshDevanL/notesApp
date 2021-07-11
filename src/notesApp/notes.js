import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './home/home'
import Sign from './signup/sign'
import Notes from './notes/note';
export default function App(){    
    return(
        <Router>
            <Switch>
            <Route exact path='/' render={()=><Home/>}/>
            <Route exact path='/sign' render={()=><Sign/>}/>
            <Route exact path='/notes' render={()=><Notes/>}/>
            </Switch>
        </Router>
    )
}