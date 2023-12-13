import React from 'react';
import './home.css'
import {useNavigate} from 'react-router-dom';
import './fontawesome-free-5.15.3-web/css/all.css'
import { useRef } from 'react';

var u,p;
export default function Home(){
    const navigate=useNavigate();
    const ref=useRef()
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
            else alert("account doesn't exist or incorrect password");
        })
    }
    function toggle(e){
        ref.current.type=ref.current.type==='text'?'password':'text'
        e.target.className=e.target.className==="far fa-eye"?"far fa-eye-slash":"far fa-eye"
    }
    return(
        <div id='main'>
        <h2>Notes App</h2>
        <input placeholder='username' onChange={user}/>
        <br/>
        <input placeholder='password' className='margin' type='password' ref={ref} onChange={pass}/>
        <i className="far fa-eye" onClick={toggle}></i>
        <div id='flex'>
        <h5 onClick={login}>Log in</h5>
        <h5 onClick={()=>navigate('/sign')}>Sign up</h5></div>
        </div>
    )
}