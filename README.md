# aws-core-test-utils v1.0.3
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

### 1.0.3
- Backport: Added support for also configuring a mock DynamoDB.DocumentClient with either an array of mock responses or 
  a custom generate mock response function instead of always just returning a single mock response

### 1.0.2
- Backport: Added simulation of DynamoDB.DocumentClient `update` method

### 1.0.1
- Backport: Added logic to avoid TypeErrors caused by attempts to access properties of undefined mock responses

### 1.0.0
- Initial commit to use with `core-functions` version 2.x