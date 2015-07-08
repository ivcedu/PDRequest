////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    if (sessionStorage.key(0) !== null) {
        setUserInformation();
    }
    else {
        window.open('Login.html', '_self');
    }
};