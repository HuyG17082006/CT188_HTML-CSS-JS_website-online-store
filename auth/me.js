window.me = {
    set : (user) => {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    },
    /*
        Lưu thông tin user hiện tại
     */

    get : () => {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    },
    /*
        Lấy thông tin user hiện tại
     */

    remove : () => {
        sessionStorage.removeItem('currentUser');
    },
    /*
        Xóa user hiện tại (rời khỏi trạng thái đăng nhập)
     */
}