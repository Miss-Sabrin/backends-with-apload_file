const express=require("express");
const { createUser, login,getUser,updateUser,getAllUsers } = require("./controller");
const {upload}=require("../multer.js");
const router=express.Router();

router.post("/register",upload.single("photo"),createUser);
router.post("/login",login);
router.get("/:id",getUser);
router.get("/",getAllUsers);
router.put("/update/:id", upload.single("photo"), updateUser); 

module.exports=router