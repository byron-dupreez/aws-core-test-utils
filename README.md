# aws-core-test-utils v2.0.4
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