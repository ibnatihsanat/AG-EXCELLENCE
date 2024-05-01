const logoutBtn = document.querySelector('.logout')

logoutBtn.addEventListener('click', () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId')

    // Redirect back to the login page
    window.location.href = 'login.html';
});