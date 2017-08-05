'use strict';

const Promises = require('./promises-extract');

/**
 * Utilities for generating mock DynamoDB.DocumentClient instances for testing.
 * @module aws-core-test-utils/dynamodb-mocking
 * @author Byron du Preez
 */

module.exports.mockDynamoDBDocClient = mockDynamoDBDocClient;

/**
 * Generates a mock of a DynamoDB.DocumentClient for testing purposes.
 * @param {TestObject} t - a test object to use for assertions
 * @param {string} prefix - a prefix for logging purposes
 * @param {number|undefined} [delayMs = 1] - the number of milliseconds to delay to simulate time elapsed during the IO operation
 * @param {Object.<string, DynamoMockResponseSource>} mockResponseSourcesByMethodName - a map from method name to a single mock response or array of mock responses or function that accepts the input params and generates a mock response
 * @return {DynamoDBDocClient} a mock AWS.DynamoDB.DocumentClient for testing purposes
 * @template T - the type of inner result returned
 */
function mockDynamoDBDocClient(t, prefix, delayMs, mockResponseSourcesByMethodName) {
  const ms = delayMs ? delayMs : 1;

  function generateAwsRequest(methodName, params, refineResult) {
    return {
      promise() {
        const r = resolveResponse(mockResponseSourcesByMethodName[methodName], params);

        return Promises.delay(ms).then(() => {
          if (t && t.pass) t.pass(`${prefix} simulated ${methodName} to DynamoDB.DocumentClient with (${JSON.stringify(params)})`);

          if (r && r.validateArgs) r.validateArgs(t, params);

          if (r && r.error) throw r.error;

          const result = r ? r.result : undefined;
          return typeof refineResult === 'function' ? refineResult(result) : result;
        });
      }
    };
  }

  function simulateCreateSet(list, options) {
    console.log(`${prefix} simulated createSet on DynamoDB.DocumentClient with (${JSON.stringify(list)}, ${JSON.stringify(options)})`);
  }

  return {
    batchGet(params) { return generateAwsRequest('batchGet', params); },
    batchWrite(params) { return generateAwsRequest('batchWrite', params); },
    createSet(list, options) { return simulateCreateSet(list, options); },
    delete(params) { return generateAwsRequest('delete', params); },
    get(params) { return generateAwsRequest('get', params, refineItemResult); },
    put(params) { return generateAwsRequest('put', params); },
    query(params) { return generateAwsRequest('query', params, refineItemsResult); },
    scan(params) { return generateAwsRequest('scan', params, refineItemsResult); },
    update(params) { return generateAwsRequest('update', params); },
  };
}

function refineItemResult(result) {
  return result && result.hasOwnProperty('Item') ? result : {Item: result};
}

function refineItemsResult(result) {
  const hasItems = result && (result.Items || result.hasOwnProperty('Items'));
  const items = hasItems ? result.Items : Array.isArray(result) ? result : [];
  const n = Array.isArray(items) ? items.length : 0;
  if (!hasItems) {
    return {Items: items, Count: n, ScannedCount: n};
  }
  if (result && !result.Count) result.Count = n;
  if (result && !result.ScannedCount) result.ScannedCount = n;
  return result;
}

/**
 * Resolves the mock response to return for the given params.
 * @param {DynamoMockResponseSource} mockResponseSource - a single mock response or an array of mock responses or a function that accepts the input params and generates a mock response
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