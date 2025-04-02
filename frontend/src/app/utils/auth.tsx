export const saveToken = (token: string) => {
    localStorage.setItem("mr_lim_jwt_token", token);
};

export const getToken = () => {
    return localStorage.getItem("mr_lim_jwt_token");
};