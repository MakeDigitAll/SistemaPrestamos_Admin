const CryptoJS = require("crypto-js");
const secret_key = require("../keys/cryptoKey");
function aesDecrypt(word) {
  const keys = CryptoJS.enc.Utf8.parse(secret_key);
  const base64 = CryptoJS.enc.Base64.parse(word.replace(/\s/g, "+"));
  const decrypted = CryptoJS.AES.decrypt(
    {
      ciphertext: base64,
    },
    keys,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  aesDecrypt,
};
