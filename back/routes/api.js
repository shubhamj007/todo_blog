const express = require("express");
const router = express.Router();

/**
 * !Store Image In Cloudinary
*/
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary");

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "folder-name",
  allowedFormats: ["jpg", "png", "gif"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
var parser = multer({ storage: storage });
/*-------------End Of cloudinary------------------*/

const CreateUser = require("./../controllers/userController/createUser");

// Auth
const Login = require("./../controllers/authController/login");

// Blog
const {createBlog, getBlog, getBlogById, getMyBlog, removeBlog, blogUpdate, deleteImage} = require("./../controllers/blogController/createBlog");
const {comment, commentList, deleteComment} = require("./../controllers/blogController/comment");
const {likes}= require("./../controllers/blogController/likeBlog")


const passport = require("passport");
const strategy = require("./../middleware/passport");

/** 
 **Passport Authentication 
 */
passport.use(strategy);
let Passport = passport.authenticate("jwt", { session: false });


/*
 * *Get Home Page
*/
router.get("/", function(req, res, next) {
  res.json({
    status: "success",
    message: "Parcel Pending API",
    data: { version_number: "v1.0.0" }
  });
});


/*
 *user create
*/
router.post("/users", CreateUser.createuser); // C

/**
 * *Login
 * ?Authentication
 */
router.post("/users/login", Login.login);


/**
 * *Blog Operation
*/

/*create blog */
router.post("/blog", Passport, parser.single("image"), createBlog); // C
/*Get Blog Details */
router.get("/blogdetail",getBlog); // R
/*Get particular blog*/
router.get("/getBlogById/:id", Passport, getBlogById); // R
/*Get own Blog List */
router.get("/getMyBlog/:id", Passport, getMyBlog); // R
/*Update Blog */
router.put("/updateblog/:id", Passport, parser.single("image"), blogUpdate); //U
/*Delete Blog */
router.delete("/deleteblog/:id",Passport,removeBlog); // D
/*Delete Image*/
router.put("/deleteImage/:id", Passport, deleteImage); // D


/* Comment for Blog */
router.post("/comment", Passport, comment); // C
router.get("/getcomment", Passport, commentList); // C
router.delete("/delete/:id", Passport, deleteComment); // D

/* Like operations */
router.post("/like", Passport, likes)


module.exports = router;
