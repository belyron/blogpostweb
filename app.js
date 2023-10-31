const express = require('express');
const app = express();
const port = 8000;

const blogPosts = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', { blogPosts });
});


app.get('/new', (req, res) => {
  res.render('new');
});


app.post('/blog', (req, res) => {
  const { title, content } = req.body;
  const id = blogPosts.length + 1; 
  blogPosts.push({ id, title, content });
  res.redirect('/');
});

app.get('/blog/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blogPost = blogPosts.find(post => post.id === id);
  if (blogPost) {
    res.render('post', { blogPost });
  } else {
    res.status(404).send('Blog post not found.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
