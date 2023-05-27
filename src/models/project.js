/**
 * Mongoose model Project.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100
  },
  imgURL: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 500
  },
  organization: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50
  },
  text: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 10000
  },
  category: {
    type: Array
  },
  articleURL: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 300
  },
  id: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 200
  }
}, {
  // Automatically adds timestamps (createdAt and updatedAt) to each document.
  timestamps: true
})

// Create a model using the schema.
export const Project = mongoose.model('Project', schema)
