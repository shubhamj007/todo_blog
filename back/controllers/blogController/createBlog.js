const Blog = require("../../models").blogs;
const cloudinary = require("cloudinary");
var moment = require('moment');

/**
 * @for Create Blog
 * @param {title, description, file}
 * @return {blog_Data} The result of created blog data.
*/
const createBlog = async function(req, res) {
  const blogBody = req.body;
  blogBody.created_by = req.user.id;

  // let today = moment().format('MMMM Do YYYY, h:mm a');
  // blogBody.created_at = today;

  if (!blogBody.title) {
    return ReE(res, { success: false, message: "Title is required." }, 401);
  }

  if (!blogBody.description) {
    return ReE(res,
      { success: false, message: "Description is required." },401);
  }

  if (req.file) {
    blogBody.imgUrl = req.file.url;
    blogBody.public_id = req.file.public_id;
    blogBody.version = req.file.version;
  }

  let err, blog;
  [err, blog] = await to(Blog.create(blogBody));

  return ReS(res,{
      message: "Blog Post Successfully.",
      Blog: blog
    },200);
};
module.exports.createBlog = createBlog;


/**
 * @for get all blogs
 * @param {req, res} 
 * @returns {blog_outcomes} The result of Get all blogs 
*/
const getBlog = async function(req, res) {
  let err, blogObj;

  [err, blogObj] = await to(
    Blog.findAll({
      order: [["title", "ASC"]]
    })
  );

  if (err) { return ReE(res, err, 422);}

  return ReS(res,{
      blog_outcomes: blogObj
    },200);
};
module.exports.getBlog = getBlog;


/**
 * @for Get Blog By Id
 * @param {blogId}
 * @return {blog_Data} The result of Blog By Id 
*/
const getBlogById = async function(req, res) {
  let err, blogObj;
  const blogId = req.params.id;

  [err, blogObj] = await to(
    Blog.findOne({
      where: {
        id: blogId
      }
    })
  );

  if (err) {
    return ReE(res, err, 422);
  }

  return ReS(
    res,
    {
      blog_outcomes: blogObj
    },200);
};
module.exports.getBlogById = getBlogById;


/**
 * @for Get own Blog List
 * @param {userId}
 * @return {blog_outcomes} The result of get own blog list
*/
const getMyBlog = async function(req, res) {
  let created_by = req.user.id;

  let err, blogObj;

  [err, blogObj] = await to(
    Blog.findAll({
      where: {
        created_by
      }
    })
  );

  if (err) {return ReE(res, err, 422);}

  return ReS(res,{
    blog_outcomes: blogObj
    },200);
};
module.exports.getMyBlog = getMyBlog;


/**
 * @for Remove Blog using blog id
 * @param {req, res, blogId}
 * @return {blogId} The result of delete blog_id. 
*/
const removeBlog = async function(req, res) {
  let err, data;

  const blogId = req.params.id;

  [err, data] = await to(
    Blog.destroy({
      where: {
        id: blogId
      }
    })
  );

  if (err) {
    return ReE(res, err, 422);
  }

  return ReS(res,{
      Blog_id: blogId,
      message: "Blog Deleted Successfully."
    },200);
};
module.exports.removeBlog = removeBlog;


/**
 * @for Update Blog using id
 * @param {req, res, id}
 * @return {blog_Data} The result of updated blog 
*/
const blogUpdate = async function(req, res) {
  let err, data;

  let blogId = req.params.id;
  let blogBody = req.body;

  if (!blogBody.title) {
    return ReE(res, { success: false, message: "Title is required." }, 401);
  }

  if (!blogBody.description) {
    return ReE(res,
      { success: false, message: "Description is required." },401);
  }

  if (req.file) {
    blogBody.imgUrl = req.file.url;
  }

  [err, data] = await to(Blog.findById(blogId));

  if (err) {
    return ReE(res, err, 422);
  }

  [err, data] = await to(data.update(blogBody));

  if (err) {return ReE(res, err, 422);}

  return ReS(res,{
      blog_Data: data,
      message: "Blog updated successfully."
    },200);
};
module.exports.blogUpdate = blogUpdate;


/**
 * @for Delete Image on blog using id
 * @param {req, res, id}
 * @return {blogId}
*/
const deleteImage = async function(req, res) {
  let err, data;
  const blogId = req.params.id;

  [err, data] = await to(Blog.findById(blogId));

  if (err) {
    return ReE(res, err, 422);
  }

  cloudinary.v2.uploader.destroy(data.public_id, function(error, result) {
    console.log("17-error--", error);
    console.log("18-result--", result);
  });

  [err, data] = await to(
    Blog.update(
      {
        imgUrl: null
      },
      {
        where: { id: blogId }
      }
    )
  );
  if (err) { return ReE(res, err, 422); }

  return ReS(
    res,{
      Blog_id: blogId,
      message: "Image Removed Successfully."
    },200);
};

module.exports.deleteImage = deleteImage;
