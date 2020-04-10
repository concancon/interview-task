const monk = require('monk');
//const connectionString = process.env.MONGODB_URI || 'localhost/somethingNew';


// Connection URL. 27017 is the port that the mongo service is listening on
const url = 'localhost:27017/myproject';
const db = monk(url);


db.then(() => {
    console.log('Connected to server')

})
 
module.exports = db;