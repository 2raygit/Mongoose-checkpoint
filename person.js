const mongoose = require('mongoose');
// schema de person
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  });
  // creation du model person
  const Person = mongoose.model('Person',personSchema);
  module.exports= Person ;