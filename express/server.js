const express=require('express')
const app=express()
// const bodyParser = require("body-parser");
// app.use(express.urlencoded());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.get('/',(req,res)=>{
  res.status(200).send('Hello world!')
})
app.post('/add',(req,res)=>{
  //console.log(req.body);
  const {num1,num2}=req.body;
  const {status,message}=generalValidations(num1,num2);
  if(status==='error'||status==='failure'){
    res.status(400).json({
      status,
      message
    })
  }
  else {
    if(num1+num2>10e6){
      res.status(400).json({
        status:'failure',
        message:'Overflow',  
      })
    }
    else{
    res.status(200).json({
      status,
      message:'the sum of given two numbers',
      sum:num1+num2
    })}
  }
})
app.post('/sub',(req,res)=>{
  //console.log(req.body);
  const {num1,num2}=req.body;
  const {status,message}=generalValidations(num1,num2);
  if(status==='error'||status==='failure'){
    res.status(400).json({
      status,
      message
    })
  }
  else {
    if(num1-num2<-10e6){
      res.status(400).json({
        status:'failure',
        message:'Underflow',  
      })
    }
    else{
    res.status(200).json({
      status,
      message:'the difference of given two numbers',
      difference:num1-num2
    })}
  }
})
app.post('/multiply',(req,res)=>{
  //console.log(req.body);
  const {num1,num2}=req.body;
  const {status,message}=generalValidations(num1,num2);
  if(status==='error'||status==='failure'){
    res.status(400).json({
      status,
      message
    })
  }
  else {
    res.status(200).json({
      status,
      message:'The product of given numbers',
      result:num1*num2
    })
  }
})
app.post('/divide',(req,res)=>{
  //console.log(req.body);
  const {num1,num2}=req.body;
  const {status,message}=generalValidations(num1,num2);
  if(status==='error'||status==='failure'){
    res.status(400).json({
      status,
      message
    })
  }
  else {
    if(num2==0){
      res.status(400).json({
        status:'error',
        message:'Cannot divide by zero'
      })
    }
    else{
    res.status(200).json({
      status,
      message:'The division of given numbers',
      result:num1/num2
    })}
  }
})
app.listen(3000,()=>console.log('running'));

function generalValidations(num1, num2) {
  if (typeof num1 === "string" || typeof num2 === "string")
    return {
      status: "error",
      message: "Invalid data types",
    };
  if (num1 < -1 * 10e6 || num2 < -1 * 10e6)
    return {
      status: "failure",
      message: "Underflow",
    };
  if (num1 > 1 * 10e6 || num2 > 1 * 10e6)
    return {
      status: "failure",
      message: "Overflow",
    };
  return {
    status: "success",
  };
}
module.exports=app;