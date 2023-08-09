const router = require('express').Router()
const Comment = require('../../models/Comment')
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    })
    res.status(200).json(commentData)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll()

    !commentData
      ? res.status(404).json({ message: 'No comments found' })
      : res.status(200).json(commentData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:comment_id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.comment_id)

    !commentData
      ? res.status(404).json({ message: 'No comment found with this id!' })
      : res.status(200).json(commentData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:comment_id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.comment_id)

    if (!commentData) {
      return res.status(404).json({ message: 'No comment found with this id!' })
    }

    if (commentData.user_id !== req.session.user_id) {
      return res
        .status(403)
        .json({ message: "You don't have permission to edit this comment." })
    }

    await commentData.update(req.body)

    res.status(200).json({ message: 'Comment updated successfully.' })
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:comment_id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.comment_id)

    if (!commentData) {
      return res.status(404).json({ message: 'No comment found with this id!' })
    }

    if (commentData.user_id !== req.session.user_id) {
      return res
        .status(403)
        .json({ message: "You don't have permission to delete this comment." })
    }

    await commentData.destroy()

    res.status(200).json({ message: 'Comment deleted successfully.' })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
