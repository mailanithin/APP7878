const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

let adminSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    gender:String,
    email:String,
    password:String,
    mobileNo:Number,
    profilePic:String,
});

let admin = new mongoose.model("user",adminSchema,"userDetails")

let app = express();

app.use('/images', express.static('images'));

app.use(express.static(path.join(__dirname,"./client/build")))

app.use(cors());


app.listen(7878,()=>{
    console.log("This port is listening to 7878 ");
})

app.delete("/remove",upload.none(),async(req,res)=>{
let deletedResults =  await admin.deleteMany({email:req.body.email})
if (deletedResults.deletedCount>0) {
  res.json({status:"success",msg:"account has been deleted"})
} else {
    res.json({status:"failure",msg:"account hasn't been deleted"})
}
})

app.patch("/modified",upload.single("profilePic"),async(req,res)=>{

  try {
    if (req.body.firstName.length>0) {
     await admin.updateMany({email:req.body.email},{firstName:req.body.firstName})
  }

  if (req.body.lastName.length>0) {
     await admin.updateMany({email:req.body.email},{lastName:req.body.lastName})
  }

  if (req.body.age.length>0) {
     await admin.updateMany({email:req.body.email},{age:req.body.age})
  }

  if (req.body.gender.length>0) {
     await admin.updateMany({email:req.body.email},{gender:req.body.gender})
  }

  if (req.body.password.length>0) {
     await admin.updateMany({email:req.body.email},{password:req.body.password})
  }

  if (req.body.mobileNo.length>0) {
     await admin.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo})
  }
 
  if (req.file) {
     await admin.updateMany({email:req.body.email},{profilePic:req.file.path})
  }
    res.json({status:"success",msg:"account has been updated"})
  } catch (error) {
     res.json({status:"failure",msg:"account hasn't been updated"})
  }


  
})

app.post("/validate",upload.none(),async(req,res)=>{
 let decrypted = jwt.verify(req.body.token,"nithin");
 console.log(decrypted);
let credentials = await admin.find().and([{email:decrypted.email}])
if (credentials.length >0) {
  if (credentials[0].password == decrypted.password) {
   let dataToSend ={
    firstName:credentials[0].firstName,
    lastName:credentials[0].lastName,
    age:credentials[0].age,
    gender:credentials[0].gender,
    email:credentials[0].email,
    mobileNo:credentials[0].mobileNo,
    profilePic:credentials[0].profilePic,    
    }
    res.json({status:"Success",msg:"credentials are correct",data:dataToSend})
    } else {
    res.json({status:"Failure",msg:"credentials are incorrect"})
   }
    } else {
    res.json({status:"Failure",msg:"user doesnot exist yet"})
    }
})

app.post("/login",upload.none(),async(req,res)=>{
    let credentials = await admin.find().and([{email:req.body.email}])
    if (credentials.length >0) {
      let isValidPassword = await bcrypt.compare(req.body.password,credentials[0].password)
        if (isValidPassword) {
      let token = jwt.sign({email:req.body.email,password:req.body.password},"nithin")
            let dataToSend ={
                firstName:credentials[0].firstName,
                lastName:credentials[0].lastName,
                age:credentials[0].age,
                gender:credentials[0].gender,
                email:credentials[0].email,
                mobileNo:credentials[0].mobileNo,
                profilePic:credentials[0].profilePic,
                token:token
            }
            res.json({status:"Success",msg:"credentials are correct",data:dataToSend})
        } else {
              res.json({status:"Failure",msg:"credentials are incorrect"})
        }
    } else {
          res.json({status:"Failure",msg:"user doesnot exist yet"})
    }
})

app.post("/newAccount",upload.single("profilePic"),async(req,res)=>{
  console.log(req.body);
  console.log(req.file);
let details = await admin.find()
   res.json(details);
   let hashedPassword = await bcrypt.hash(req.body.password,10);
    try {
    let user = new admin({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    age:req.body.age,
    gender:req.body.gender,
    email:req.body.email,
    password:hashedPassword,
    mobileNo:req.body.mobileNo,
    profilePic:req.file.path,
    })
      await user.save()
      res.json("data inserted into mangodb");
    } catch (error) {
      res.json("data is not inserted into mangodb");
    }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

let connectedToMGDB = async ()=>{
    try{await mongoose.connect("mongodb+srv://Nithin_75:nithin_75@batch250203.bljaajo.mongodb.net/Munna?retryWrites=true&w=majority&appName=Batch250203");
        console.log("successfully connected to mangodb");   
    }catch(error){
        console.log("unable to connect to mangodb");
    }  
}
connectedToMGDB();