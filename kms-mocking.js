'use strict';

/**
 * Utilities for generating mock AWS.KMS instances for testing.
 * @module aws-core-test-utils/kms-mocking
 * @author Byron du Preez
 */
module.exports.mockKMS = mockKMS;

/**
 * Generates a mock AWS.KMS instance, which currently only mocks the `encrypt` & `decrypt` methods.
 * @param {Error|undefined} [decryptError] - an optional simulated `decrypt` error to be thrown instead
 * @param {string|undefined} [decryptedPlaintext] - the fake plaintext included in the `decrypt` response
 * @param {Error|undefined} [encryptError] - an optional simulated `encrypt` error to be thrown instead
 * @param {string|undefined} [encryptedCiphertextBase64] - the fake ciphertext in base64 included in the `encrypt` response
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

      function executeCallback(callback) {
        setTimeout(() => {
          if (decryptError) {
            callback(decryptError, null);
          } else {
            callback(null, {Plaintext: decryptedPlaintext});
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
                resolve({Plaintext: decryptedPlaintext});
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
      const ciphertextBuffer = new Buffer(encryptedCiphertextBase64, 'base64');

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