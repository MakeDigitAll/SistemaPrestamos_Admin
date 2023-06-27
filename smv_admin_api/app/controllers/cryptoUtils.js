const CryptoJS = require("crypto-js");

const secret_key = "ee4fdd88fcc9afaff541caf9652ba6cc";

function aesDecrypt(word) {
  const keys = CryptoJS.enc.Utf8.parse(secret_key);
  const base64 = CryptoJS.enc.Base64.parse(word);
  const src = CryptoJS.enc.Base64.stringify(base64);
  const decrypted = CryptoJS.AES.decrypt(src, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  aesDecrypt,
};
