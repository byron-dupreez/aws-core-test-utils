'use strict';

/**
 * Utilities for generating mock AWS.KMS instances for testing.
 * @module aws-core-test-utils/kms-mocking
 * @author Byron du Preez
 */
exports._$_ = '_$_'; //IDE workaround
exports.mockKMS = mockKMS;

/**
 * Executes a simulated decrypt operation.
 * @param {string} plaintext - the plaintext to be encrypted
 * @returns {Buffer} the "encrypted" ciphertext in a base 64 encoded buffer
 */
function simulateEncrypt(plaintext) {
  const reversed = plaintext.split('').reverse().join('');
  return Buffer.from(reversed, 'utf8');
}

/**
 * Executes a simulated decrypt operation.
 * @param {string|Buffer|TypedArray|Blob} ciphertextBlob - the ciphertext to be decrypted in a base 64 encoded buffer
 * @returns {String} the "decrypted" plaintext
 */
function simulateDecrypt(ciphertextBlob) {
  const ciphertextBuffer = Buffer.isBuffer(ciphertextBlob) ? ciphertextBlob :
    typeof ciphertextBlob === 'string' ? Buffer.from(ciphertextBlob, 'base64') :
      ArrayBuffer.isView(ciphertextBlob) ? Buffer.from(ciphertextBlob.buffer) :
        ciphertextBlob instanceof ArrayBuffer ? Buffer.from(ciphertextBlob) :
          Buffer.from(ciphertextBlob);

  const ciphertextBase64 = ciphertextBuffer.toString('utf8');
  return ciphertextBase64.split("").reverse().join("");
}

/**
 * Generates a mock AWS.KMS instance, which currently only mocks the `encrypt` & `decrypt` methods.
 * @param {Error|undefined} [decryptError] - an optional simulated `decrypt` error to be thrown instead
 * @param {string|undefined} [decryptedPlaintext] - an optional plaintext to be included in the `decrypt` response - if omitted, simulates decryption using a dummy algorithm
 * @param {Error|undefined} [encryptError] - an optional simulated `encrypt` error to be thrown instead
 * @param {string|undefined} [encryptedCiphertextBase64] - an optional ciphertext in base64 to be included in the `encrypt` response - if omitted, simulates encryption using a dummy algorithm
 * @param {number} ms - the number of milliseconds of delay to simulate
 * @returns {AWS.KMS} a mock AWS.KMS instance
 */
function mockKMS(decryptError, decryptedPlaintext, encryptError, encryptedCiphertextBase64, ms) {
  // Returns a partial simulation of an AWS.Kinesis instance
  return {
    /**
     * Simulates decryption of the ciphertext within the given KMS parameters & return of a KMS result.
     * @param {KMSDecryptParams} params - the KMS decrypt parameters to use
     * @param {Function|undefined} [callback]
     * @returns {AWS.Request} an AWS.Request
     */
    decrypt(params, callback) {
      console.log(`Simulating KMS decrypt with params (${JSON.stringify(params).substring(0, 42)}...})`);
      const plaintext = decryptedPlaintext ? decryptedPlaintext :
        simulateDecrypt(params.CiphertextBlob);

      function executeCallback(callback) {
        setTimeout(() => {
          if (decryptError) {
            callback(decryptError, null);
          } else {
            callback(null, {Plaintext: plaintext});
          }
        }, ms);
      }

      // If callback was passed then "trigger" the request immediately
      if (callback) executeCallback(callback);

      // Return a simulated AWS Request that contains `send` & `promise` methods for subsequent use
      return {
        /** @param {Function|undefined} [callback] */
        send(callback) {
          if (callback) executeCallback(callback);
        },

        promise() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (decryptError) {
                reject(decryptError);
              } else {
                resolve({Plaintext: plaintext});
              }
            }, ms);
          });
        }
      };
    },

    /**
     * Simulates encryption of the plaintext within the given KMS parameters & return of a KMS result.
     * @param {KMSEncryptParams} params - the KMS encrypt parameters to use
     * @param {Function|undefined} [callback]
     * @returns {AWS.Request} an AWS.Request
     */
    encrypt(params, callback) {
      console.log(`Simulating KMS encrypt with params (${JSON.stringify(params).substring(0, 22)}...})`);
      const ciphertextBuffer = encryptedCiphertextBase64 ? new Buffer(encryptedCiphertextBase64, 'base64') :
        simulateEncrypt(params.Plaintext);

      function executeCallback(callback) {
        setTimeout(() => {
          if (encryptError) {
            callback(encryptError, null);
          } else {
            callback(null, {CiphertextBlob: ciphertextBuffer});
          }
        }, ms);
      }

      // If callback was passed then "trigger" the request immediately
      if (callback) executeCallback(callback);

      // Return a simulated AWS Request that contains `send` & `promise` methods for subsequent use
      return {
        /** @param {Function|undefined} [callback] */
        send(callback) {
          if (callback) executeCallback(callback);
        },

        promise() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (encryptError) {
                reject(encryptError);
              } else {
                resolve({CiphertextBlob: ciphertextBuffer});
              }
            }, ms);
          });
        }
      };
    }
  };
}