const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
  },
  "price-be": {
    type: Number,
    min: 0,
    max: 5000,
  },
  "price-af": {
    type: Number,
    min: 0,
    max: 5000,
  },
  description: {
    type: String,
    minLength: 10,
    maxLength: 600,
  },
  status: {
    type: Boolean,
  },
});

module.exports = Product;
