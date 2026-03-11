const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  subCategory: {
    type: String
  },

  description: {
    type: String
  },

  stock: {
    type: Number,
    default: 0
  },

  isVisible: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Product", ProductSchema)