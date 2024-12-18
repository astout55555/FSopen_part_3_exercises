import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { useEffect } from 'react';
import phonebookService from './services/phonebook';
import Notification from './components/Notification';

import petsService from './services/pets';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [pets, setPets] = useState([]);

  const fetchInitialPersonsHook = () => {
    phonebookService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
        setFilteredPersons(initialPersons);
    });
  }

  const fetchPetsHook = () => {
    petsService.getPets()
      .then(retrievedPets => {
        setPets(retrievedPets);
    });
  }

  useEffect(fetchInitialPersonsHook, []);

  useEffect(fetchPetsHook, []);

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Notification message={successMessage} type='success'/>
        <Notification message={errorMessage} type='error'/>
        <Filter persons={persons}
          setFilteredPersons={setFilteredPersons}/>

        <h2>add a new</h2>
        <PersonForm persons={persons}
          setPersons={setPersons}
          setFilteredPersons={setFilteredPersons}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}/>

        <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons}
          setFilteredPersons={setFilteredPersons}/>
      </div>
      <div>
        <h2>Pets</h2>
        {pets}
      </div>    
    </>
  )
}

export default App;