const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');

const validatePostInput = require('./../helpers/blogValidations');

const Blog = require('./../models/Blog');

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Blog({
    text: req.body.text,
    title: req.body.title,
    user: req.user.id
  });
  newPost.save().then(post => res.json(post));
});

router.get('/', (req, res) => {
  Blog.find({}).populate('user').sort({date: -1}).then(posts => {
    res.json({posts});
  }).catch(err => res.status(404).json('couldn\'t get the blog posts'));
});

router.get('/:id', (req, res) => {
  Blog.findById(req.params.id).then(post => {
    if (post) {
      return res.json(post);
    } else {
      return res.status(404).json({blog: 'blog post with this id does not exist'});
    }
  }).catch(err => res.status(404).json('couldn\'t get the posts'));
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Blog.findById(req.params.id).then(post => {
      if (post) {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({message: 'user not authorized'});
        } else {
          const postToBeDeleted = {...post};
          post.remove().then(() => res.status(200).json({deleted: true, deletedPost: postToBeDeleted}));
        }
      } else {
        return res.status(404).json({post: 'blog post with this id does not exist'});
      }
    }).catch(err => res.status(404).json('couldn\'t delete the blog post'));
});

module.exports = router;