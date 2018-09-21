'use strict';

const test = require('tape');

// Test subject
const kmsMocking = require('../kms-mocking');
const mockKMS = kmsMocking.mockKMS;

// const util = require('util');

const accountId = 'XXXXXXXXXXXX';
const kmsKeyAlias = 'kkkkkkkkkkkkkk';
const region = 'eu-west-1';
const keyId = `arn:aws:kms:${region}:${accountId}:alias/${kmsKeyAlias}`;

const plaintext = 'Shhhhhhhhhhhhhhh';
const ciphertext = 'DUMMY_ciphertext';
const ciphertextBase64 = new Buffer(ciphertext, 'utf8').toString('base64');

// function show(o) {
//   return util.inspect(o);
// }

// ---------------------------------------------------------------------------------------------------------------------
// Immediate callback style
// ---------------------------------------------------------------------------------------------------------------------

test('mocking of KMS encrypt error using immediate callback style', t => {
  const encryptError = new Error('Encrypt kaboom');
  const kms = mockKMS(undefined, plaintext, encryptError, ciphertextBase64, 10);

  kms.encrypt({KeyId: keyId, Plaintext: plaintext}, (err, result) => {
    if (err) {
      t.pass(`encrypt must fail`);
      t.equal(err, encryptError, `encrypt error must be planned error`);
      t.end();
    } else {
      t.end(`encrypt must NOT succeed with a result (${JSON.stringify(result)})`);
    }
  });
});

test('mocking of KMS decrypt error using immediate callback style', t => {
  const decryptError = new Error('Decrypt kaboom');
  const kms = mockKMS(decryptError, plaintext, undefined, ciphertextBase64, 10);

  kms.decrypt({CiphertextBlob: new Buffer(ciphertextBase64, 'base64')}, (err, result) => {
    if (err) {
      t.pass(`decrypt must fail`);
      t.equal(err, decryptError, `decrypt error must be planned error`);
      t.end();
    } else {
      t.end(`decrypt must NOT succeed with a result (${JSON.stringify(result)})`);
    }
  });
});

test('mocking of KMS encrypt & decrypt using immediate callback style', t => {
  const kms = mockKMS(undefined, plaintext, undefined, ciphertextBase64, 10);

  kms.encrypt({KeyId: keyId, Plaintext: plaintext}, (err, result) => {
    if (err) {
      t.end(err);
    } else {
      const encrypted = result.CiphertextBlob && result.CiphertextBlob.toString('base64');
      t.ok(encrypted, `encrypted must be defined`);
      t.ok(encrypted.length > 0, `encrypted must be non-empty`);
      t.equal(encrypted, ciphertextBase64, `encrypted must be ciphertextBase64`);

      kms.decrypt({CiphertextBlob: new Buffer(ciphertextBase64, 'base64')}, (err, result) => {
        if (err) {
          t.end(err);
        } else {
          const decrypted = result.Plaintext && result.Plaintext.toString('utf8');
          // console.log(`##### decrypted = ${show(decrypted)}`);
          t.ok(decrypted, `decrypted must be defined`);
          t.ok(decrypted.length > 0, `decrypted must be non-empty`);
          t.equal(decrypted, plaintext, `decrypted must be plaintext`);
          t.end();
        }
      });
    }
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// AWS.request.send(callback) style
// ---------------------------------------------------------------------------------------------------------------------

test('mocking of KMS encrypt error using AWS.request.send(callback) style', t => {
  const encryptError = new Error('Encrypt kaboom');
  const kms = mockKMS(undefined, plaintext, encryptError, ciphertextBase64, 10);

  const encryptRequest = kms.encrypt({KeyId: keyId, Plaintext: plaintext});
  encryptRequest.send((err, result) => {
    if (err) {
      t.pass(`encrypt must fail`);
      t.equal(err, encryptError, `encrypt error must be planned error`);
      t.end();
    } else {
      t.end(`encrypt must NOT succeed with a result (${JSON.stringify(result)})`);
    }
  });
});

test('mocking of KMS decrypt error using AWS.request.send(callback) style', t => {
  const decryptError = new Error('Decrypt kaboom');
  const kms = mockKMS(decryptError, plaintext, undefined, ciphertextBase64, 10);

  const decryptRequest = kms.decrypt({CiphertextBlob: new Buffer(ciphertextBase64, 'base64')});
  decryptRequest.send((err, result) => {
    if (err) {
      t.pass(`decrypt must fail`);
      t.equal(err, decryptError, `decrypt error must be planned error`);
      t.end();
    } else {
      t.end(`decrypt must NOT succeed with a result (${JSON.stringify(result)})`);
    }
  });
});

test('mocking of KMS encrypt & decrypt using AWS.request.send(callback) style', t => {
  const kms = mockKMS(undefined, plaintext, undefined, ciphertextBase64, 10);

  const encryptRequest = kms.encrypt({KeyId: keyId, Plaintext: plaintext});
  encryptRequest.send((err, result) => {
    if (err) {
      t.end(err);
    } else {
      const encrypted = result.CiphertextBlob && result.CiphertextBlob.toString('base64');
      t.ok(encrypted, `encrypted must be defined`);
      t.ok(encrypted.length > 0, `encrypted must be non-empty`);
      t.equal(encrypted, ciphertextBase64, `encrypted must be ciphertextBase64`);

      const decryptRequest = kms.decrypt({CiphertextBlob: new Buffer(ciphertextBase64, 'base64')});
      decryptRequest.send((err, result) => {
        if (err) {
          t.end(err);
        } else {
          const decrypted = result.Plaintext && result.Plaintext.toString('utf8');
          // console.log(`##### decrypted = ${show(decrypted)}`);
          t.ok(decrypted, `decrypted must be defined`);
          t.ok(decrypted.length > 0, `decrypted must be non-empty`);
          t.equal(decrypted, plaintext, `decrypted must be plaintext`);
          t.end();
        }
      });
    }
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// AWS.request.promise() style
// ---------------------------------------------------------------------------------------------------------------------

test('mocking of KMS encrypt error using AWS.request.promise() style', t => {
  const encryptError = new Error('Encrypt kaboom');
  const kms = mockKMS(undefined, plaintext, encryptError, ciphertextBase64, 10);

  const encryptRequest = kms.encrypt({KeyId: keyId, Plaintext: plaintext});
  encryptRequest.promise().then(
    result => {
      t.end(`encrypt must NOT succeed with a result (${JSON.stringify(result)})`);
    },
    err => {
      t.pass(`encrypt must fail`);
      t.equal(err, encryptError, `encrypt error must be planned error`);
      t.end();
    }
  );
});

test('mocking of KMS decrypt error using AWS.request.promise() style', t => {
  const decryptError = new Error('Decrypt kaboom');
  const kms = mockKMS(decryptError, plaintext, undefined, ciphertextBase64, 10);

  const decryptRequest = kms.decrypt({CiphertextBlob: new Buffer(ciphertextBase64, 'base64')});
  decryptRequest.promise().then(
    result => {
      t.end(`decrypt must NOT succeed with a result (${JSON.stringify(result)})`);
    },
    err => {
      t.pass(`decrypt must fail`);
      t.equal(err, decryptError, `decrypt error must be planned error`);
      t.end();
    }
  );
});

test('mocking of KMS encrypt & decrypt using AWS.request.promise() style', t => {
  const kms = mockKMS(undefined, plaintext, undefined, ciphertextBase64, 10);

  const encryptRequest = kms.encrypt({KeyId: keyId, Plaintext: plaintext});
  encryptRequest.promise().then(
    result => {
      const encrypted = result.CiphertextBlob && result.CiphertextBlob.toString('base64');
      // console.log(`##### encrypted = ${show(encrypted)}`);
      t.ok(encrypted, `encrypted must be defined`);
      t.ok(encrypted.length > 0, `encrypted must be non-empty`);
      t.equal(encrypted, ciphertextBase64, `encrypted must be ciphertextBase64`);

      const decryptRequest = kms.decrypt({CiphertextBlob: new Buffer(ciphertextBase64, 'base64')});
      decryptRequest.promise().then(
        result => {
          const decrypted = result.Plaintext && result.Plaintext.toString('utf8');
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