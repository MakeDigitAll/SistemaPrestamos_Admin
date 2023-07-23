import CryptoJS from "crypto-js";
const ivKey = CryptoJS.lib.WordArray.random(16).toString();

const secret_key = "f163afb7979195597e8c70ce6f22baab";
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
