## Changes

### 3.0.4
- Synchronized `samples.js` with version from `aws-core-utils` module

### 3.0.3
- Added dummy first exports (`exports._ = '_'; //IDE workaround`) to most modules as a temporary workaround for IDE issue

### 3.0.2
- Changed all modules' exports to modifications of the default `exports` object instead of replacing the default `module.exports` object

### 3.0.1
- Synchronized `samples.js` with versions from other modules

### 3.0.0
- Added `sampleKinesisMessageAndRecord` & `sampleDynamoDBMessageAndRecord` functions
- Removed `sampleKinesisMessage` function, which is no longer usable after removal of setting of `consumerState` 
  properties on messages

### 2.0.11
- Changes to `kms-mocking` module:
  - Changed mocked AWS.KMS `encrypt` & `decrypt` methods to also simulate the AWS.Request `send(callback)` & `promise()` 
    styles in addition to the existing immediate callback style
- Changes to `dynamodb-mocking` module:
  - Changed mocked DynamoDB.DocumentClient methods to also simulate the AWS.Request `send(callback)` & the immediate 
    callback styles in addition to the existing AWS.Request `promise()` style
- Removed `kms-utils` module, which should ONLY be in `aws-core-utils`

### 2.0.10
- Added new `kms-mocking` & `kms-utils` modules

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