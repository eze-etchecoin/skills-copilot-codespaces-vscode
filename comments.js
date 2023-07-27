// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create an express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Store all comments
const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // Get comments for a post
  const comments = commentsByPostId[req.params.id] || [];
  // Add new comment
  comments.push({ id: commentId, content });
  // Store comments
  commentsByPostId[req.params.id] = comments;

  // Return comments
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});