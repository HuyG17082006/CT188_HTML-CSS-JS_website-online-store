const confirmBox = document.querySelector('.covered');
const confirmBtn = confirmBox.querySelector('.confirm');
const cancelBtn = confirmBox.querySelector('.cancel');
const confirmDesc = confirmBox.querySelector('.confirm__desc');
const confirmTitle = confirmBox.querySelector('.confirm__title');

function showConfirmBox (fn, title = '', message = '') {
    confirmBox.classList.remove('is-hidden');
    confirmTitle.innerText = title;
    confirmDesc.innerText = message;
    confirmBtn.onclick = () => confirm(fn);
    cancelBtn.onclick = () => closeConfirmBox();
}

function closeConfirmBox () {
    confirmBox.classList.add('is-hidden');
}

function confirm (fn) {
    if (typeof fn === 'function')
        fn();
    closeConfirmBox();
}

confirmBox.addEventListener('click', (e) => {
    if (e.target.className === 'covered')
        closeConfirmBox()
});
