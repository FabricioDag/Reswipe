const Post = require('../models/Post');
const User = require('../models/User');

// Criar novo post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = new Post({
      author: req.user.userId,
      content,
    });
    await post.save();

    // Atualiza o usuário com o novo post
    //const user = await User.findById(authorId);
    //user.posts.push(post._id);
    //await user.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todos os posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'nome email');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Curtir um post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // acha o id do post em especifico e guarda

    post.likes.push(req.body.userId);
    await post.save();
    res.json(post);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Adicionar comentário a um post
exports.addCommentToPost = async (req, res) => {
  try {
    const { comment, userId } = req.body;
    const post = await Post.findById(req.params.id);
    post.comments.push({ userId, comment });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
