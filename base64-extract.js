'use strict';

const isString = require('./strings-extract').isString;

// ---------------------------------------------------------------------------------------------------------------------
// Excerpts from "core-functions/base64"
// ---------------------------------------------------------------------------------------------------------------------

exports.toBase64 = toBase64;

/**
 * Attempts to convert the given data object or value into a JSON string and then encodes that to a base 64 string (if
 * data is decodable and encodable and NOT undefined); or throws a TypeError (if not decodable or not encodable);
 * otherwise returns undefined.
 * @param {*|undefined} data the data object or value to convert
 * @param {boolean|undefined} [returnUndefinedInsteadOfThrow] an optional switch that determines whether or not to return
 * undefined instead of throwing an error
 * @returns {string|undefined} the base 64 encoded string or undefined
 */
function toBase64(data, returnUndefinedInsteadOfThrow) {
  try {
    return data !== undefined ? toBase64FromUtf8(JSON.stringify(data)) : undefined;
  } catch (err) {
    handleError(data, err, returnUndefinedInsteadOfThrow);
  }
}

/**
 * Attempts to convert the given utf-8 decodable/encodable (string, Buffer or Array) into a base 64 encoded string (if
 * utf8 is decodable and encodable and NOT undefined); or throws a TypeError (if not decodable and not encodable);
 * otherwise returns undefined.
 * @param {string|Buffer|Array} utf8 the utf-8 decodable/encodable to convert
 * @param {boolean|undefined} returnUndefinedInsteadOfThrow an optional switch that determines whether or not to return
 * undefined instead of throwing an error
 * @returns {string|undefined} the base 64 encoded string or undefined
 */
function toBase64FromUtf8(utf8, returnUndefinedInsteadOfThrow) {
  try {
    return utf8 !== undefined ? (utf8 instanceof Buffer ? utf8 : new Buffer(utf8, 'utf-8')).toString('base64') : undefined;
  } catch (err) {
    handleError(utf8, err, returnUndefinedInsteadOfThrow);
  }
}

/**
 * Determines whether to return undefined instead of rethrowing the given error or not.
 * @param value the value for which encoding/decoding failed
 * @param err the error that was thrown
 * @param {boolean|undefined} returnUndefinedInsteadOfThrow an optional switch that determines whether or not to return
 * undefined instead of throwing an error
 * @returns {undefined} returns undefind (if returnUndefinedInsteadOfThrow); otherwise rethrows the error
 */
function handleError(value, err, returnUndefinedInsteadOfThrow) {
  if (isEncodableDecodable(value)) {
    console.error(`Unexpected error (${err}), since ${JSON.stringify(value)} was supposed to be encodable/decodable`, err);
    if (returnUndefinedInsteadOfThrow) {
      return undefined;
    } else {
      throw err;
    }
  }
  //console.error(`Expected error (${err}), since ${JSON.stringify(value)} is not encodable/decodable`, err);
  if (returnUndefinedInsteadOfThrow) {
    return undefined;
  } else {
    throw err;
  }
}

/**
 * Returns true if the given value is a string, Buffer or Array and hence are PROBABLY encodable/decodable.
 * A valid encodable/decodable "must start with number, buffer, array or string"; otherwise new Buffer will throw a
 * TypeError. However, passing a number creates a Buffer of that size, which is useless for these functions.
 * @param {*} value the value to check
 * @returns {*|boolean} true if probably encodable/decodable; false otherwise
 */
function isEncodableDecodable(value) {
  return isString(value) || value instanceof Buffer || Array.isArray(value);
}