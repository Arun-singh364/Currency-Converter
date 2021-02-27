// imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//const bodyParser = require('body-parser')
const User = require('./models/signup')
const app = express()
//db connections
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/signup')
mongoose.connection.on('connected',()=>{
    console.log('Database is connected');
})
mongoose.connection.on('error',()=>{
    console.log('error occured');
})
//middlewares
app.use(cors())
app.use(express.json())


//routes
app.get('/',(req,res)=>{
    User.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
})
app.post('/signup',(req,res)=>{
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);
    const user = new  User({
        _id : new mongoose.Types.ObjectId,
        name : req.body.name,
        email : req.body.email,
        password: req.body.password,
          });
    user.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"succesfully submitted"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error occured"});
    })
})

app.post('/login', (req, res) => { 
  
     let user = User.findOne({ email: req.body.email });
     if(!user){
         res.status(400).send("Invalid email or password");
     } 
        else {
    User.findOne({ email: req.body.email , password:req.body.password})
    .exec()
    .then(result=>{
        // console.log(result);
        res.send(result);
    })
    .catch(err=>{
        res.status(500).send(err);
    })    
}

});

app.put('/updatepassword/:id',(req,res)=>{
    const eid = req.params.id;
    const Npassword=req.body.password;
    User.update({email:eid},{$set:{password:Npassword}})
    .then(result=>{
        console.log(result.n);
        res.send(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred"});
    })
})



//server
app.listen(5000,()=>{
    console.log('server was connected on port:5000')
})