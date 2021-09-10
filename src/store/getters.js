export const isAuthenticated = (state) => !!state.solutech_web_token;
export const user = (state) => state.user;
export const role = (state) => ( state.user.role );
