const express= require("express");
const router= express.Router();
const mongoose=require("mongoose");
const cabpoolSchema= require("../models/cabpool");
const memberSchema= require("../models/member").model;

const url="mongodb://localhost:27017/"
const connect= mongoose.connect(url,{
   useNewUrlParser:true,
   useUnifiedTopology:true
},(error) =>{
   if(error==null)
   console.log("Connected successfully to Mongo Server");
});
router.get("/", (req,res,next) => {
   cabpoolSchema.find({})
   .select("-__v")
   .then((docs) => {
      res.status(200).json({
         message:"All Cabpools",
         count:docs.length,
         cabpools:docs
      });
   })
   .catch((err)=> {
      res.status(500).json({
         error: err
      });
   })
});
//GET request completed and updated

router.post("/",(req,res,next) => {
   const member= new memberSchema({
      userId:req.body.userId,
      userName:req.body.userName,
      phoneNumber:req.body.phoneNumber
   });
   const cabpool= new cabpoolSchema({
      _id: new mongoose.Types.ObjectId(),
      to:req.body.to,
      from:req.body.from,
      dateOfCabpool:req.body.dateOfCabpool,
      time:req.body.time,
      members:member
   });
   cabpool.save()
   .then((result) => {
      res.status(200).json({
         message:"Cabpool created successfully",
         cabpool: result
      })
   })
   .catch(error => {
      res.status(500).json({
         error:error
      });
   })
});
//POST request completed and updated

router.get("/:cabpoolId",(req,res,next) => {
   const id= req.params.cabpoolId;
   cabpoolSchema.findById(id).select("-__v")
   .then((doc) => {
      res.status(200).json(doc);
   })
   .catch(err => res.status(500).json({
      error:err
   }));
});
//GET/:cabpoolId request completed and updated

router.put("/join/:cabpoolId",(req,res,next) => {
   const cabpoolId= req.params.cabpoolId;
   const newMember= new memberSchema({
      userId:req.body.userId,
      userName:req.body.userName,
      phoneNumber:req.body.phoneNumber
   })
   cabpoolSchema.updateOne({_id:cabpoolId},
      { $push:
         {members:newMember}})
   .then(result => {
      res.status(200).json({
         message:"User added successfully",
         newMember:newMember
      })
   })
   .catch(err=> {
      res.status(500).json({error:err});
   })
});
//PUT join cabpool completed and updated

router.put("/leave/:cabpoolId",(req,res,next) => {
   const cabpoolId= req.params.cabpoolId;
   const userId=req.body.userId;
   cabpoolSchema.update({_id:cabpoolId},
      { $pull:
         {members:{userId:userId}}})
   .then(result => {
      res.status(200).json({
         message:"User removed successfully",
      })
   })
   .catch(err=> {
      res.status(500).json({error:err});
   })
});
//PUT leave cabpool completed and updated

router.delete("/:cabpoolId",(req,res,next) => {
   const id=req.params.cabpoolId;
   cabpoolSchema.deleteOne({_id:id}).exec()
   .then( () => {
      res.status(200).json({
         message:"Deleted cabpool successfully"
      });
   })
   .catch((err)=> {
      res.status(500).json({
         error: err
      });
   })
});
//DELETE cabpool request completed and updated
router.get("/users/:userId",(req,res,next) => {
   const userId=req.params.userId;
   cabpoolSchema.find({"members.userId":userId}).select("-__v")
   .then((docs) => {
      res.status(200).json({
         count:docs.length,
         cabpools:docs});
   })
   .catch((err)=> {
      res.status(500).json({error:err});
   })
});
//GET cabpool for a user completed and updated

module.exports= router;