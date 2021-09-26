const { LocalStorage } = require('node-localstorage');

const db1 = new LocalStorage('data-a-m');
const db2 = new LocalStorage('data-m-z');
// const db = new LocalStorage('data');

const whichDB = (name) => {
  let regex = name.match(/^[A-M]|^[a-m]/);
  console.log(regex);
  return regex ? db1 : db2;
};

const loadPersons = (db) => JSON.parse(db.getItem('persons') || '[]');

const hasPerson = (name) =>
  loadPersons(whichDB(name))
    .map((person) => person.name)
    .includes(name);

module.exports = {
  addPerson(newPerson) {
    if (!hasPerson(newPerson.name)) {
      let db = whichDB(newPerson.name);
      console.log(db._location);
      let persons = loadPersons(db);
      persons.push(newPerson);
      db.setItem('persons', JSON.stringify(persons, null, 2));
    }
  },
  findPersonByName(name) {
    let db = whichDB(name);
    let persons = loadPersons(db);
    return persons.find((person) => person.name === name);
  },
  findPersonByAge(age) {
    let persons = [...loadPersons(db1), ...loadPersons(db2)];
    return persons.filter((person) => person.age === age);
  },
};
