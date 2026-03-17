const userRepo = window.userRepo;
const me = window.me;

window.authController = {
    signIn : (username, password) => {

        let error = {
            usernameError : '',
            passwordError : ''
        };

        if (!username) {
            error.usernameError = 'Tên người dùng không được bỏ trống!';
        }

        if (!password) {
            error.passwordError = 'Mật khẩu không được bỏ trống!';
        }

        if (error.passwordError || error.usernameError)
            return {
                isOk : false,
                error
            };

        const user = userRepo.findByUsername(username);
        
        if (!user || user.password !== password) {
            error.passwordError = 'Sai tên tài khoản hoặc mật khẩu!';
            error.usernameError = 'Sai tên tài khoản hoặc mật khẩu!'
        }

        if (error.passwordError || error.usernameError)
            return {
                isOk : false,
                error
            };

        let currentUser = {
            id : user.id,
            username : user.username,
            receiver_name : user.receiver_name,
            email : user.email,
            password : user.password,
            number_phone : user.number_phone,
            isAdmin : false,
            address : user.address
        }

        if (user.isAdmin) {
            currentUser = {
                ...currentUser,
                isAdmin : true
            } 
        }

        me.set(currentUser);

        return {
                isOk : true,
                isAdmin : user.isAdmin
            };
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

        if (!username) {
            error.nameError = 'Tên người dùng không được bỏ trống!';
        }
        if (!password) {
            error.passwordError = 'Mật khẩu không được bỏ trống!';
        }
        if (!email) {
            error.emailError = 'Email không được bỏ trống!';
        }

        if (error.emailError || error.nameError || error.passwordError)
            return {
                isOk : false,
                error
            };

        const existedUser = userRepo.findByUsername(username);
        const existedEmail = userRepo.findByEmail(email);
        
        if (existedUser)
            error.nameError = 'Tên tài khoản đã tồn tại!';
        
        if (existedEmail)
            error.emailError = 'Email đã tồn tại!'
        
        if (error.emailError || error.nameError)
            return {
                isOk : false,
                error
            };

        const user = {
            username : username,
            receiver_name : '',
            password : password,
            email : email,
            address : '',
            number_phone : '',
            gender : '',
            isAdmin : false,
            created_at : Date.now()
        }

        userRepo.insert(user);

        return {
            isOk : true
        };
    },

    update : (receiver_name, number_phone, address) => {

        const oldUser = me.get();

        const newUser = {
            ...oldUser,
            receiver_name : receiver_name,
            number_phone : number_phone,
            address : address
        }

        userRepo.update(newUser.id, newUser);

        me.set(newUser);
    }
}