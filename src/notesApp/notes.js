import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './home/home'
import Sign from './signup/sign'
import Notes from './notes/note';
export default function App(){    
    return(
        <Router>
            <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/sign' element={<Sign/>}/>
            <Route exact path='/notes' element={<Notes/>}/>
            </Routes>
        </Router>
    )
}