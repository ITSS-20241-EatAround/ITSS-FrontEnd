import CryptoJS from 'crypto-js';

const tokenKey = 'tokenKey';
const secretKey = process.env.SECRET_KEY || "ITSS123";

export const getTokenFromLocalStorage = () => {
  const encryptedToken = localStorage.getItem(tokenKey);
  if (encryptedToken) {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken || null;
  }
  return null;
};

export const saveTokenToLocalStorage = (token) => {
  const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
  localStorage.setItem(tokenKey, encryptedToken);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(tokenKey);
};
