const router = require('express').Router()
const { Post, User, Comment } = require('../models')
const withAuth = require('../utils/auth')

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1
    const limit = 5

    const offset = limit * (currentPage - 1)

    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
    })

    const posts = postData.map((post) => post.get({ plain: true }))

    const totalPosts = await Post.count()
    const totalPages = Math.ceil(totalPosts / limit)

    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
      pageNumbers: pageNumbers.map((pageNumber) => ({
        pageNumber,
        currentPage,
      })),
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET one post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
      order: [[Comment, 'createdAt', 'DESC']],
    })

    const post = postData.get({ plain: true })

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
      session_id: req.session.user_id,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Post,
        },
        {
          model: Comment,
          include: [
            {
              model: Post,
            },
          ],
        },
      ],
      order: [
        [Post, 'createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
    })

    const user = userData.get({ plain: true })

    res.render('dashboard', {
      ...user,
      logged_in: true,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/')
    return
  }

  res.render('login')
})

// GET signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/')
    return
  }

  res.render('signup')
})

module.exports = router
