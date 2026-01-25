const authFormNavigate = document.querySelector('.auth__navigate');
const authFormSignIn = document.querySelector('.auth__form--signIn');
const authFormSignUp = document.querySelector('.auth__form--signUp');

const authSwitchButton = document.querySelector('.auth__switch--button');
const signIn_authButton = document.querySelector('.auth__form--signIn .auth__button');
const signUp_authButton = document.querySelector('.auth__form--signUp .auth__button')

const authNavigateP = document.querySelector('.auth__navigate .auth__p');

const authSpan = document.querySelectorAll('.auth__form .auth__span');

const signIn_authEyeIcon = authFormSignIn.querySelector('.auth__password--active');
const signUp_authEyeIcon = authFormSignUp.querySelector('.auth__password--active');

const signIn_usernameError = authFormSignIn.querySelector('.auth__error--username');
const signIn_passwordError = authFormSignIn.querySelector('.auth__error--password');

const signUp_usernameError = authFormSignUp.querySelector('.auth__error--username');
const signUp_passwordError = authFormSignUp.querySelector('.auth__error--password');
const signUp_emailError = authFormSignUp.querySelector('.auth__error--email');

//dependencies:
const authController = window.authController;

//default :

function resetData () {
    authFormSignIn.reset();
    authFormSignUp.reset();
}

function resetSignInError () {
    signIn_passwordError.textContent='';
    signIn_usernameError.textContent='';
}

function resetSignUpError () {
    signUp_usernameError.textContent='';
    signUp_passwordError.textContent='';
    signUp_emailError.textContent='';
}

//switch Form : sign In <=> sign Up
function switchFormPC (e) {
    e.preventDefault();

    let isSignIn = authFormNavigate.classList.contains('on-right'); 
    
    authNavigateP.textContent = isSignIn ? 'Already have an account?' : "Don't have an account?";
    authSwitchButton.textContent = isSignIn ? 'Sign in' : 'Sign up';

    authFormNavigate.classList.toggle('on-left');
    authFormNavigate.classList.toggle('on-right');

    authFormSignIn.classList.toggle('on-appear');
    authFormSignIn.classList.toggle('on-disappear');

    authFormSignUp.classList.toggle('on-appear');
    authFormSignUp.classList.toggle('on-disappear');

    resetData();
    resetSignInError();
    resetSignUpError();
}

function switchFormMobile () {

    authFormSignIn.classList.toggle('is-seek');
    authFormSignUp.classList.toggle('is-seek');

    resetData();
    resetSignInError();
    resetSignUpError();
}

authSpan.forEach(item => {
    item.addEventListener('click', switchFormMobile)
})

authSwitchButton.addEventListener('click', switchFormPC)

//show password
function showingPassword (form, icon) {
    const passwordInput = form.querySelector('.auth__group--password .auth__input');
    let isShowing = passwordInput.type === 'password';
    passwordInput.type = isShowing ? 'text' : 'password';
    icon.src = isShowing ? "../assets/eye-solid.svg" : "../assets/eye-closed.svg"
}

signIn_authEyeIcon.addEventListener('click', () => showingPassword(authFormSignIn, signIn_authEyeIcon));
signUp_authEyeIcon.addEventListener('click', () => showingPassword(authFormSignUp, signUp_authEyeIcon));

//sign in
function signIn (e) {
    e.preventDefault();
    resetSignInError();

    const form = new FormData(authFormSignIn);

    const username = form.get('username');
    const password = form.get('password');

    const error = authController.signIn(username, password);

    if (error) {
        signIn_passwordError.textContent=error;
        signIn_usernameError.textContent=error;
        return;
    }

    alert("Đăng nhập thành công!");

    window.location.replace('main.html');
}

authFormSignIn.addEventListener('submit', signIn);

//sign up
function signUp (e) {
    e.preventDefault();
    resetSignUpError();
    
    const form = new FormData(authFormSignUp);

    const username = form.get('username');
    const password = form.get('password');
    const email = form.get('email');

    const {nameError, emailError, passwordError} = authController.signUp(username, password, email);

    if (nameError || emailError || passwordError) {
        signUp_usernameError.textContent=nameError;
        signUp_passwordError.textContent=passwordError;
        signUp_emailError.textContent=emailError;
        return;
    }

    alert('Đăng ký thành công!');

    window.location.reload();
}

authFormSignUp.addEventListener('submit', signUp)