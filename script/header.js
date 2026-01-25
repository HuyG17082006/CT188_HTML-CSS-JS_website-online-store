const mobileActionLogin = document.querySelector('.mobile__action--login');
const mobileActionUser = document.querySelector('.mobile__action--user');

const pcActionLogin = document.querySelector('.pc__login--active');
const pcActionUser = document.querySelector('.pc__user--active');

console.log(pcActionLogin)

function isLogin () {
    if (!!me.get()) {
        return true;
    }
    return false;
}

function render () {
    const status = isLogin();

    if (status) {
        mobileActionLogin.classList.toggle('is-hidden');
        mobileActionUser.classList.toggle('is-hidden');
        pcActionLogin.classList.toggle('is-hidden');
        pcActionUser.classList.toggle('is-hidden');
    }  
}

render();
