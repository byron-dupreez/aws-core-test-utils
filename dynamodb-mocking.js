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
 * @param {Object.<string, MockResponse>} mockResponsesByMethodName - a map of mock responses by method name
 * @return {DynamoDBDocClientMock} a simplified mock of a DynamoDB.DocumentClient for testing purposes
 * @template T - the type of inner result returned
 */
function mockDynamoDBDocClient(t, prefix, delayMs, mockResponsesByMethodName) {
  const ms = delayMs ? delayMs : 1;
  return {
    put(request) {
      return {
        promise() {
          const r = mockResponsesByMethodName['put'];
          return Promises.delay(ms).then(() => {
            t.pass(`${prefix} simulated put to DynamoDB.DocumentClient with request (${JSON.stringify(request)})`);

            if (r && r.validateParams) r.validateParams(t, request);

            if (r && r.error) throw r.error;

            return r ? r.result : undefined;
          });
        }
      };
    },
    update(request) {
      return {
        promise() {
          const r = mockResponsesByMethodName['update'];
          return Promises.delay(ms).then(() => {
            t.pass(`${prefix} simulated update to DynamoDB.DocumentClient with request (${JSON.stringify(request)})`);

            if (r && r.validateParams) r.validateParams(t, request);

            if (r && r.error) throw r.error;

            return r ? r.result : undefined;
          });
        }
      };
    },
    get(params) {
      return {
        promise() {
          const r = mockResponsesByMethodName['get'];
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
          const r = mockResponsesByMethodName['query'];
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