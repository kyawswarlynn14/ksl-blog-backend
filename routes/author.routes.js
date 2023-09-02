module.exports = app => {
    const authors = require("../controller/author.controller");
  
    var router = require("express").Router();
    
    router.get("/", authors.findAll);
    
    router.get("/:id", authors.findOne);
  
    router.put("/:id", authors.update);
  
    router.delete("/:id", authors.delete);
  
    app.use('/api/authors', router);
};