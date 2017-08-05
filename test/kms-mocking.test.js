'use strict';

const test = require('tape');

// Test subject
const kmsMocking = require('../kms-mocking');
const mockKMS = kmsMocking.mockKMS;

const kmsUtils = require('../kms-utils');
const encryptKey = kmsUtils.encryptKey;
const decryptKey = kmsUtils.decryptKey;

// const util = require('util');

const accountId = 'XXXXXXXXXXXX';
const kmsKeyAlias = 'kkkkkkkkkkkkkk';
const region = 'eu-west-1';
process.env.AWS_REGION = region;
const keyId = `arn:aws:kms:${region}:${accountId}:alias/${kmsKeyAlias}`;

const plaintext = 'Shhhhhhhhhhhhhhh';
const ciphertext = 'DUMMY_ciphertext';
const ciphertextBase64 = new Buffer(ciphertext, 'utf8').toString('base64');

// function show(o) {
//   return util.inspect(o);
// }

test('mocking of KMS encrypt & decrypt', t => {
  const kms = mockKMS(undefined, plaintext, undefined, ciphertextBase64, 10);

  encryptKey(kms, keyId, plaintext).then(
    encrypted => {
      // console.log(`##### encrypted = ${show(encrypted)}`);
      t.ok(encrypted, `encrypted must be defined`);
      t.ok(encrypted.length > 0, `encrypted must be non-empty`);
      t.equal(encrypted, ciphertextBase64, `encrypted must be ciphertextBase64`);

      decryptKey(kms, ciphertextBase64).then(
        decrypted => {
          // console.log(`##### decrypted = ${show(decrypted)}`);
          t.ok(decrypted, `decrypted must be defined`);
          t.ok(decrypted.length > 0, `decrypted must be non-empty`);
          t.equal(decrypted, plaintext, `decrypted must be plaintext`);
          t.end();
        },
        err => {
          t.end(err);
        }
      );
    },
    err => {
      t.end(err);
    }
  );
});

test('mocking of KMS encrypt with error', t => {
  const encryptError = new Error('Encrypt kaboom');
  const kms = mockKMS(undefined, plaintext, encryptError, ciphertextBase64, 10);

  encryptKey(kms, keyId, plaintext).then(
    encrypted => {
      t.end(`encrypt must NOT succeed with a value (${encrypted})`);
    },
    err => {
      t.pass(`encrypt must fail`);
      t.equal(err, encryptError, `encrypt error must be planned error`);
      t.end();
    }
  );
});

test('mocking of KMS decrypt with error', t => {
  const decryptError = new Error('Decrypt kaboom');
  const kms = mockKMS(decryptError, plaintext, undefined, ciphertextBase64, 10);

  decryptKey(kms, ciphertextBase64).then(
    decrypted => {
      t.end(`decrypt must NOT succeed with a value (${decrypted})`);
    },
    err => {
      t.pass(`decrypt must fail`);
      t.equal(err, decryptError, `decrypt error must be planned error`);
      t.end();
    }
  );
});