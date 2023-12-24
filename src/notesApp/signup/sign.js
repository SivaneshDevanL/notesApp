import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sign.css'
import './fontawesome-free-5.15.3-web/css/all.css'
import { useRef } from 'react';

var u, p1, p2;
export default function Sign() {
    const navigate = useNavigate()
    const ref = useRef()
    const ref1 = useRef()
    const ref2 = useRef()
    function user(e) { u = e.target }
    function pass1(e) { p1 = e.target }
    function pass2(e) { p2 = e.target }
    function signup() {
        if (u === undefined || p1 === undefined || p2 === undefined) return
        let p=document.getElementById('popup2')
        p.classList.add('show')
        if (p1.value !== p2.value) {
            p.innerText ="passwords doesn't match";
            p.style.color="red"
            return;
        }
        fetch('https://beautiful-dog-fatigues.cyclic.app/signup', {
            headers: { 'content-type': 'application/json' },
            method: 'post',
            body: JSON.stringify({
                userName: u.value,
                password: p1.value
            })
        }).then(x => x.json())
            .then(y => {
                if (y.message === 'created') {
                    p.innerText = "account created successfully!";
                    p.style.color="green"
                    ref.current.value=""
                    ref1.current.value=""
                    ref2.current.value=""
                    u="" 
                    p1="" 
                    p2=""
                }
                else {
                    p.innerText ="try new username or password";
                    p.style.color="red"
                }
            })
    }
    function toggle(e) {
        ref.current.type = ref.current.type === 'text' ? 'password' : 'text'
        e.target.className = e.target.className === "far fa-eye" ? "far fa-eye-slash" : "far fa-eye"
    }
    function toggle1(e) {
        ref1.current.type = ref1.current.type === 'text' ? 'password' : 'text'
        e.target.className = e.target.className === "far fa-eye" ? "far fa-eye-slash" : "far fa-eye"
    }
    return (
        <form id="sign">
            <h2>Notes App</h2>
            <input className='margin' onChange={user} ref={ref2}placeholder='username' />
            <div>
                <input className='margin' type='password' onChange={pass1} ref={ref} placeholder='password' />
                <i className="far fa-eye" onClick={toggle}></i></div>
            <div>
                <input className='margin' type='password' onChange={pass2} ref={ref1} placeholder='confirm password' />
                <i className="far fa-eye" onClick={toggle1}></i></div>
            <div className='flex'>
                <h5 onClick={signup} >Sign up</h5>
                <h5 onClick={() => navigate('/')}>Sign in</h5></div>
            <div id='popup2' className='popup'></div>
        </form>
    )
}