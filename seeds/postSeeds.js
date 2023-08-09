const { Post } = require('../models')

const postData = [
  {
    title: 'Handling Exceptions in Python',
    body: "I'm struggling with handling exceptions in my Python code. Any tips or resources to improve my understanding?",
    user_id: 1,
  },
  {
    title: 'JavaScript Data Visualizations',
    body: 'Which JavaScript libraries do you recommend for creating interactive and visually appealing data visualizations?',
    user_id: 2,
  },
  {
    title: 'Getting Started with Node.js',
    body: "I'm new to Node.js and want to learn how to set up a basic server. Any tutorials or guides you'd recommend?",
    user_id: 3,
  },
  {
    title: 'Exploring React Hooks',
    body: "Hooks have changed the way we write React components. Let's discuss the different types of hooks and their use cases.",
    user_id: 4,
  },
  {
    title: 'Best Practices for API Design',
    body: "As a backend developer, I'm looking for tips on designing robust and user-friendly APIs. Share your experiences and suggestions!",
    user_id: 5,
  },
  {
    title: 'Introduction to Machine Learning',
    body: 'Machine learning is a fascinating field with a lot of potential applications. Can someone provide an overview of the key concepts?',
    user_id: 1,
  },
  {
    title: 'CSS Grid Layout Explained',
    body: "CSS Grid is a powerful layout system that allows for complex designs. Let's dive into the fundamentals and practical examples.",
    user_id: 2,
  },
  {
    title: 'Deploying a Web App with Docker',
    body: 'Docker is a popular tool for containerization. Learn how to containerize and deploy a web application using Docker.',
    user_id: 3,
  },
  {
    title: 'Introduction to Vue.js',
    body: 'Vue.js is gaining popularity as a progressive JavaScript framework. What are its core features, and how does it compare to other frameworks?',
    user_id: 4,
  },
  {
    title: 'Exploring the Benefits of GraphQL',
    body: "GraphQL is an alternative to REST APIs. Let's discuss its advantages and scenarios where it might be a better choice.",
    user_id: 5,
  },
]

const seedPosts = () => Post.bulkCreate(postData)

module.exports = seedPosts
