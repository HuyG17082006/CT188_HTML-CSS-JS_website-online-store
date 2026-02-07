window.helper = {
    debounce (callback, delay) {
        let timer = null;

        return function (e) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(e);
            }, delay)
        }
    }
}