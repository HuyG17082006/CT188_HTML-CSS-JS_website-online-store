const userMongoDb = window.mongoDb

window.userRepo = {
    findByUsername : (username) => {
        return userMongoDb.findOne('users', 'username', username);
    },
    findByEmail : (email) => {
        return userMongoDb.findOne('users', 'email', email);
    },
    insert : (user) => {
        userMongoDb.insertOne('users', user);
    },
    update : (userId, newUser) => {
        userMongoDb.replaceOne('users', 'id', userId, newUser)
    }
}