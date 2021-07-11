const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get("/",(req,res)=>{
res.status(200).send("HOME!");
}
)
app.get("/mario",(req,res)=>{
    marioModel.find()
    .then((mariochar)=>{
        res.status(200).json({mariochar})
})
})
app.get("/mario/:id",(req,res)=>{
  const {id}=req.params;
  marioModel.findById(id)
  .then((result)=>{
    res.status(200).json({result});
  })
  .catch((err)=>{
    res.status(400).json({
      message:"error"
    })
  })
})
app.post("/mario",(req,res)=>{
  const {name,weight}=req.body;
    if(name&&weight){
      marioModel
      .create(req.body)
      .then((objCreated) => {
        res.status(201).json({
          objCreated,
          message: "Successful entry to db",
        });
      })
    }
    else{
      res.status(400).json({
        message:"either name or weight is missing"
      })
    }
})
app.patch("/mario/:id",(req,res)=>{
  const {id}=rq.params;
  // marioModel
  // .findByIdAndUpdate(id)
  // .
//  console.log("hi")
//   const { id } = req.params;
//   let dbObj = {};
//   console.log(id)
//   let re=await marioModel.findById(id);
//   console.log(re)
  marioModel
    .findById(id)
    .then((result) => (dbObj=result)
      // console.log('first')}
    )
    .catch((err) =>
      res.status(400).json({
        message: "entry not found",
      })
    );
  //     const v=parseInt(dbObj.weight)
  // console.log(dbObj)
//  dbObj['weight'] = dbObj['weight'] + 1
  marioModel
    .findByIdAndUpdate(id, {...dbObj,weight:dbObj.weight+1})
  .then((result) =>
      res.status(200).json({
        message: "Successful",
        result,
      })
      // console.log(dbObj);}
    );
})
// app.put("/check",(req,res)=>{
//   console.log('hi')
//   res.status(200).json({
//     message:'success'
//   })
// })
app.delete("/mario/:id", (req, res) => {
    const { id } = req.params;
    marioModel
      .findByIdAndDelete(id)
      .then((result) => {
        res.status(200).json({
          message: "character deleted",
          result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "error",
          err,
        });
      });
  });
  
// your code goes here


module.exports = app;