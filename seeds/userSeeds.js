const { User } = require('../models')

const userData = [
  {
    name: 'Alice Smith',
    password: 'SecurePass123',
  },
  {
    name: 'Bob Johnson',
    password: 'StrongPassword456',
  },
  {
    name: 'Charlie Brown',
    password: 'SuperSecret789',
  },
  {
    name: 'David Lee',
    password: 'Secret123',
  },
  {
    name: 'Ella Williams',
    password: 'MyPassword456',
  },
  {
    name: 'Frank Miller',
    password: 'Secure789',
  },
  {
    name: 'Grace Davis',
    password: 'SecretPass123',
  },
  {
    name: 'Henry Clark',
    password: 'Strong123',
  },
  {
    name: 'Isabella Martinez',
    password: 'Secure456',
  },
  {
    name: 'Jack Wilson',
    password: 'MySecret789',
  },
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers
