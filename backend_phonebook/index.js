require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('dist'));

const cors = require('cors');

app.use(cors());

app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
}

app.use(requestLogger);

const morgan = require('morgan');

morgan.token('body', (request) => {
  return JSON.stringify(request.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// let persons = [
//   { 
//     "id": "1",
//     "name": "Arto Hellas", 
//     "number": "040-123456"
//   },
//   { 
//     "id": "2",
//     "name": "Ada Lovelace", 
//     "number": "39-44-5323523"
//   },
//   { 
//     "id": "3",
//     "name": "Dan Abramov", 
//     "number": "12-43-234345"
//   },
//   { 
//     "id": "4",
//     "name": "Mary Poppendieck", 
//     "number": "39-23-6423122"
//   },
// ];

const Person = require('./models/person');

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response) => {
  const totalPeople = persons.length;
  const currentDate = new Date();
  response.send(
    `<div>
      <p>Phonebook has info for ${totalPeople} people</p>
      <p>${currentDate}</p>
    </div>`
  );
});

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons);
    })
    .catch(error => {
      console.error(`Error: ${error.message}`);
    });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => response.json(person))
    .catch(error => {
      console.error(`Error: ${error.message}`);
  });
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

function generateID() {
  const newID = Math.floor(Math.random() * 999999999).toString();
  console.log(newID);
  return newID;
}

// function isUnique(name) {
//   let names = persons.map(person => person.name);
//   return !names.includes(name);
// }

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and/or number is missing'
    });
  } 
  // else if (!isUnique(body.name)) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   });
  // }

  const person = new Person({
    // id: generateID(),
    name: body.name,
    number: body.number,
  });

  // persons = persons.concat(person);

  person.save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch(error => {
      console.error(`Error: ${error.message}`);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

const PORT = process.env.PORT; // || 3001 removed, relying on .env and secrets
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});