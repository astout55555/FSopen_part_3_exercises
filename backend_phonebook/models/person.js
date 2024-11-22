const mongoose = require('mongoose');
console.log('mongoose required');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URL;
mongoose.connect(url);

const validPhonePattern = /^\d{2,3}-\d{4,}$/

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: validPhonePattern,
  }, // come back to add more complicated validation in next step...
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);