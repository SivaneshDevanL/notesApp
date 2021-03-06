import React, { useEffect, useState } from 'react';
import './note.css'
import './fontawesome-free-5.15.3-web/css/all.css'
import { useHistory } from 'react-router';

var v,t,id;
export default function Notes(){
    const [notes,setNotes]=useState();
    const history=useHistory()
    useEffect(()=>{
        fetch("http://localhost:3001")
        .then(x=>x.json())
        .then(setNotes)
    },[])

    function add(){
        if(v===undefined||v.value===''||t===undefined||t.value==='') return
     
        if(id){
        fetch("http://localhost:3001/add",{
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
                fetch("http://localhost:3001")
                .then(x=>x.json())
                .then(setNotes)
            }
        })
        id=0
    }
        else{
            fetch("http://localhost:3001/add",{
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
                    fetch("http://localhost:3001")
                    .then(x=>x.json())
                    .then(setNotes)
                }
            })} 
            t.value=''
            v.value='' 
        }

    function todelete(i){
        fetch("http://localhost:3001/add",{
            headers:{'content-type':'application/json'},
            method:'post',
            body:JSON.stringify({
                id:i
            })
        })
        .then(z=>z.json())
        .then(y=>{
            if(y.message==='success'){
                fetch("http://localhost:3001")
                .then(x=>x.json())
                .then(setNotes)
            }
        })
    }
    function edit(i){
            t=document.getElementsByTagName('input')[0]
            v=document.getElementsByTagName('textarea')[0]
            // console.log(document.getElementsByClassName('id')[i].innerText);
            // console.log(document.getElementsByClassName('id1')[i].innerText);
        t.value=document.getElementsByClassName('id')[i].innerText;
        v.value=document.getElementsByClassName('id1')[i].innerText;
        id=i+1;
        // console.log(document.getElementsByClassName('id')[i].innerText);
    }
    return(
        <div id="notes">
            <div id='input'>
            <input className='input' placeholder='Title'  onChange={(e)=>(t=e.target)}/>
            <textarea className='input' placeholder='Take a note' rows='1' onChange={(e)=>(v=e.target)}/>
            <h4 onClick={add}>Add</h4></div>
            <h4 onClick={()=>history.push('/')} id='log'>log out</h4>
            <div id='flex1'>
            {notes&&Array(Object.keys(notes.note).length/2-2).fill(1).map((i,j)=>(
                    (notes.note[`title${j+1}`]!==''&&
                    <div className='object'>
                    <div className='symbol'>
                    <i id='img' onClick={()=>todelete(j+1)} className="fas fa-trash-alt"></i>
                    <i id='img1' onClick={()=>edit(j)} className="fas fa-edit"></i></div>
                    <h3 className='note note1 id'>{notes.note[`title${j+1}`]}</h3>
                    <ul className='id1'>
                    {notes.note[`description${j+1}`].split(/\r?\n/).map((i)=>
                        <li className='note'>{i}</li>)
                    }
                    </ul>
                    </div>)||<><h3 className='id id1'>{notes.note[`title${j+1}`]}</h3></>
            ))
            }</div>
        </div>
    )
}