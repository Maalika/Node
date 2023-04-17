const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const store=new Schema({
    storeName:{type:String,required:true},
    storeType:{type:String,required:true},
    storeOwner:{type:String,required:true},
    storeImages:[
        {
            type:Object
        }
    ]
});
module.exports=mongoose.model('store',store);