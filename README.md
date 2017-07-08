# aws-core-test-utils v2.0.9
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

### 2.0.9
- Moved test devDependencies to package.json & removed test/package.json
- Added `promises-extract` module with copy of `delay` function from `core-functions/promises` as at 2.0.16
- Removed `core-functions` dependency

### 2.0.8
- Added more unit tests for generate mock results case that generates simple item results

### 2.0.7
- Upgraded `uuid` test dependency to version 3.1.0

### 2.0.6
- Updated `core-functions` dependency to version 3.0.6
- Changes to `type-defs` module:
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
  
### 2.0.5
- Updated `core-functions` dependency to version 3.0.5

### 2.0.4
- Added support for also configuring a mock DynamoDB.DocumentClient with either an array of mock responses or a custom 
  generate mock response function instead of always just returning a single mock response

### 2.0.3
- Added simulation of DynamoDB.DocumentClient `update` method

### 2.0.2
- Added logic to avoid TypeErrors caused by attempts to access properties of undefined mock responses

### 2.0.1
- Fixed node version in `package.json`

### 2.0.0
- Initial commit to use with `core-functions` version 3.x

### 1.0.0
- Initial commit to use with `core-functions` version 2.x