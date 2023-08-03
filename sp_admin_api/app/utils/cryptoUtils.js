const CryptoJS = require("crypto-js");

function aesDecrypt(word) {
  key = process.env.SECRET_KEY_DECRYPTION;
  const keys = CryptoJS.enc.Utf8.parse(key);
  const combined = CryptoJS.enc.Base64.parse(word.replace(/-/g, "+").replace(/_/g, "/"));
  const iv = combined.clone();
  iv.sigBytes = 16;
  iv.clamp();
  const ciphertext = combined.clone();
  ciphertext.words.splice(0, 4);
  ciphertext.sigBytes -= 16;

  const decrypted = CryptoJS.AES.decrypt(
    {
      ciphertext: ciphertext,
    },
    keys,
    {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function aesEncrypt(content) {
  const key_encryption = process.env.SECRET_KEY_ENCRYPTION;
  const iv = CryptoJS.lib.WordArray.random(16);
  const parsedkey = CryptoJS.enc.Utf8.parse(key_encryption);
  const encrypted = CryptoJS.AES.encrypt(content, parsedkey, {
    iv: iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const ivAndEncrypted = iv.concat(encrypted.ciphertext);
  const encryptedString = ivAndEncrypted.toString(CryptoJS.enc.Base64);
  return encryptedString.replace(/\+/g, "-").replace(/\//g, "_");
}

module.exports = {
  aesDecrypt,
  aesEncrypt,
};
