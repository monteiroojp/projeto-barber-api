const authUser = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        console.log('User is logged in')
    } else {
        window.location.href = '../login';
    }
};

authUser()