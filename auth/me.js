window.me = {
    set : (user) => {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    },

    get : () => {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    },

    remove : () => {
        sessionStorage.removeItem('currentUser');
    },
}