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
    notification.className = `notification ${thisNotificationType.className}`;
    notification.innerHTML = `
        <div class="info__notification__container">
            <div class="notification__img">
                <img src="${thisNotificationType.img}">
            </div>

            <div class="notification__info">
                <h4>${thisNotificationType.title}</h4>
                <p>${message}</p>
            </div>
        </div>

        <div class="time__bar"></div>
    `;
    const timeBar = notification.querySelector(".time__bar");
    timeBar.style.animationDuration = time + "ms";
    notificationList.append(notification);

    setTimeout(() => {
        notification.remove();
    }, time);
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
    localStorage.setItem('notis', JSON.stringify(newList));
}

function renderNextNoti () {
    let list = JSON.parse(localStorage.getItem('notis')) || [];
    
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