const express=require("express");

const { createUser, login,getUser, updateUser, getUsers, deleteUser } = require("./controller");

const {upload}=require("../multer.js");
const router=express.Router();

router.post("/register",upload.single("photo"),createUser);
router.post("/login",login);
router.get("/:id",getUser);

router.get("/",getUsers);
router.patch("/:id",updateUser);
router.delete("/:id",deleteUser);



module.exports=router