const notificationList = document.querySelector('.notification__container');

const config = {
    success : {
        img : '../assets/image/main/mark.png',
        title : 'Thành công',
        className : 'success'
    },

    warning : {
        img : '../assets/image/main/warning.png',
        title : 'Cảnh báo',
        className : 'warning'
    },

    error : {
        img : '../assets/image/main/error.png',
        title : 'Lỗi',
        className : 'error'
    }
}

function createNotification(type, message, time) {

    const thisNotificationType = config[type];

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.classList.add(thisNotificationType.className);

    const imgIcon = document.createElement('div');
    imgIcon.className = 'notification__img';

    const img = document.createElement('img');
    img.src = thisNotificationType.img;

    imgIcon.appendChild(img);

    const info = document.createElement('div');
    info.className = 'notification__info';

    const notiTitle = document.createElement('h4');
    notiTitle.textContent = thisNotificationType.title;

    const notiMessage = document.createElement('p');
    notiMessage.textContent = message;

    info.appendChild(notiTitle);
    info.appendChild(notiMessage);

    const timeBar = document.createElement('div');
    timeBar.className = 'time__bar';

    const infoDiv = document.createElement('div')
    infoDiv.className = 'info__container'

    infoDiv.appendChild(
        imgIcon
    )
    infoDiv.appendChild(
        info
    )

    notification.appendChild(infoDiv);
    notification.appendChild(timeBar);

    notificationList.append(notification);

    setTimeout(() => {
        notification.remove();
    }, time)
}

function addNotification (type, message, time) {
    const list = JSON.parse(localStorage.getItem('notis')) || [];
    list.push({
        type,
        message,
        time
    });
    localStorage.setItem('notis', JSON.stringify(list));
}

function removeNotification () {
    const list = JSON.parse(localStorage.getItem('notis')) || [];
    const [,...newList] = list;
    console.log('newList', newList)
    localStorage.setItem('notis', JSON.stringify(newList));
}

function renderNextNoti () {
    let list = JSON.parse(localStorage.getItem('notis')) || [];
    console.log(list)
    if (list && list.length !== 0) {
        const noti = list[0];
        const { type, message, time } = noti;
        createNotification(type, message, time);
        
        setTimeout(() => {
            removeNotification();
            renderNoti()
        }, 100)
    }
}

function renderNoti () {
    setTimeout(renderNextNoti, 1);
}

renderNoti();