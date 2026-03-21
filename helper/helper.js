window.helper = {
    convertStringToInt(price) {
        return Number(price.replace(/[^\d]/g, ''));
    },

    convertIntToVietNamDong(price) {
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
    }, 

    locked : false,
    lockAction(time) {
        if (this.locked)
            return true;

        this.locked = true;
        setTimeout(() => {
            this.locked = false;
        }, time)

        return false;
    } //Thiết lập khoảng thời gian giữa các lần thực hiện cùng một hành động
}