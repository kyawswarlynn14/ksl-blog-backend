const db = require("../models/index");
const Post = db.posts;
const Comment = db.comments;
const Category = db.categories;
const Author = db.authors;

exports.findAll = (req, res) => {
    Post.findAll({
        include: [
            {
                model: Comment,
                as: 'comments',
                group: ['comments.postId']
            },
            {
              model: Category
            },
            {
              model: Author
            }
        ]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err. message || "error occurred in Posts"
        })
    })
};

exports.recentPosts = (req, res) => {
    Post.findAll({
      order: [['createdAt', 'DESC']],
      limit: 3,
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred in RecentPosts"
      })
    })
};

exports.categoryPosts = (req, res) => {
  const categoryId = req.params.categoryId;
  Post.findAll({ 
    where: {categoryId: categoryId},
    include: [
      {
          model: Comment,
          as: 'comments',
          group: ['comments.postId']
      },
      {
        model: Category
      },
      {
        model: Author
      }
  ]
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "error occurred in RecentPosts"
    })
  })
};

exports.featuredPosts = (req, res) => {
  Post.findAll({ 
    where: {featured: true},
    include: [
      {model: Author}
    ]
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "error occurred in RecentPosts"
    })
  })
};

exports.findOne = (req, res) => {
  const id = req.params.id;

    Post.findByPk(id, {
        include: [
            {
                model: Comment,
                as: 'comments',
                group: ['comments.postId']
            },
            {
              model: Category
            },
            {
              model: Author
            }
        ]
    })
    
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Post with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id
      });
    })
};

exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
  });
};