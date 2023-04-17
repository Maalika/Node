// const mongoose=require('mongoose');

// mongoose.connect(URL).then((success)=>{
//     console.log("Successful database")
// }).catch((error)=>{
//     console.log("error",error)
// })
const mongoose=require('mongoose');
let URL="mongodb://127.0.0.1:27017/nodejsProject";
mongoose.connect(URL).then((sucess)=>{
    console.log("Database is ");
}).catch((error)=>{
    console.log("error",error);
});
