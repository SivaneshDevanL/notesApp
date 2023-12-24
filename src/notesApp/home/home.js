import React, { useEffect } from 'react';
import './home.css'
import {useNavigate} from 'react-router-dom';
import './fontawesome-free-5.15.3-web/css/all.css'
import { useRef } from 'react';

var u,p;
export default function Home(){
    const navigate=useNavigate();
    const ref=useRef()
    const ref1=useRef()
    useEffect(()=>{
        consoleText(['CREATE', 'READ', 'UPDATE', 'DELETE'], 'text');
    },[])
    function user(e){u=e.target}
    function pass(e){p=e.target}
    function login(){
        if(u===undefined||p===undefined) return
        if(ref1.current.checked){
            fetch('https://beautiful-dog-fatigues.cyclic.app/admin',{
                headers:{'content-type':'application/json'},
                method:'post',
                body:JSON.stringify({
                    name:u.value,
                    password:p.value
                })
            })
            .then(x=>x.json())
            .then(y=>{
                if(y.message==='success') navigate('/admin');
            else document.getElementById('popup1').classList.add('show')
            })
        }
        else{
        fetch('https://beautiful-dog-fatigues.cyclic.app/login',{
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
            else document.getElementById('popup1').classList.add('show')
        })
    }
    }
    function checkB(){
        document.getElementById('popup1').classList.remove('show')
    }
    function toggle(e){
        ref.current.type=ref.current.type==='text'?'password':'text'
        e.target.className=e.target.className==="far fa-eye"?"far fa-eye-slash":"far fa-eye"
    }
    function consoleText(words, id) {
        var visible = true;
        var con = document.getElementById('console');
        var letterCount = 1;
        var x = 1;
        var waiting = false;
        var target = document.getElementById(id)
        window.setInterval(function() {
      
          if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(function() {
              var usedWord = words.shift();
              words.push(usedWord);
              x = 1;
              letterCount += x;
              waiting = false;
            }, 1000)
          } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function() {
              x = -1;
              letterCount += x;
              waiting = false;
            }, 1000)
          } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount)
            letterCount += x;
          }
        }, 120)
        window.setInterval(function() {
          if (visible === true) {
            con.className = 'console-underscore hidden'
            visible = false;
      
          } else {
            con.className = 'console-underscore'
      
            visible = true;
          }
        }, 400)}
    return(
        <>
        <form id='main'>
        <h2>Notes App</h2>
        <input placeholder='username' onChange={user}/>
        <br/>
        <input placeholder='password' className='margin' type='password' ref={ref} onChange={pass}/>
        <i className="far fa-eye" onClick={toggle}></i>
        <div className='flex'>
        <h5 onClick={login}>Log in</h5>
        <h5 onClick={()=>navigate('/sign')}>Sign up</h5>
        <input type='checkbox' id='cbadmin' ref={ref1} onChange={checkB}/>
        <label for='cbadmin'>Admin</label></div>
        <div id='popup1' className='popup'>incorrect username or password</div>
        </form>
        <div className='console-container'><span id='text'></span><div className='console-underscore' id='console'>&#95;</div></div>
        </>
    )
}