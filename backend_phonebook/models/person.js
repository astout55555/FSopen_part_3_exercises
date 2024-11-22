const mongoose = require('mongoose');
console.log('mongoose required');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URL;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// if (process.argv.length === 3) {
//   Person.find({}).then(result => {
//     console.log('Phonebook:');
//     result.forEach(person => {
//       console.log(`${person.name} ${person.number}`);
//     });

//     mongoose.connection.close();
//   });
// } else {
//   const newPersonName = process.argv[3];
//   const newPersonNumber = process.argv[4];

//   const newPerson = new Person({
//     name: newPersonName,
//     number: newPersonNumber
//   });

//   newPerson.save().then(result => {
//     console.log('Person saved!');
//     console.log(`Result of operation: ${result}`);
//     mongoose.connection.close();
//   });
// }

module.exports = mongoose.model('Person', personSchema);