window.me = {
    set : (user) => {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    },

    get : () => {
        return JSON.parse(sessionStorage.getItem('currentUser')) || null;
    },

    remove : () => {
        sessionStorage.removeItem('currentUser');
    },
}