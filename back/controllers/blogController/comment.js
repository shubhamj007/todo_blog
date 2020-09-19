const model = require("./../../models");


/**
 * @For Comments on blog
 * @param  {req, res}
 * @returns {blogId, userId, comment} The result of comment details.
*/
const comment = async (req, res)=> {
  let err, cmnt;
  const comment = req.body;
  comment.userId = req.user.id;
  const created_at = new Date();

  if(!comment.comment){
    return ReE(res, { success: false, message: "Comment is required." }, 401);
  }
  if(!comment.blogId){
    return ReE(res, { success: false, message: "BlogId is required." }, 401);
  }
  [err, cmnt] = await to(model.Comments.create(comment, created_at));
   
  return ReS(res, { message: "Comment Post Successfully.", Comment: cmnt }, 200);
       
};
module.exports.comment = comment;


/**
 * @For Get Comment List
 * @param  {req, res}
 * @returns {commentList} The result of comments list.
*/
const commentList = async (req, res)=> {
    let err, cmnts;
    [err, cmnts] = await to(model.Comments.findAll());
     
    return ReS(res, {Comments: cmnts }, 200);       
  };
module.exports.commentList = commentList;
  

/**
 * @For Delete Comment
 * @param  {req, res}
*/
const deleteComment = async (req, res)=> {
  let err, cmnts;
  const cmntsId = req.params.id;
  [err, data] = await to(
    model.Comments.findById(cmntsId)
    );
    if(err){
      return ReE(res, err, 422);
    }

  [err, cmnts] = await to(model.Comments.destroy({where:  {id: cmntsId}}));
   
  return ReS(res, { message: 'Comment Deleted' }, 200);
       
};
module.exports.deleteComment = deleteComment;