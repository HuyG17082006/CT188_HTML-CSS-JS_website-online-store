const isAdmin = window.me.get().isAdmin;

if (!isAdmin)
    window.location.replace('../view/home.html');

