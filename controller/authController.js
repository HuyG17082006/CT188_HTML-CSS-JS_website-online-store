const userRepo = window.userRepo;
const me = window.me;

window.authController = {
    signIn : (username, password) => {

        let error = '';

        const user = userRepo.findByUsername(username);
        console.log(user)
        if (!user) {
            error = 'Sai tên tài khoản hoặc mật khẩu!'
        }

        if (user && user.password !== password) {
            error = 'Sai tên tài khoản hoặc mật khẩu!'
        }

        if (error)
            return error;

        const currentUser = {
            id : user.id,
            username : user.username,
            password : user.password,
            number_phone : user.number_phone,
            address : user.address,
            gender : user.gender
        }

        me.set(currentUser);

        return '';
    },

    signUp : (username, password, email) => {

        let error = {
            nameError : '',
            passwordError : '',
            emailError : ''
        }

        if (username.length < 8) {
            error.nameError = 'Tên tài khoản phải chứa ít nhất 8 kí tự!';
        }
        if (password.length < 8) {
            error.passwordError = 'Mật khẩu phải chứa ít nhất 8 kí tự!';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            error.emailError = 'Email sai định dạng!';
        }

        if (error.emailError || error.nameError || error.passwordError)
            return error;

        const existedUser = userRepo.findByUsername(username);
        const existedEmail = userRepo.findByEmail(email);
        
        if (existedUser)
            error.nameError = 'Tên tài khoản đã tồn tại!';
        if (existedEmail)
            error.emailError = 'Email đã tồn tại!'

        if (error.emailError || error.nameError)
            return error;

        const user = {
            username : username,
            password : password,
            email : email,
            address : '',
            number_phone : '',
            gender : '',
            created_at : Date.now()
        }

        userRepo.insert(user);

        return '';
    }
}