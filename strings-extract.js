'use strict';

// ---------------------------------------------------------------------------------------------------------------------
// Excerpts from core-functions/strings
// ---------------------------------------------------------------------------------------------------------------------

exports.isString = isString;
exports.isNotBlank = isNotBlank;
exports.trim = trim;
exports.trimOrEmpty = trimOrEmpty;

/**
 * Returns true if the given value is a string; false otherwise.
 * @param {*} value - the value to check
 * @return {boolean} true if its a string; false otherwise
 */
function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

/**
 * Returns true if the given string is NOT blank (i.e. NOT undefined, null, empty or contains only whitespace); false
 * otherwise.
 * @param {string|String} s - the string to check
 * @return {boolean} true if NOT blank; false otherwise
 */
function isNotBlank(s) {
  return s && (!s.trim || s.trim());
}

/**
 * Trims the given value if it is a string; otherwise returns a non-string value as is.
 * @param {*} value - the value to trim
 * @returns {string|*} the trimmed string or the original non-string value
 */
function trim(value) {
  return typeof value === 'string' || value instanceof String ? value.trim() : value;
}

/**
 * Trims the given value (if it's a string) or returns an empty string (if it's undefined or null); otherwise returns
 * the non-undefined, non-null, non-string value as is.
 * @param {*} value - the value to trim
 * @returns {string|*} the trimmed string; an empty string; or the original non-undefined, non-null, non-string value
 */
function trimOrEmpty(value) {
  return typeof value === 'string' || value instanceof String ? value.trim() :
    value === undefined || value === null ? '' : value;
}