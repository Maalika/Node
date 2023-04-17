const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const user=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    // location:{
    //     type:{type:String},
    //     cooridinates:[],
    // }
    coverPhoto:{
        type:Object,
    }
});
// user.index({location:'2dsphere'});
module.exports=mongoose.model('user',user);