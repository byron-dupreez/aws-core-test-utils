# aws-core-test-utils v1.0.9
Utilities to assist with the unit testing of code using AWS

Modules:
- dynamodb-mocking.js - Utilities for generating mock DynamoDB.DocumentClient instances for testing
- samples.js - Utilities for generating samples of various AWS artifacts for testing

This module is exported as a [Node.js](https://nodejs.org/) module.

## Installation

Using npm:
```bash
$ npm i aws-core-test-utils --save-dev
```

## Changes

### 1.0.9
- Backport of changes from 2.0.11

### 1.0.8
- Backport from 2.0.10: Added `kms-mocking` & `kms-utils` modules

### 1.0.7
- Moved test devDependencies to package.json & removed test/package.json
- Added `promises-extract` module with copy of `delay` function from `core-functions/promises` as at 2.0.16
- Removed `core-functions` dependency

### 1.0.6
- Upgraded `core-functions` dependency to 2.0.15

### 1.0.5
- Upgraded `uuid` test dependency to 3.1.0 in `test/package.json`
- Removed `uuid` & `tape` dev dependencies from `package.json` to sync with version `2.0.6` changes

### 1.0.4
- Backport: Changes to `type-defs` module:
  - Added more properties to `TestObject`
  - Renamed `ValidateParams` type definition to `ValidateArgs` and changed it to accept variadic arguments
  - Renamed `MockResponse` type definition to `DynamoMockResponse` with new item `I` & key `K` templates
   - Changed its `result` property's type to `AnyDynamoResult`
   - Renamed its `validateParams` property to `validateArgs` & changed the property's type to `ValidateArgs`
  - Renamed `GenerateMockResponse` type definition to `GenerateDynamoMockResponse`
  - Added new `DynamoMockResponseSource` type definition
  - Added new `Params` type definition
  - Added new `AnyDynamoResult` type definition with item `I` & key `K` templates
  - Added new `AwsRequest` type definition with result `R` template
  - Renamed `DynamoDBDocClientMock` type definition to `DynamoDBDocClient` with new item `I` & key `K` templates
  - Improved definitions of `get`, `put`, `query` & `update` properties of `DynamoDBDocClient` type definition
  - Added new `batchGet`, `batchWrite`, `createSet`, `delete` & `scan` properties to `DynamoDBDocClient` type definition
  - Replaced all of the type definitions copied from the `module:aws-core-utils#type-defs` with their latest definitions

### 1.0.3
- Backport: Added support for also configuring a mock DynamoDB.DocumentClient with either an array of mock responses or 
  a custom generate mock response function instead of always just returning a single mock response

### 1.0.2
- Backport: Added simulation of DynamoDB.DocumentClient `update` method

### 1.0.1
- Backport: Added logic to avoid TypeErrors caused by attempts to access properties of undefined mock responses

### 1.0.0
- Initial commit to use with `core-functions` version 2.x