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
  return {
    decrypt(params, callback) {
      setTimeout(() => {
        console.log(`Simulating KMS decrypt with params (${JSON.stringify(params).substring(0, 42)}...})`);
        if (decryptError) {
          callback(decryptError, null)
        } else {
          callback(null, {Plaintext: decryptedPlaintext})
        }
      }, ms);
    },

    encrypt(params, callback) {
      console.log(`Simulating KMS encrypt with params (${JSON.stringify(params).substring(0, 22)}...})`);
      setTimeout(() => {
        if (encryptError) {
          callback(encryptError, null)
        } else {
          const ciphertextBuffer = new Buffer(encryptedCiphertextBase64, 'base64');
          callback(null, {CiphertextBlob: ciphertextBuffer});
        }
      }, ms);
    }
  };
}