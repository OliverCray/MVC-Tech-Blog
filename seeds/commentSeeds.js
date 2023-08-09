const { Comment } = require('../models')

const commentData = [
  {
    body: 'Great post! I found your explanation of recursion in Python very helpful. Thanks for sharing!',
    user_id: 3,
    post_id: 1,
  },
  {
    body: "I have a different approach to solving that problem using dynamic programming. Let me know if you're interested!",
    user_id: 1,
    post_id: 2,
  },
  {
    body: 'In my experience, using a CSS framework like Bootstrap can greatly simplify front-end development.',
    user_id: 2,
    post_id: 3,
  },
  {
    body: "I've encountered a similar issue before. Have you checked your database configuration? That might be the cause.",
    user_id: 4,
    post_id: 4,
  },
  {
    body: "Here's a helpful resource I came across that explains advanced JavaScript concepts in a clear and concise manner.",
    user_id: 5,
    post_id: 5,
  },
  {
    body: 'What are the key features of the latest version of React? I want to stay up-to-date with the latest changes.',
    user_id: 3,
    post_id: 6,
  },
  {
    body: 'Any recommendations for online resources to learn TypeScript? I want to level up my JavaScript skills.',
    user_id: 4,
    post_id: 7,
  },
  {
    body: 'I am struggling with CSS Flexbox. Can someone explain the concept of flex containers and items?',
    user_id: 5,
    post_id: 8,
  },
  {
    body: 'Looking for advice on optimizing database queries for large datasets. Any best practices?',
    user_id: 1,
    post_id: 9,
  },
  {
    body: 'What are some popular design systems and UI component libraries for building modern web applications?',
    user_id: 2,
    post_id: 10,
  },
]

const seedComments = () => Comment.bulkCreate(commentData)

module.exports = seedComments
