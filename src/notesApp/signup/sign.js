import React from 'react';
import { useHistory } from 'react-router';
import './sign.css'

var u,p1,p2;
export default function Sign(){
    const history=useHistory()
    function user(e){u=e.target}
    function pass1(e){p1=e.target}
    function pass2(e){p2=e.target}
    function signup(){
        if(u===undefined||p1===undefined||p2===undefined||p1.value!==p2.value) return
        fetch('http://localhost:3001/signup',{
            headers:{'content-type':'application/json'},
            method:'post',
            body:JSON.stringify({
                userName:u.value,
                password:p1.value
            })
        }).then(x=>x.json())
        .then(y=>{
            if(y.message==='created') history.push('/')
        })
    }
    return(
        <div id="sign">
            <h2>Notes App</h2>
            <input className='margin' onChange={user} placeholder='username'/>
            <input className='margin' onChange={pass1} placeholder='password'/>
            <input className='margin' onChange={pass2} placeholder='confirm password'/>
            <h5 onClick={signup}>signup</h5>
        </div>
    )
}