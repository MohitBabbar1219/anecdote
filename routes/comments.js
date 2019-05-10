const router = require('express').Router();
const passport = require('passport');

const populationUserPathEh = require('./../helpers/getPopulationPath').populateUserPathEh;

const Comment = require('./../models/Comment');


router.get('/:id', (req, res) => {
  Comment.findById(req.params.id).populate('user').then(comment => {
    if (comment) {
      return res.json(comment);
    } else {
      return res.status(404).json({blog: 'comment with this id does not exist'});
    }
  }).catch(err => res.status(404).json('couldn\'t get the comment'));
});

router.post('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Comment.findById(req.params.id).then(comment => {
    if (comment) {
      const newComment = new Comment({
        user: req.user.id,
        text: req.body.text,
        parentId: comment.id,
        blog: comment.blog,
        onModel: 'comments',
      });
      newComment.save().then(comment => res.json(comment));
    } else {
      return res.status(404).json({comment: 'comment with this id does not exist'});
    }
  }).catch(err => res.status(404).json('couldn\'t get the comment'));
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Comment.findById(req.params.id).then(comment => {
    if (comment) {
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({message: 'user not authorized'});
      } else {
        comment.text = '[removed]';
        comment.save().then(deletedComment => res.json(deletedComment))
      }
    } else {
      return res.status(404).json({post: 'comment with this id does not exist'});
    }
  }).catch(err => res.status(404).json('couldn\'t delete the comment'));
});

router.get('/of_blog/:blogId', (req, res) => {
  Comment.find({blog: req.params.blogId}).sort({date: 1}).then(comments => {
    if (comments) {
      res.json(comments);
    } else {
      return res.status(404).json({comments: 'blog post with this id does not have any comments'});
    }
  }).catch(err => res.status(404).json('couldn\'t fetch comments of the blog post'));
});

router.get('/of_blog_threaded/:blogId', (req, res) => {
  Comment.find({blog: req.params.blogId}).populate('user').sort({date: 1}).then(comments => {
    if (comments) {
      const roots = [], all = {};
      comments.forEach(comment => {
        const heh = {
          _id: comment.id,
          user: comment.user,
          text: comment.text,
          parentId: comment.parentId,
          blog: comment.blog,
          onModel: comment.onModel,
          date: comment.date,
          comments: []
        };
        all[heh._id] = heh;
        if (comment.parentId.toString() === comment.blog.toString()) {
          roots.push(heh);
        } else {
          all[heh.parentId].comments.push(heh);
        }
      });
      res.json(roots.reverse());
    } else {
      return res.status(404).json({comments: 'blog post with this id does not have any comments'});
    }
  }).catch(err => res.status(404).json('couldn\'t fetch comments of the blog post'));
});

module.exports = router;