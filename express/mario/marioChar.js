const mongoose = require('mongoose');

//  Your code goes here
const marioSchema = new mongoose.Schema(
  { any: {} },
//  {name:{type:String,required:true}},
//     { weight:{type:Number,required:true}},
   { collection: "Mariochar", strict: false }
  //  {name:mongoose.Schema.Types.String,
  //  weight:mongoose.Schema.Types.Number
  // }
  );
  const marioModel = mongoose.model("Mariochar", marioSchema);

module.exports = marioModel;