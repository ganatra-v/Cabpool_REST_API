const mongoose= require("mongoose");
const memberSchema=require("./member");

const cabpoolSchema=mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   to:{
      type:String,
      required:true
   },
   from:{
      type:String,
      required:true
   },
   dateOfCabpool:{
      type:String,
      required:true
   },
   time:{
      type:String,
      required:true
   },
   members:[memberSchema.schema]
});

module.exports=mongoose.model("Cabpool",cabpoolSchema);