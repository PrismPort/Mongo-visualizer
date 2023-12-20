export const handleLogout = () => {
    localStorage.removeItem('mongoURL');
    window.location.href = "/";
};