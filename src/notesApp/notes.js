import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './home/home'
import Sign from './signup/sign'
import Notes from './notes/note';
import Admin from './admin/admin' 
export default function App(){    
    return(
        <Router>
            <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/sign' element={<Sign/>}/>
            <Route exact path='/notes' element={<Notes/>}/>
            <Route exact path='/admin' element={<Admin/>}/>
            </Routes>
        </Router>
    )
}