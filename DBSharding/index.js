const db = require('./app');

db.addPerson({ name: 'Sanket', age: 23 });
db.addPerson({ name: 'Sarthak', age: 23 });
db.addPerson({ name: 'Bindu', age: 27 });
db.addPerson({ name: 'Megha', age: 27 });
db.addPerson({ name: 'Pooja', age: 23 });
db.addPerson({ name: 'Arthi', age: 23 });

var sanket = db.findPersonByName('Sanket');
var twenty3s = db.findPersonByAge(23);
console.log(sanket, twenty3s);

/* mongos can be used for mongodb sharding and clustering https://hevodata.com/learn/implementing-mongodb-sharding-6-easy-steps/
 *  */
