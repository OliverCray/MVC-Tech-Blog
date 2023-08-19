const router = require('express').Router()
const { Post } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    })

    res.status(200).json(postData)
  } catch (err) {
    console.error(err)
    res.status(400).json(err)
  }
})

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll()

    !postData
      ? res.status(404).json({ message: 'No posts found!' })
      : res.status(200).json(postData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:post_id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.post_id)

    !postData
      ? res.status(404).json({ message: 'No post found with this id!' })
      : res.status(200).json(postData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:post_id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.post_id)

    if (!postData) {
      return res.status(404).json({ message: 'No post found with this id!' })
    }

    // Return 403 if user is not the owner of the post
    // This is to prevent users from editing other users' posts
    if (postData.user_id !== req.session.user_id) {
      return res
        .status(403)
        .json({ message: "You don't have permission to edit this post." })
    }

    if (!req.body.title || !req.body.body) {
      return res
        .status(400)
        .json({ message: 'Title and body must not be blank.' })
    }

    await postData.update({
      title: req.body.title,
      body: req.body.body,
    })

    res.status(200).json({ message: 'Post updated successfully.' })
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:post_id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.post_id)

    if (!postData) {
      return res.status(404).json({ message: 'No post found with this id!' })
    }

    // Return 403 if user is not the owner of the post
    // This is to prevent users from deleting other users' posts
    if (postData.user_id !== req.session.user_id) {
      return res
        .status(403)
        .json({ message: "You don't have permission to delete this post." })
    }

    await postData.destroy()

    res.status(200).json({ message: 'Post deleted successfully.' })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
