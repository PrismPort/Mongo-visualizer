export const handleLogin = () => {
    localStorage.removeItem('mongoURL');
    window.location.href = "/";
};