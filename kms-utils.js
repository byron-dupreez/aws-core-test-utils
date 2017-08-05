'use strict';

/**
 * Utilities for working with AWS.KMS instances.
 * @module aws-core-test-utils/kms-utils
 * @author Byron du Preez
 */
module.exports.encryptKey = encryptKey;
module.exports.decryptKey = decryptKey;

/**
 * Encrypts the given plaintext using the given AWS.KMS instance & returns the encrypted ciphertext.
 * @param {AWS.KMS} kms - an AWS.KMS instance to use
 * @param {string} keyId - the identifier of the CMK to use for encryption. You can use the key ID or Amazon Resource Name (ARN) of the CMK, or the name or ARN of an alias that refers to the CMK.
 * @param {string} plainText - the plaintext to encrypt
 * @param {console|Logging|undefined} [logger] - an optional logger to use (defaults to console if omitted)
 * @returns {Promise.<string>} a promise of the encrypted ciphertext
 */
function encryptKey(kms, keyId, plainText, logger) {
  logger = logger || console;
  return new Promise((resolve, reject) => {
    try {
      const params = {
        KeyId: keyId,
        Plaintext: plainText //<Binary String>// The data to encrypt.
      };

      const startMs = Date.now();
      kms.encrypt(params, (err, data) => {
        const ms = Date.now() - startMs;
        if (err) {
          logger.error(`KMS encrypt took ${ms} ms`, err);
          reject(err);
        } else {
          logger.info(`KMS encrypt took ${ms} ms`);
          // console.log(`##### encrypted = ${show(data)}`);
          resolve(data.CiphertextBlob.toString('base64'));
        }
      });

    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
}

/**
 * Decrypts the given ciphertext in base 64 using the given AWS.KMS instance & returns the decrypted plaintext.
 * @param {AWS.KMS} kms - an AWS.KMS instance to use
 * @param {string} ciphertextBase64 - the encrypted ciphertext in base 64
 * @param {console|Logging|undefined} [logger] - an optional logger to use (defaults to console if omitted)
 * @returns {Promise.<string>} a promise of the decrypted plaintext
 */
function decryptKey(kms, ciphertextBase64, logger) {
  logger = logger || console;
  return new Promise((resolve, reject) => {
    try {
      const startMs = Date.now();
      const ciphertextBuffer = {CiphertextBlob: new Buffer(ciphertextBase64, 'base64')};
      kms.decrypt(ciphertextBuffer, (err, data) => {
        const ms = Date.now() - startMs;
        if (err) {
          logger.error(`KMS decrypt failure took ${ms} ms`, err);
          reject(err);
        } else {
          logger.info(`KMS decrypt success took ${ms} ms`);
          resolve(data.Plaintext.toString('utf8'));
        }
      });

    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
}