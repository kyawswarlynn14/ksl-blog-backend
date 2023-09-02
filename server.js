const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
var corsOptions = {origin: "*"};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
const upload = multer({ dest: 'uploads/' });

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get('/', (req, res) => {
  res.send('hello from ksl-backend')
})

require("./routes/author.routes")(app);
require("./routes/category.routes")(app);
require("./routes/post.routes")(app);
require("./routes/comment.routes")(app);

app.post("/api/authors", upload.single('photo'), async (req, res) => {
  try {
    const { name, bio } = req.body;
    const author = await db.authors.create({
      name,
      bio,
      photo: req.file.filename,
    });

    res.status(201).json({
      status: "success",
      data: {
        author,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the author.",
    });
  }
});

app.post("/api/posts", upload.single('photo'), async (req, res) => {
  try {
    const { title, excerpt, content, featured, authorId, categoryId } = req.body;
    const post = await db.posts.create({
      title,
      excerpt,
      content,
      featured: featured ? featured : true,
      authorId: authorId ? authorId : null,
      categoryId: categoryId ? categoryId : null,
      photo: req.file.filename,
    });

    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the post.",
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port 8080.`);
});
