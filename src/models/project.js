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
    maxLength: 200
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

  // ^^ Is this needed??
  // toObject: {
  //   // By setting the virtuals property to true, you can ensure that the id virtual field is included in the object representation of the Mongoose document, even though it is not stored in the database.
  //   virtuals: true, // ensure virtual fields are serialized
  //   /**
  //    * Performs a transformation of the resulting object to remove sensitive information.
  //    *
  //    * @param {object} doc - The mongoose document which is being converted.
  //    * @param {object} ret - The plain object representation which has been converted.
  //    */
  //   // Deletes _id and _v from the returned object. They exist in the database, but not in the code that we get back from the database
  //   transform: function (doc, ret) {
  //     delete ret._id
  //     delete ret.__v
  //   }
  // }
})

// ^^ Is this needed??
// // The schema.virtual('id') line creates a virtual property id for the Mongoose schema. A virtual property is a property that is not stored in the database, but computed on the fly when you access it
// schema.virtual('id').get(function () {
//   return this._id.toHexString()
// })

// Create a model using the schema.
export const Project = mongoose.model('Project', schema)
