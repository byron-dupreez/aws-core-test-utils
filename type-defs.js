'use strict';

/**
 * @typedef {Object} TestObject - a Tape test object, which is used for assertions and passed as a parameter to your test's callback function
 * @property {Function} pass
 * @property {Function} fail
 * @property {Function} plan
 * @property {Function} end
 * @property {Function} equal
 */

/**
 * @typedef {function(t: TestObject, params: Object.<string, *>): *} ValidateParams - a function with which to validate request params
 * @template T - the type of the Tape test parameter to use for assertions
 */

/**
 * @typedef {Object} MockResponse
 * @property {Error|undefined} [error] - an optional error with which to reject the request
 * @property {DynamoDBGetResult.<I>|DynamoDBQueryResult.<I>|I|I[]|*|undefined} [result] - an optional result with which to resolve the request
 * @property {ValidateParams|undefined} [validateParams] - an optional function with which to validate the request
 * @template I - the type of item(s) returned in the `Item` or `Items` property of the `get` or `query` result
 */

/**
 * @typedef {function(params: Object.<string, *>): MockResponse} GenerateMockResponse
 */

/**
 * @typedef {Object} DynamoDBDocClientMock - a simplified mock of a DynamoDB.DocumentClient for testing purposes
 * @property {Function} put
 * @property {Function} update
 * @property {Function} get
 * @property {Function} query
 */

// ---------------------------------------------------------------------------------------------------------------------
// Start of copy from `aws-core-utils/type-defs`
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @typedef {Object} DynamoDBGetResult.<I> - a DynamoDB.DocumentClient `get` result (or DynamoDB `getItem` result)
 * @property {I|undefined} [Item] - the returned item (if found) or undefined (if not)
 * @property {ConsumedCapacity|undefined} [ConsumedCapacity] - the capacity units consumed by the get operation (if requested)
 * @template I - the type of item returned in the `Item` property of the `get` result
 */

/**
 * @typedef {Object} DynamoDBQueryResult.<I> - a DynamoDB.DocumentClient `query` result (or DynamoDB `query` result)
 * @property {Array.<I>} Items - the returned items
 * @property {number} Count - the number of items returned
 * @property {number} ScannedCount - the number of items scanned before applying any filter
 * @property {Object|undefined} [LastEvaluatedKey] - the last evaluated key (if any) to be used to get next "page"
 * @property {ConsumedCapacity|undefined} [ConsumedCapacity] - the capacity units consumed by the query operation (if requested)
 * @template I - the type of items returned in the `Items` property of the `query` result
 */

/**
 * @typedef {Object} ConsumedCapacity - the capacity units consumed by an operation
 */

// ---------------------------------------------------------------------------------------------------------------------
// End of copy from `aws-core-utils/type-defs`
// ---------------------------------------------------------------------------------------------------------------------
