export const getToken = () => JSON.parse(localStorage.getItem('token'));

export const removeToken = () => localStorage.removeItem('token');

export const setToken = (token) => localStorage.setItem('token', JSON.stringify(token));
