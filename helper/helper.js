window.helper = {
    debounce(callback, delay) {
        let timer = null;

        return function (e) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(e);
            }, delay)
        }
    },
    convertStringToInt(price) {
        return Number(price.replace(/[^\d]/g, ''));
    },
    convertIntToString(price) {
        const newPrice = price.toString();
        let newString = 'đ';
        let count = 0;
        if (newPrice.length % 3 >= 0) {
            let i;
            for (i = newPrice.length - 1; i >= 0; i--) {

                if (count % 3 == 0 && count != 0)
                    newString = '.' + newString;

                newString = newPrice[i] + newString;

                count++;
            }
        }

        return newString;
    }
}