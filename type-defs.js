'use strict';

/**
 * @typedef {Object} TestObject - a Tape test object, which is used for assertions and passed as a parameter to your test's callback function
 * @property {Function} ok
 * @property {Function} equal
 * @property {Function} deepEqual
 * @property {Function} notOk
 * @property {Function} notEqual
 * @property {Function} notDeepEqual
 * @property {Function} pass
 * @property {Function} fail
 */

/**
 * @typedef {function(t: TestObject, args: ...*): *} ValidateArgs - a function with which to validate request arguments
 */

/**
 * @typedef {Object} DynamoMockResponse.<I,K>
 * @property {Error|undefined} [error] - an optional error with which to reject the request
 * @property {AnyDynamoResult.<I,K>|I|I[]|*|undefined} [result] - an optional result with which to resolve the request
 * @property {ValidateArgs|undefined} [validateArgs] - an optional function with which to validate the request's arguments
 * @template I,K
 */

/**
 * @typedef {function(args: ...*): DynamoMockResponse} GenerateDynamoMockResponse
 */

/**
 * @typedef {DynamoMockResponse|DynamoMockResponse[]|GenerateDynamoMockResponse} DynamoMockResponseSource - a source of DynamoDB mock results,
 * which can be a single mock result that will be returned every time; a list of mock results that will be returned
 * one after the other on subsequent calls (starting at first and returning undefined after the last); or a function
 * that accepts the same input arguments and will generate & return a mock result
 */

/**
 * @typedef {Object.<string,*>} Params - any AWS request parameters
 */

/**
 * @typedef {AWS.Request|Object} AwsRequest.<R> - a mock (or real) AWS.Request
 * @property {function(): Promise.<R>} promise - a function that accepts no arguments and returns a promise of a DynamoDB result
 * @template R
 */

/**
 * @typedef {AWS.DynamoDB.DocumentClient|Object} DynamoDBDocClient - a mock (or real) AWS.DynamoDB.DocumentClient
 * @property {function(params: Params): AwsRequest.<DynamoBatchGetResult.<I,K>>} batchGet
 * @property {function(params: Params): AwsRequest.<*>} batchWrite
 * @property {function(list: Array.<*>, options: Object.<string, *>): void} createSet
 * @property {function(params: Params): AwsRequest.<*>} delete
 * @property {function(params: Params): AwsRequest.<DynamoGetResult.<I>>} get
 * @property {function(params: Params): AwsRequest.<*>} put
 * @property {function(params: Params): AwsRequest.<DynamoQueryResult.<I,K>>} query
 * @property {function(params: Params): AwsRequest.<DynamoScanResult.<I,K>>} scan
 * @property {function(params: Params): AwsRequest.<*>} update
 * @template I,K
 */

/**
 * @typedef {DynamoBatchGetResult.<I,K>|DynamoGetResult.<I>|DynamoQueryResult.<I,K>|DynamoScanResult.<I,K>|*} AnyDynamoResult.<I,K>
 * @template I,K
 */

// ---------------------------------------------------------------------------------------------------------------------
// Start of copy from `aws-core-utils/type-defs`
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @typedef {Object} DynamoBatchGetResult.<I,K> - a DynamoDB.DocumentClient `batchGet` result (or DynamoDB `batchGetItem` result)
 * @property {Object.<string, Array.<I|Object>>} Responses - a map of table name to a list of items
 * @property {UnprocessedKeysMap.<K>|undefined} [UnprocessedKeys] - a map of tables and their respective keys that were not processed with the current response (map<Array<map>>)
 * @property {Array.<ConsumedCapacity>|undefined} [ConsumedCapacity] - The read capacity units consumed by the entire operation
 * @template I,K
 */

/**
 * @typedef {Object} DynamoGetResult.<I> - a DynamoDB.DocumentClient `get` result (or DynamoDB `getItem` result)
 * @property {I|Object|undefined} [Item] - the returned item (if found) or undefined (if not)
 * @property {ConsumedCapacity|undefined} [ConsumedCapacity] - the capacity units consumed by the get operation (if requested)
 * @template I
 */

/**
 * @typedef {Object} DynamoQueryResult.<I,K> - a DynamoDB.DocumentClient `query` result (or DynamoDB `query` result)
 * @property {Array.<I|Object>} Items - the returned items
 * @property {number} Count - the number of items returned
 * @property {number} ScannedCount - the number of items scanned before applying any filter
 * @property {K|Object|undefined} [LastEvaluatedKey] - the last evaluated key (if any) to be used to get next "page"
 * @property {ConsumedCapacity|undefined} [ConsumedCapacity] - the capacity units consumed by the query operation (if requested)
 * @template I,K
 */

/**
 * @typedef {Object} DynamoScanResult.<I,K> - a DynamoDB.DocumentClient `scan` result (or DynamoDB `scan` result)
 * @property {Array.<I|Object>} Items - the returned items
 * @property {number} Count - the number of items returned
 * @property {number} ScannedCount - the number of items scanned before applying any filter
 * @property {K|Object|undefined} [LastEvaluatedKey] - the last evaluated key (if any) to be used to get next "page"
 * @property {ConsumedCapacity|undefined} [ConsumedCapacity] - the capacity units consumed by the query operation (if requested)
 * @template I,K
 */

/**
 * @typedef {Object} UnprocessedKeysMap.<K> - A map of tables and their respective keys that were not processed with the current response. The UnprocessedKeys value is in the same form as RequestItems, so the value can be provided directly to a subsequent BatchGetItem operation.
 * @property {Array.<K|Object>} Keys - An array of primary key attribute values that define specific items in the table
 * @property {string|undefined} [ProjectionExpression] - One or more attributes to be retrieved from the table or index. By default, all attributes are returned. If a requested attribute is not found, it does not appear in the result.
 * @property {boolean|undefined} [ConsistentRead] - The consistency of a read operation. If set to true, then a strongly consistent read is used; otherwise, an eventually consistent read is used.
 * @property {Object.<string, string>|undefined} [ExpressionAttributeNames] - One or more substitution tokens for attribute names in an expression.
 * @template K
 */

/**
 * @typedef {Object} ConsumedCapacity - the capacity units consumed by an operation
 * @property {string} TableName
 * @property {number} CapacityUnits
 * @property {CapacityUnitsMap} Table
 * @property {Object.<string, CapacityUnitsMap>} LocalSecondaryIndexes
 * @property {Object.<string, CapacityUnitsMap>} GlobalSecondaryIndexes
 */

/**
 * @typedef {Object} CapacityUnitsMap
 * @property {number} CapacityUnits
 */

// ---------------------------------------------------------------------------------------------------------------------
// End of copy from `aws-core-utils/type-defs`
// ---------------------------------------------------------------------------------------------------------------------
