import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, 'Too few characters'],
    maxLength: [20, 'Too many characters']
  },
  password: {
    type: String,
    required: true,
    minLength: [5, 'Too few characters'],
    maxLength: [100, 'Too many characters']
  },
  snippets: [
    {
      title: String,
      textcontent: String,
      created_at: Date
    }
  ]
}, {
  timestamps: true
})

/**
 * Hashes the password string.
 *
 * I did not use "pre.save()", because I did not have time
 * to re-write my queries to use update() intead of save().
 *
 * @param {string} password The password to be hashed.
 * @returns {string} The hashed password.
 */
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 8)
}

/**
 * Searches the database for a user based on the username,
 * then tries to see if the user was found and if the passwords match.
 *
 * @param {string} username The username of the user.
 * @param {string} password The password of the user.
 * @returns {object} The user object from the database.
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }
  return user
}

export const User = mongoose.model('User', userSchema)
