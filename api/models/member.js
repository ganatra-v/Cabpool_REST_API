const mongoose= require("mongoose");
const memberSchema= new mongoose.Schema({
   userId:{
      type:String,
      required:true
   },
   userName:{
      type:String,
      required:true
   },
   phoneNumber:{
      type:String,
      required:true
   }
});
   module.exports={
      schema:memberSchema,
      model:mongoose.model("Member",memberSchema)
   };