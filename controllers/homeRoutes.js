const router = require('express').Router()
const { Post, User, Comment } = require('../models')
const withAuth = require('../utils/auth')

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1
    const limit = 5

    const offset = limit * (page - 1)

    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      limit: limit,
      offset: offset,
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
      pageNumbers,
      currentPage: parseInt(page),
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
