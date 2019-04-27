const router = require('express').Router();
const passport = require('passport');

const populationPathEh = require('./../helpers/getPopulationPath').populatePathEh;

const Blog = require('./../models/Blog');
const Comment = require('./../models/Comment');


router.get('/:id', (req, res) => {
  Comment.findById(req.params.id).then(comment => {
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
        of: comment.id,
        blog: comment.blog,
        onModel: 'comments',
      });
      comment.comments.push({comment: newComment.id});
      Promise.all([comment.save(), newComment.save()]).then(values => res.json(values[1]));
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

router.get('/of_blog_threaded/:blogId', (req, res) => {
  Comment.find({of: req.params.blogId}).populate(populationPathEh).then(comments => {
    if (comments) {
      res.json(comments);
    } else {
      return res.status(404).json({comments: 'blog post with this id does not have any comments'});
    }
  }).catch(err => res.status(404).json('couldn\'t fetch comments of the blog post'));
});
module.exports = router;