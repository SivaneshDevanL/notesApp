import React from 'react';
import './home.css'
import {useNavigate} from 'react-router-dom';

var u,p;
export default function Home(){
    const navigate=useNavigate();
    function user(e){u=e.target}
    function pass(e){p=e.target}
    function login(){
        if(u===undefined||p===undefined) return
        // console.log(u.value,p.value);
        fetch('http://localhost:3001/login',{
            headers:{'content-type':'application/json'},
            method:'post',
            body:JSON.stringify({
                userName:u.value,
                password:p.value
            })
        })
        .then(x=>x.json())
        .then(y=>{
            if(y.message==='success') navigate('/notes');
        })
    }
    return(
        <div id='main'>
        <h2>Notes App</h2>
        <input placeholder='username' onChange={user}/>
        <br/>
        <input placeholder='password' className='margin' type='password' onChange={pass}/>
        <div id='flex'>
        <h5 onClick={login}>login</h5>
        <h5 onClick={()=>navigate('/sign')}>signup</h5></div>
        </div>
    )
}