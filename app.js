const express=require('express');
const app=express();
const userRouter=require('./View/UserRouter');
const database=require('./database/index');
const multer=require('multer');
const bodyParser=require('body-parser');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/profilePhoto');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
//   app.use(express.static(__dirname+'./public'));
  app.use('/uploads',express.static('uploads'));


app.use(bodyParser.json());
app.use('/api',upload.single('file'),userRouter);
app.listen(4900,()=>{
    console.log("Server Started");
})