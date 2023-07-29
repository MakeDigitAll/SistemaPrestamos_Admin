import CryptoJS from "crypto-js";
const secret_key_encryption = "f163afb7979195597e8c70ce6f22baab";
const secret_key_decryption = "1ccf2ac1b4255517f9ebcf2cf28b97fe";

export function aesEncrypt(word: string) {
  const iv = CryptoJS.lib.WordArray.random(16);
  const parsedkey = CryptoJS.enc.Utf8.parse(secret_key_encryption);
  const encrypted = CryptoJS.AES.encrypt(word, parsedkey, {
    iv: iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const ivAndEncrypted = iv.concat(encrypted.ciphertext);
  const encryptedString = ivAndEncrypted.toString(CryptoJS.enc.Base64);
  return encryptedString.replace(/\+/g, "-");
}

export function aesDecrypt(word: string) {
  const keys = CryptoJS.enc.Utf8.parse(secret_key_decryption);
  const combined = CryptoJS.enc.Base64.parse(word.replace(/-/g, "+"));
  const iv = combined.clone();
  iv.sigBytes = 16;
  iv.clamp();
  const ciphertext = combined.clone();
  ciphertext.words.splice(0, 4);
  ciphertext.sigBytes -= 16;

  const decrypted = CryptoJS.AES.decrypt(
    {
      ciphertext: ciphertext,
    } as any,
    keys,
    {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
}
