const TOKEN_KEY = "jwt-token";
const EXPIRES_KEY = "jwt-expires";
const REFRESH_KEY = "jwt-refresh-token";

export function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getExpiresDate,
    getRefreshToken
};

export default localStorageService;
