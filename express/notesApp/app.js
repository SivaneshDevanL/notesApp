const { notStrictEqual } = require("assert")
const express=require("express")
const app=express()
const notes=require("./schema")
const cors=require("cors")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

var name,pass;
function get(){
app.get('/',(req,res)=>{
    notes.find({})
    .then((item)=>
    {
    item.filter((note)=>{
        if(note._doc.userName===name&&note._doc.password===pass){
            res.status(200).json({note}) 
            return note
        }
    })
    })
})
}
app.post('/login',(req,res)=>{
    const {userName,password}=req.body
    var v;
    notes.find({})
     .then(y=>
        v=y.filter((i)=> { //reduce   
        if(i._doc.userName===userName&&i._doc.password===password){
        name=userName;
        pass=password;
        return i;
    }}
        ))
     setTimeout(()=>{
        //  console.log(v);
         if(v.length!=0) {
             res.status(200).json({
                 message:"success"
             })
         }
         else{
             res.status(200).json({
                 message:"failed"
             }) 
         }
     },100)
     get()
})
app.post('/signup',(req,res)=>{
    const {userName,password}=req.body
    var v;
   notes.find({})
    .then(y=>{
        v=y.filter((i)=> {  //reduce
            i._doc.userName===userName&&i._doc.password===password
        })
    })
    setTimeout(()=>{
        if(v.length==0) {
            notes.create(req.body);
            res.status(200).json({
                message:"created"
            })
        }
        else{
            res.status(200).json({
                message:"failed"
            }) 
        }
    },100)
})



app.post('/add',(req,res)=>{
    const{title,description,id}=req.body;
    console.log(id);
    if(id&&(title||description))
    {
        notes.find({userName:name,password:pass})
        .then(x=>{
            const t=`title${id}`;
            const d=`description${id}`;
            notes.findOneAndUpdate({userName:name,password:pass},{ $set: { [t]: title,[d]:description } } ,  
            {upsert: true},function(err,doc) {
                if (err) { throw err; }
                else {    get();
                     console.log("Updated");
                     res.status(200).json({
                         message:'success'
                     })
                     }}
        )
        })
    }
    else if(id){
        notes.find({userName:name,password:pass})
        .then(x=>{
            const t=`title${id}`;
            const d=`description${id}`;
            notes.findOneAndUpdate({userName:name,password:pass},{ $set: { [t]:'',[d]:''} } ,  
            {upsert: true},function(err,doc) {
                if (err) { throw err; }
                else {    get();
                     console.log("Updated");
                     res.status(200).json({
                         message:'success'
                     })
                     }}
        )
        })
    }
    else{
    notes.find({userName:name,password:pass})
    .then(x=>{
        const i=(Object.keys(x[0]._doc).length/2)-1;
        const t=`title${i}`;
        const d=`description${i}`;
        notes.findOneAndUpdate({userName:name,password:pass},{ $set: { [t]: title,[d]:description } } ,  
        {upsert: true},function(err,doc) {
            if (err) { throw err; }
            else {    get();
                 console.log("Updated");
                 res.status(200).json({
                     message:'success'
                 })
                 }}
    )
    })}
})



// app.delete('/delete',(req,res)=>{
//     const {id}=req.body
//     const t=`title${id}`;
//     const d=`description${id}`;
//     notes.findOneAndUpdate({userName:name,password:pass},{ $unset: { [t]: title,[d]:description } } ,  
//         {upsert: true},function(err,doc) {
//             if (err) { throw err; }
//             else {    get();
//                  console.log("Updated");
//                  res.status(200).json({
//                      message:'success'
//                  })
//                  }}
//         )
// })

module.exports=app;