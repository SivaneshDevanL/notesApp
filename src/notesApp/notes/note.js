import React, { useEffect, useState } from 'react';
import './note.css'
import './fontawesome-free-5.15.3-web/css/all.css'
import { useNavigate } from 'react-router-dom';
import img from '../2236117.jpg'

var v,t,id;
export default function Notes(){
    const [notes,setNotes]=useState();
    const navigate=useNavigate()
    useEffect(()=>{
        fetch("https://beautiful-dog-fatigues.cyclic.app/")
        .then(x=>x.json())
        .then(setNotes)
    },[])

    function add(){
        if(v===undefined||v.value===''||t===undefined||t.value==='') return
     
        if(id){
        fetch("https://beautiful-dog-fatigues.cyclic.app/add",{
            headers:{'content-type':'application/json'},
            method:'post',
            body:JSON.stringify({
                title:t.value,
                description:v.value,
                id:id
            })
        })
        .then(z=>z.json())
        .then(y=>{
            if(y.message==='success'){
                fetch("https://beautiful-dog-fatigues.cyclic.app/")
                .then(x=>x.json())
                .then(setNotes)
            }
        })
        id=0
    }
        else{
            fetch("https://beautiful-dog-fatigues.cyclic.app/add",{
                headers:{'content-type':'application/json'},
                method:'post',
                body:JSON.stringify({
                    title:t.value,
                    description:v.value
                })
            })
            .then(z=>z.json())
            .then(y=>{
                if(y.message==='success'){
                    fetch("http://localhost:3001/")
                    .then(x=>x.json())
                    .then(setNotes)
                }
            })
        } 
            t.value=''
            v.value='' 
        }

    function todelete(i){
        fetch("https://beautiful-dog-fatigues.cyclic.app/add",{
            headers:{'content-type':'application/json'},
            method:'post',
            body:JSON.stringify({
                id:i
            })
        })
        .then(z=>z.json())
        .then(y=>{
            if(y.message==='success'){
                fetch("https://beautiful-dog-fatigues.cyclic.app/")
                .then(x=>x.json())
                .then(setNotes)
            }
        })
    }
    function edit(i){
            t=document.getElementsByTagName('input')[0]
            v=document.getElementsByTagName('textarea')[0]
        t.value=document.getElementsByClassName('id')[i].innerText;
        v.value=document.getElementsByClassName('id1')[i].innerText;
        id=i+1;
    }
    return(
        <div id="notes">
            <div id="logo">
             <div>  
            <h2>Notes App</h2>
            <img src={img} alt="note"/></div> 
            <h2 onClick={()=>navigate('/')} id="logout">Log out</h2>
            </div>
            <div id='input'>
            <input className='input' placeholder='Title'  onChange={(e)=>(t=e.target)}/>
            <textarea className='input' placeholder='Take a note' rows='1' onChange={(e)=>(v=e.target)}/>
            <h4 onClick={add}>Add</h4></div>
            <div id='flex1'>
            {notes&&Array(Object.keys(notes.note).length/2-2).fill(1).map((i,j)=>(
                    (notes.note[`title${j+1}`]!==''&&
                    <div className='object'>
                    <div className='noteflex'>   
                    <h3 className='note note1 id'>{notes.note[`title${j+1}`]}</h3>
                    <div className='symbol'>     
                    <i id='img' onClick={()=>todelete(j+1)} className="fas fa-trash-alt"></i>
                    <i id='img1' onClick={()=>edit(j)} className="fas fa-edit"></i></div></div>
                    <ul className='id1'>
                    {notes.note[`description${j+1}`].split('\n').map((i)=>  
                        <li className='note'>{i}</li>)
                    }
                    </ul>
                    </div>)||<><h3 className='id id1'>{notes.note[`title${j+1}`]}</h3></>
            ))
            }</div>
        </div>
    )
        }
