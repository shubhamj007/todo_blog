const model = require("./../../models");
const likes = async (req, res) => {
  let err, like;
  let likeBlog = req.body;
  likeBlog.userId = req.user.id;
  [err, like] = await to(
    model.likes.find({ where: { blogId: likeBlog.blogId, userId:req.user.id} })
    );
  if ( like.count == 0) {
    likeBlog.count = 1;
    [err, like] = await to(model.likes.create(likeBlog));
  } else {
    likeBlog.count = 0;
    [err, like] = await to(model.likes.update(likeBlog));
  }
  return ReS(res, { Like: like }, 200);
};
module.exports.likes = likes;
