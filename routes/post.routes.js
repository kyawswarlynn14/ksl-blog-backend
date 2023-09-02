module.exports = app => {
    const posts = require("../controller/post.controller");
  
    var router = require("express").Router();
    
    router.get("/", posts.findAll);

    router.get("/recent", posts.recentPosts);

    router.get("/categoryposts/:categoryId", posts.categoryPosts);

    router.get("/featured", posts.featuredPosts);
    
    router.get("/:id", posts.findOne);
  
    router.put("/:id", posts.update);
  
    router.delete("/:id", posts.delete);
  
    app.use('/api/posts', router);
};