const userDatabase = window.database

window.userRepo = {
    findByUsername : (username) => {
        return userDatabase.findOne('users', 'username', username);
    },
    findByEmail : (email) => {
        return userDatabase.findOne('users', 'email', email);
    },
    insert : (user) => {
        userDatabase.insertOne('users', user);
    },
    update : (userId, newUser) => {
        userDatabase.replaceOne('users', 'id', userId, newUser)
    }
}