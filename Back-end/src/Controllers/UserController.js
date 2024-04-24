// ---------------------------------- All Requires -------------------------------------
const UserModel = require("../Models/UserModel")
const UserValidate = require("../Utils/UserValidate")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")



// ---------------------------------- Get All Users  ------------------------------------
let GetAllUsers = async (req, res)=>{
    // => for testing routes
    // let users = await UserModel.find({})
    // return res.json(users)
}
// ---------------------------------- Get User By ID  -----------------------------------
let GetUserById = async (req, res)=>{}
// ---------------------------------- Add New User  -------------------------------------
let AddNewUser = async (req, res)=>{}
// ---------------------------------- Update User By ID  --------------------------------
let UpdateUser = async (req, res)=>{}
// ---------------------------------- Delete User By ID  ---------------------------------
let DeleteUser = async (req, res)=>{}
// ---------------------------------- Login User  ---------------------------------------
let LoginUser = async (req, res)=>{
    const user = await UserModel.findOne({email:req.body.email})
    if(!user) {
        return res.status(400).send({message:"Invalid Email or Password"})
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) {
        return res.status(400).send({message:"Invalid Email or Password"})
    }
    const {_id} = user.toJSON()
    const token = jwt.sign({_id: _id }, "secret")
    res.cookie("jwt", token, {
        httpOnly:true,
        maxAge: 24*30*60*60*1000
    })
    return res.status(200).json({message:"User Logged In Successfully", user:user})
    
}
// ---------------------------------- Register User  ------------------------------------
let RegisterUser = async (req, res)=>{
    let {error} = UserValidate(req.body)
    if(error) return res.status(400).json({message:error.details[0].message})

    try {
        let name = req.body.username  
        let email = req.body.email
        let password = req.body.password
        let gender = req.body.gender

        let salt = await bcrypt.genSalt(10)  
        let hashedPassword = await bcrypt.hash(password, salt) 

        let checkUser = await UserModel.findOne({email:email})    
        if(checkUser){
            return res.status(400).json({message:"User Already Exists"})
        }
        else{
            let newUser = new UserModel({  
                username:name,
                email:email,
                password:hashedPassword,
                gender: gender
            })
            let savedUser = await newUser.save()  
            const {_id} = savedUser.toJSON() 
            // const secretKey = crypto.randomBytes(32).toString("hex") 
            const token = jwt.sign({_id: _id}, "secret") 
            res.cookie("jwt", token, { 
                httpOnly:true,
                maxAge: 24*30*60*60*1000 
            })  
            // console.log(token)
            return res.status(201).json({message:"User Created Successfully", user:savedUser})  
        }
    } 
    catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const GetUserByToken = async (req, res) => {
    try {
        const cookie = req.cookies["jwt"];
        if (!cookie) {
            console.log("JWT cookie not found")
            return res.status(401).json({ message: "Unauthorized: JWT cookie not found" });
        }

        const claims = jwt.verify(cookie, "secret"); // Remove extra space from the secret
        if (!claims) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        const user = await UserModel.findOne({ _id: claims._id });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const { password, ...data } = user.toJSON();
        return res.json({ data: data });
    } catch (error) {
        console.error("Error in GetUserByToken:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};





// ---------------------------------- Export All Functions  ------------------------------
module.exports = {GetAllUsers, GetUserById, AddNewUser, UpdateUser, DeleteUser, LoginUser, RegisterUser, GetUserByToken}
// ---------------------------------- End Of Controller ----------------------------------