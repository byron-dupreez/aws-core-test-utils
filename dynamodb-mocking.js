'use strict';

const Promises = require('core-functions/promises');

/**
 * Utilities for generating mock DynamoDB.DocumentClient instances for testing.
 * @author Byron du Preez
 */

module.exports.mockDynamoDBDocClient = mockDynamoDBDocClient;

/**
 * Generates a mock of a DynamoDB.DocumentClient for testing purposes.
 * @param {TestObject} t - a test object to use for assertions
 * @param {string} prefix - a prefix for logging purposes
 * @param {number|undefined} [delayMs = 1] - the number of milliseconds to delay to simulate time elapsed during the IO operation
 * @param {Object.<string, (MockResponse|MockResponse[]|GenerateMockResponse)>} mockResponseSourcesByMethodName - a map from method name to a single mock response or array of mock responses or function that accepts the input params and generates a mock response
 * @return {DynamoDBDocClientMock} a simplified mock of a DynamoDB.DocumentClient for testing purposes
 * @template T - the type of inner result returned
 */
function mockDynamoDBDocClient(t, prefix, delayMs, mockResponseSourcesByMethodName) {
  const ms = delayMs ? delayMs : 1;
  return {
    put(params) {
      return {
        promise() {
          const r = resolveResponse(mockResponseSourcesByMethodName['put'], params);

          return Promises.delay(ms).then(() => {
            t.pass(`${prefix} simulated put to DynamoDB.DocumentClient with request (${JSON.stringify(params)})`);

            if (r && r.validateParams) r.validateParams(t, params);

            if (r && r.error) throw r.error;

            return r ? r.result : undefined;
          });
        }
      };
    },
    update(params) {
      return {
        promise() {
          const r = resolveResponse(mockResponseSourcesByMethodName['update'], params);

          return Promises.delay(ms).then(() => {
            t.pass(`${prefix} simulated update to DynamoDB.DocumentClient with request (${JSON.stringify(params)})`);

            if (r && r.validateParams) r.validateParams(t, params);

            if (r && r.error) throw r.error;

            return r ? r.result : undefined;
          });
        }
      };
    },
    get(params) {
      return {
        promise() {
          const r = resolveResponse(mockResponseSourcesByMethodName['get'], params);

          return Promises.delay(ms).then(() => {
            t.pass(`${prefix} simulated get on DynamoDB.DocumentClient with params (${JSON.stringify(params)})`);

            if (r && r.validateParams) r.validateParams(t, params);

            if (r && r.error) throw r.error;

            const result = r ? r.result : undefined;
            return result && result.hasOwnProperty('Item') ? result : {Item: result};
          });
        }
      }
    },
    query(params) {
      return {
        promise() {
          const r = resolveResponse(mockResponseSourcesByMethodName['query'], params);

          return Promises.delay(ms).then(() => {
            t.pass(`${prefix} simulated query on DynamoDB.DocumentClient with params (${JSON.stringify(params)})`);

            if (r && r.validateParams) {
              r.validateParams(t, params);
            }

            if (r && r.error) throw r.error;

            const result = r ? r.result : undefined;
            const hasItems = result && (result.Items || result.hasOwnProperty('Items'));
            const items = hasItems ? result.Items : Array.isArray(result) ? result : [];
            const n = Array.isArray(items) ? items.length : 0;

            if (!hasItems) {
              return {Items: items, Count: n, ScannedCount: n};
            }

            if (result && !result.Count) result.Count = n;
            if (result && !result.ScannedCount) result.ScannedCount = n;
            return result;
          });
        }
      }
    }
  };
}

/**
 * Resolves the mock response to return for the given params.
 * @param {MockResponse|MockResponse[]|GenerateMockResponse} mockResponseSource - a single mock response or an array of mock responses or a function that accepts the input params and generates a mock response
 * @param {number|undefined} [mockResponseSource.index] - the index of the last mock response returned - only used when mockResponseSource is an array or a function
 * @param {Object.<string, *>} params - the input params
 * @return {*} a mock response
 */
function resolveResponse(mockResponseSource, params) {
  const isFunction = typeof mockResponseSource === 'function';
  const hasArray = Array.isArray(mockResponseSource);
  let index = isFunction || hasArray ? mockResponseSource.index !== undefined ? mockResponseSource.index + 1 : 0 : -1;
  if (isFunction || hasArray) mockResponseSource.index = index;
  return isFunction ? mockResponseSource(params) : hasArray ? mockResponseSource[index] : mockResponseSource;
}
