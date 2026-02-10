(() => {
    const head = document.head;

    const webIcon = document.createElement('link');
    webIcon.rel = 'icon'
    webIcon.href = '../assets/image/main/logoStore.png'
    webIcon.type = 'image/png'
    head.appendChild(webIcon);

    const iconImportant = [
        '../assets/image/main/logoStore.png',
        '../assets/image/main/warning.png',
        '../assets/image/main/error.png',
        '../assets/image/main/mark.png'
    ]

    iconImportant.forEach(imageSrc => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = imageSrc;
        head.appendChild(link);
    })
})();