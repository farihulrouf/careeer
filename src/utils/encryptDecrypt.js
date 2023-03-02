var CryptoJS = require("crypto-js");

const SecretKey = process.env.REACT_APP_SECRET_CODE;

export const encryptData = (data) => {
  if (!data) throw new Error("data is missing! Please send data to encrypt");
  return CryptoJS.AES.encrypt(JSON.stringify(data), SecretKey).toString();
};

export const decryptData = (data) => {
  if (!data) return "";
  return parseIfJSONString(
    CryptoJS.AES.decrypt(data, SecretKey).toString(CryptoJS.enc.Utf8)
  );
};

export const parseIfJSONString = (str) => {
  try {
    let json = JSON.parse(str);
    return json;
  } catch (e) {
    return str;
  }
};
