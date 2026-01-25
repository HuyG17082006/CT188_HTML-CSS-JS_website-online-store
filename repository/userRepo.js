const mongoDb = window.mongoDb

window.userRepo = {
    findByUsername : (username) => {
        return mongoDb.findOne('users', 'username', username);
    },
    findByEmail : (email) => {
        return mongoDb.findOne('users', 'email', email);
    },
    insert : (user) => {
        mongoDb.insertOne('users', user);
    },
    update : (userId, newUser) => {
        mongoDb.replaceOne('user', 'userId', userId, newUser)
    }
}