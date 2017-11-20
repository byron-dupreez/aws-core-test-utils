'use strict';

/**
 * Module containing native Promise utility functions.
 * @module aws-core-test-utils/promises-extract
 * @author Byron du Preez
 */
exports._$_ = '_$_'; //IDE workaround
exports.delay = delay;

/**
 * Starts a simple timeout Promise, which will resolve after the specified delay in milliseconds. If any object is
 * passed into this function as the cancellable argument, then this function will install a cancelTimeout method on it,
 * which accepts a single optional mustResolve argument and which if subsequently invoked will cancel the timeout and
 * either resolve the promise (if mustResolve) or reject the promise (default), but ONLY if the timeout has not
 * triggered yet.
 *
 * @param {number} ms - the number of milliseconds to delay
 * @param {Object|undefined|null} [cancellable] - an arbitrary object onto which a cancelTimeout method will be installed
 * @returns {Function|undefined} [cancellable.cancelTimeout] - installs a cancelTimeout method on the given cancellable
 * @returns {Promise} the timeout Promise
 */
function delay(ms, cancellable) {
  let triggered = false;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      triggered = true;
      resolve(triggered);
    }, ms);

    // Set up a cancel method on the given cancellable object
    if (cancellable && typeof cancellable === 'object') {
      cancellable.cancelTimeout = (mustResolve) => {
        if (!triggered) {
          try {
            clearTimeout(timeout);
          } catch (err) {
            console.error('Failed to clear timeout', err);
          } finally {
            if (mustResolve) {
              resolve(triggered);
            } else {
              reject(triggered);
            }
          }
        }
        return triggered;
      }
    }
  });
}