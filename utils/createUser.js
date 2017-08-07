const dotenv = require('dotenv');

const db = require('../databaseWrapper/database');
const User = require('../models/user');

dotenv.config();

db.register(User);
db.connect(process.env.MONGODB_URI);
db.on('open', () => {
    let user = new User({ username: 'Yevgeniy', password: 'qwerty' });
    user.signUp().then((user) => {
        console.log(`Success user creating ${user}`);

        process.exit(0);
    }).catch((error) => {
        console.log(error);

        process.exit(1);
    });
});


