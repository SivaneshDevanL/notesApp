import React, { useEffect, useState } from "react";
import './admin.css'
import { useNavigate } from "react-router-dom";
import './fontawesome-free-5.15.3-web/css/all.css'


export default function Admin(){
    const [state,setState]=useState();
    const navigate=useNavigate()
    useEffect(()=>{
        fetch('https://beautiful-dog-fatigues.cyclic.app/data')
        .then(x=>x.json())
        .then(setState)
    },[])
    function deleteAdmin(object){
        fetch('https://beautiful-dog-fatigues.cyclic.app/deleteAdmin',{
            headers:{'content-type':'application/json'},
            method:'delete',
            body:JSON.stringify({
                _id:object._id  
            })
        })
        .then(x=>x.json())
        .then(y=>{
            if(y.message==='success'){
                fetch('https://beautiful-dog-fatigues.cyclic.app/data')
                .then(z=>z.json())
                .then(setState)
            }
        })
    } 
    return(
        <div id='adminlist'>
            <h3>Users List</h3>
            {state&&state.n.map((i,j)=>(
                <div>
                <i className="fas fa-trash-alt" onClick={()=>deleteAdmin(i)}></i>
                <h3>user{j+1}</h3>
                <h4>userName:{i.userName}</h4>
                {Array(Object.keys(i).length/2-2).fill(1).map((k,l)=>(
                   <>
                    <p>title{l+1}:{i[`title${l+1}`]}</p>
                    <p>description{l+1}:{i[`description${l+1}`]}</p>
                   </> 
                ))}
                </div>
            ))}
            <h3 onClick={()=>navigate('/')}>Log out</h3>
        </div>
    )
}