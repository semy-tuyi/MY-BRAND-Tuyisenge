const {createUserSchema, loginUserSchema} = require('../helpers/validation_schema');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createNewUser = async(req, res) => {
    try {
        const validationResult = await createUserSchema.validateAsync(req.body);
        const userExist = await User.findOne({email:validationResult.email});

        if(userExist){
            res.json({message: "user email already exist"}).status(400)
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(validationResult.password, salt);

            const user = new User({
                name: validationResult.name,
                email:validationResult.email,
                password:hashedPassword,
                role:'subscriber'
            });

            user.save()
            .then(user => res.json({
                id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)
            }))
            .catch(err => console.log(err));
            
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}

const loginUser = async (req, res) => {
    try{
        const validationResult = await loginUserSchema.validateAsync(req.body);
        const {email, password} = validationResult;
        const user = await User.findOne({email})
        if(user && ( await bcrypt.compare(password,user.password))){
            res.json({
                id:user._id,
                name:user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }else{
            res.json({message:"Invalid credentials"}).status(400);
        }
    }catch(error){
        res.json({message:error}).status(400);
    }
}

const getAllUsers = (req, res) =>{
    User.find()
    .then(result => {
        res.json(result)
    })
}

const deleteUser = (req, res) =>{
    const {id} = req.params
    User.deleteOne({_id:id})
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.status(404).json({error:"user doesn't exist"})
        })
    /*if(req.user.role.toString() === 'admin'){
        
    }else{
        res.json({message:"User not authorized"}).status(404)
    }*/
}
// generate token

const generateToken = (id) => {
    const secret = "tuyi";
    return jwt.sign({id},secret, {expiresIn:'30d'})
}
//process.env.JWT_SECRET
module.exports = {
    createNewUser, loginUser, getAllUsers, deleteUser
}