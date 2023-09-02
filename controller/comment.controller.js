const db = require("../models/index");
const Comment = db.comments;

exports.create = (req, res) => {  
    const {name, email, comment, postId} = req.body;

    const comments = {
      name,
      email,
      comment,
      postId: postId ? postId : null
    };
  
    Comment.create(comments)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Comment."
        });
    });
};

exports.findAll = (req, res) => {
    Comment.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err. message || "error occurred in Comments"
        })
    })
};

exports.findOne = (req, res) => {
  const id = req.params.id;

    Comment.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Comment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id
      });
    })
};

exports.update = (req, res) => {
  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Comment with id=" + id
      });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id
      });
  });
};