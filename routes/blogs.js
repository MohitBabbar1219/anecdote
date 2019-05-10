const router = require('express').Router();
const passport = require('passport');

const validatePostInput = require('./../helpers/blogValidations');

const Blog = require('./../models/Blog');
const Comment = require('./../models/Comment');

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

router.get('/group_by_date', (req, res) => {
  Blog.aggregate([
    {$group:
        {
          _id:
            {
              day: {$dayOfMonth: "$date"},
              month: {$month: "$date"},
              year: {$year: "$date"}
            },
          // total: {$sum: "$data"},
          count: {$sum: 1},
          posts: { $push:  { title: "$title", id: "$_id" } }
        }
    },
    {$sort: {count: 1}}
  ]).then(posts => {
    res.json({posts});
  }).catch(err => res.status(404).json('couldn\'t get the blog posts'));
});

router.get('/', (req, res) => {
  Blog.find({}).populate('user').sort({date: -1}).then(posts => {
    res.json({posts});
  }).catch(err => res.status(404).json('couldn\'t get the blog posts'));
});

router.get('/my_blogs', passport.authenticate('jwt', {session: false}), (req, res) => {
  Blog.find({user: req.user.id}).populate('user').sort({date: -1}).then(posts => {
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
          Comment.deleteMany({blog: post.id}).then(deletedComments => console.log(deletedComments));
          post.remove().then(() => res.status(200).json({deleted: true, deletedPost: postToBeDeleted}));
        }
      } else {
        return res.status(404).json({post: 'blog post with this id does not exist'});
      }
    }).catch(err => res.status(404).json('couldn\'t delete the blog post'));
});

router.post('/:id/comment', passport.authenticate('jwt', {session: false}), (req, res) => {
  Blog.findById(req.params.id).then(post => {
    if (post) {
      const newComment = new Comment({
        user: req.user.id,
        text: req.body.text,
        parentId: post.id,
        blog: post.id,
        onModel: 'blogs',
      });
      newComment.save().then(comment => res.json(comment));
    } else {
      return res.status(404).json({post: 'blog post with this id does not exist'});
    }
  }).catch(err => res.status(404).json('couldn\'t comment on the blog post'));
});

router.get('/:id/comments', (req, res) => {
  Comment.find({blog: req.params.id}).then(comments => {
    if (comments) {
      res.json(comments);
    } else {
      return res.status(404).json({comments: 'blog post with this id does not have any comments'});
    }
  }).catch(err => res.status(404).json('couldn\'t fetch comments of the blog post'));
});

module.exports = router;