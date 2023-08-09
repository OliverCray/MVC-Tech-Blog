const bcrypt = require('bcrypt')
const { User } = require('../models')

const userData = [
  {
    name: 'alice_smith',
    password: 'SecurePass123',
  },
  {
    name: 'bob_johnson',
    password: 'StrongPassword456',
  },
  {
    name: 'charlie_brown',
    password: 'SuperSecret789',
  },
  {
    name: 'david_lee',
    password: 'Secret123',
  },
  {
    name: 'ella_williams',
    password: 'MyPassword456',
  },
  {
    name: 'frank_miller',
    password: 'Secure789',
  },
  {
    name: 'grace_davis',
    password: 'SecretPass123',
  },
  {
    name: 'henry_clark',
    password: 'Strong123',
  },
  {
    name: 'isabella_martinez',
    password: 'Secure456',
  },
  {
    name: 'jack_wilson',
    password: 'MySecret789',
  },
]

const seedUsers = async () => {
  const hashedUserData = await Promise.all(
    userData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      return {
        name: user.name,
        password: hashedPassword,
      }
    })
  )

  await User.bulkCreate(hashedUserData)
}

module.exports = seedUsers
