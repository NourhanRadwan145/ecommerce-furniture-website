// ---------------------------------- All Requires -------------------------------------
const UserModel = require("../Models/UserModel")
const OrderModel = require("../Models/OrderModel")
const ProductModel = require('../Models/productsModel'); 
const UserValidate = require("../Utils/UserValidate")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const cloudUpload = require("../Utils/Cloudinary");
// ---------------------------------- Get All Users  ------------------------------------
let GetAllUsers = async (req, res) => {
  // => for testing routes
  try {
    let users = await UserModel.find({});
    if (!users) return res.json({ message: "No Users Found" });
    return res.json(users);
  } catch (err) {
    return res.json(err);
  }
};
// ---------------------------------- Get User By ID  -----------------------------------
let GetUserById = async (req, res) => {
  try {
    console.log(req.params.id);
    let user = await UserModel.findById(req.params.id);
    if (!user) return res.json({ message: "No User Found" });
    return res.json(user);
  } catch (err) {
    return res.json(err);
  }
};
// ---------------------------------- Add New User  -------------------------------------
let AddNewUser = async (req, res) => {
  try {
    let { error } = UserValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let salt = await bcrypt.genSalt(10);
    let password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, salt);

    // Adding Image to Cloudinary

    let uploadedImage = await cloudUpload(req.files[0].path);
    console.log(uploadedImage);

    let user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      image: uploadedImage.url,
      gender: req.body.gender,
    });
    console.log(user);
    await user.save();
    return res.json({ message: "User Added Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// ---------------------------------- Update User By ID  --------------------------------
const UpdateUser = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    if (updateData.password) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(updateData.password, saltRounds);
            updateData.password = hashedPassword;
        } catch (error) {
            console.log("Error hashing password:", error.message);
            return res.status(500).json({ message: "Error hashing password", error: error.message });
        }
    }

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const originalUsername = user.username;
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });

        if (updatedUser.username !== originalUsername) {
            const updateResult = await OrderModel.updateMany(
                { userId: id },
                { $set: { username: updatedUser.username } }
            );
            console.log('OrderModel Update Result:', updateResult);
        }

        return res.json(updatedUser);
    } catch (error) {
        console.log("Error updating user:", error.message);
        return res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

// ---------------------------------- Delete User By ID  ---------------------------------
let DeleteUser = async (req, res) => {
  try {
    let user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.json({ message: "No User Found" });
    return res.json({ message: "User Deleted Successfully" });
  } catch (err) {
    return res.json(err);
  }
};
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
// ---------------------------------- Add Product To Cart ------------------------
let AddProductToCart = async (req, res) => {
    const { user_id, product, quantity } = req.body;

    try {
        const user = await UserModel.findById(user_id);
        const productt = await ProductModel.findById(product);

        if (!user || !productt) {
            return res.status(404).json({ message: "User or product not found" });
        }

        const existingItemIndex = user.carts.findIndex(item => item.product.toString() === product.toString());

        if (existingItemIndex !== -1) {
            const newQuantity = user.carts[existingItemIndex].quantity + quantity;
            if (newQuantity > productt.quantity) {
                return res.status(400).json({ message: "Quantity exceeds stock" });
            } else {
                user.carts[existingItemIndex].quantity = newQuantity;
                productt.quantity -= quantity;
                await productt.save();
            }
        } else {
            if (quantity > productt.quantity) {
                return res.status(400).json({ message: "Quantity exceeds stock" });
            } else {
                user.carts.push({ "product": product, "quantity": quantity });
                productt.quantity -= quantity;
                await productt.save();
            }
        }

        await user.save();
        const { password, ...userData } = user.toObject();
        return res.status(201).json({ message: "Item added to cart successfully", user: userData });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

let AddProductToOrder = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch products from the database
        const productIds = user.carts.map(item => item.product);
        const products = await ProductModel.find({ _id: { $in: productIds } });

        // Calculate total price of the order
        let totalPrice = 0;
        user.carts.forEach(item => {
            const product = products.find(p => p._id.toString() === item.product.toString());
            if (product) {
                totalPrice += product.price * item.quantity;
            }
        });
        // Add delivery fee
        totalPrice += 300;

        // Move products from carts to orders
        const orderProducts = user.carts.map(item => item.product);
        user.orders.push(...orderProducts);

        // Clear the carts
        user.carts = [];

        // Save the updated user
        await user.save();

        // Create a new order
        const order = new OrderModel({
            userId: user._id,
            username: user.username,
            date: new Date(),
            totalPrice: totalPrice,
            products: orderProducts,
            status: "Pending"
        });

        // Save the order
        await order.save();

        res.status(200).json({ message: "Products added to order successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// ---------------------------------- Remove Product From Cart ------------------------
let RemoveProductFromCart = async (req, res) => {
    const { userid, productid } = req.body;

    try {
        const user = await UserModel.findById(userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartItem = user.carts.find(item => item.product.toString() === productid);
        if (!cartItem) {
            return res.status(404).json({ message: "Product not found in user's cart" });
        }

        const CartItemQunatity = cartItem.quantity;

        user.carts = user.carts.filter(item => item.product.toString() !== productid);
        await user.save();

        const product = await ProductModel.findById(productid);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.quantity += CartItemQunatity;
        await product.save();

        res.status(200).json({ message: "Product removed from cart successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
// ---------------------------------- Update Product Quantity ------------------------
let IncreaseProductQuantity = async (req, res) => {
    const { userid, productid } = req.body;

    try {

        const user = await UserModel.findById(userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartItem = user.carts.find(item => item.product.toString() === productid);
        if (!cartItem) {
            return res.status(404).json({ message: "Product not found in user's cart" });
        }

        cartItem.quantity += 1;
        await user.save();

        const product = await ProductModel.findById(productid);
        if (!product || product.quantity == 0) {
            return res.status(404).json({ message: "Product not found or out of stock" });
        }
        product.quantity -= 1;
        await product.save();

        res.status(200).json({ message: "Product quantity increased successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



let DecreaseProductQuantity = async (req, res) => {
    const { userid, productid } = req.body;

    try {
        const user = await UserModel.findById(userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartItem = user.carts.find(item => item.product.toString() === productid);
        if (!cartItem) {
            return res.status(404).json({ message: "Product not found in user's cart" });
        }

        if (cartItem.quantity !== 1) {
            cartItem.quantity -= 1;
        }
        await user.save();

        const product = await ProductModel.findById(productid);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.quantity += 1;
        await product.save();

        res.status(200).json({ message: "Product quantity decreased successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// ---------------------------------- Get Cart By User ID ------------------------
let GetCartByUserId = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ cart: user.carts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

let GetOrdersByUserId = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await UserModel.findById(userId).populate("orders");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ orders: user.orders });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const GetUserByToken = async (req, res) => {
    try {
        const cookie = req.cookies["jwt"];
        if (!cookie) {
            // console.log("JWT cookie not found")
            return res.status(401).json({ message: "Unauthorized: JWT cookie not found" });
        }
        const claims = jwt.verify(cookie, "secret"); 
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

  const userLogout = async (req, res) => {
    try {
        const cookie = req.cookies["jwt"];
        if (cookie) {
            res.clearCookie("jwt").send("Logout successful");
        } else {
            res.send("No JWT cookie found");
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// ---------------------------------- Export All Functions  ------------------------------
module.exports = {
    GetAllUsers, 
    GetUserById, 
    AddNewUser, 
    UpdateUser, 
    DeleteUser, 
    LoginUser, 
    RegisterUser,
    AddProductToCart,
    RemoveProductFromCart,
    IncreaseProductQuantity,
    DecreaseProductQuantity,
    GetCartByUserId, 
    GetOrdersByUserId,
    AddProductToOrder,
    GetUserByToken,
    userLogout
}
// ---------------------------------- End Of Controller ----------------------------------
