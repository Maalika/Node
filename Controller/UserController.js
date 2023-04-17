const UserModel=require('../Model/UserModel');
const StoreModel=require('../Model/StoreModel');
var jwt=require('jsonwebtoken');
const userRegistration=async (req,res)=>{
   try{ 
    const {name,email,password,role}=req.body;
    const newUser=new UserModel({
        name:name,
        email:email,
        password:password,
        role:'1',
        coverPhoto:req.file.path
        // location:{
        //     type:'Point',
        //     cooridinates:[parseFloat(lat),parseFloat(long)]
        // },
    });
    // Creating token
    const token=jwt.sign(
        {
           id:newUser._id
        },
        'secret',
        {
            expiresIn:'1h'
        }
    );
    // Checking Token is generating or not
    // console.log("New User",token);
    // return;
    
    const savedUser=await newUser.save();
    //It only send saved 
    // res.send(savedUser);
    //It is used to send token
    let result={
        data:savedUser,
        token:token
    };
    res.send(result);
    
   }catch(error){
    console.log("error");
   }
    
}
const updateregistration=async (req,res)=>{
    try{
        const {name}=req.body;
        await UserModel.findByIdAndUpdate(
            { _id:req.user.id},
            {
                name:'cetpa',
            }
        );
        res.send("name update");
    }
    catch(error){
        console.log('error',error);
        res.send(error);
    }
}
const createStore=async(req,res)=>{
    try{
        const {storeName,storeType}=req.body;
        console.log('req.body',req.body);
        const newstore=new StoreModel({
            storeName:storeName,
            storeType:storeType,
            storeOwner:req.user.id
        })
        console.log("newstore",newstore);
        const saveStore=await newstore.save();
        res.send(saveStore);
    }
    catch(error){
        console.log(error);
        res.send("error",error);
    }
}
const uploadStoreImages=async(req,res)=>{
    try{
        console.log('req.file',req.file);
        const update=await StoreModel.findOneAndUpdate(
            {
                storeOwner:req.user.id,
            },
            {$set:{storeImages:req.file.path}}
        );
        res.send('update Images');
        console.log(req.file);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}
const findStore=async(req,res)=>{
    try{
       
    const finstore=await StoreModel.find({storeOwner:req.user.id});
        console.log('findStore',finstore);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}
const findUser=async(req,res)=>{
    try{
        const data=await UserModel.aggregate([
        {
            $match:{
                $or:[{email:{$regex:`^${req.body.key}`,$options:'i'}}],
            }
        }
        ])
        res.send(data)
    }
    catch(error){
        console.log('error',error);
        res.send(error);
    }
}
module.exports={
    userRegistration,
    updateregistration,
    createStore,
    uploadStoreImages,
    findStore,
    findUser
};