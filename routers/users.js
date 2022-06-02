
const express = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();



app.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-password');

    if(!userList){
        res.status(500),json({success: false})
    }
    res.send(userList);
})

app.get("/users", async (request, response) => {
    const users = await User.find({});

    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get(`/:id`, async (req, res) =>{
    const user = await User.findById(req.params.id).select('-password');

    if(!user){
        res.status(500),json({message: 'The user with the given ID was not found .'})
    }
    res.status(200).send(user);
})


app.post("/add_user", async (request, req) => {
    const user = new User(request.body);
    try {
        await user.save();
        req.send(user);
    } catch (error) {
        req.status(500).send(error);
    }
});

app.get('/login', async(req,res) =>{
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).send('Auth failed');
    }

   else
        res.status(200).send({user: user.email });

})

app.post('/singup', async (req,res) =>{
 User.findOne({email: req.body.email})
 .exec()
 .then(user => {
     if (user.length >=1){ 
         return res.status(409).json({
             message:"Mail exists"
         });
   

    }else
        res.status(200).send({user: user.email });
    bcrypt.hashSync ( req.body.password, 16, (err,hash) =>{

        if (err) {
            return res.status(500).json({
                error:err
            });
        } else {
            let user = new User({
    
        
                firstname:req.body.firtsname,
                lastname:req.body.lastsname,
                password: hash,
                email:req.body.email,
                phone:req.body.phone,
                isAdmin:req.body.isAdmin,
                
                avatar:req.body.avatar,
                dateofbirth:req.body.dateofbirth,
            });
                user= user.save();
        
            if(!user)
            return res.status(400).send('the user cannot be created!')
        
            res.send(user);
        }
        })})});
        
            
     

app.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments((count) => count)

    if(!userCount){
        res.status(500),json({success: false})
    }
    res.send({
        userCount:userCount
    });
})

app.delete('/:id', async (req,res) =>{
    User.findByIdAndRemove(req.params.id).then(users =>{
        if(users){
            return res.status(200).json({success: true, message : 'the users is deleted'})
        }else{
            return res.status(404).json({success : false , message:'users cannot deleted'})
        }
    }).catch(err =>{
        return res.status(400).json({success: false , error : err})
    })
})

module.exports = app;