import CryptoJS from "crypto-js";

const secret_key = "ee4fdd88fcc9afaff541caf9652ba6cc";
const ivKey = CryptoJS.lib.WordArray.random(16).toString();

export function aesEncrypt(content: string) {
  const parsedkey = CryptoJS.enc.Utf8.parse(secret_key);
  const iv = CryptoJS.enc.Utf8.parse(ivKey);
  const encrypted = CryptoJS.AES.encrypt(content, parsedkey, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}
