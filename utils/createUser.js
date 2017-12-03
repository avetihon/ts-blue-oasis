require('../app/settings').load();
const db = require('../app/databaseWrapper/DatabaseConnector');
const url = require('../app/databaseWrapper/URL').build();
const User = require('../api/models/User');
const DATABASE_EVENT_LIST = require('../app/constants/DatabaseEventList');

db.registerModel(User);
db.connect(url);
db.on(DATABASE_EVENT_LIST.OPEN, () => {
    let user = new User({ username: 'Yevgeniy', password: 'qwerty' });
    user.signUp().then((user) => {
        console.log(`Success user creating ${user}`);

        process.exit(0);
    }).catch((error) => {
        console.error(error);

        process.exit(1);
    });
});


