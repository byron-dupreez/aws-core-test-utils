'use strict';

const test = require('tape');

// Test subject
const dynamoDBMocking = require('../dynamodb-mocking');
const mockDynamoDBDocClient = dynamoDBMocking.mockDynamoDBDocClient;

// =====================================================================================================================
// Simulate `put`
// =====================================================================================================================

test('mockDynamoDBDocClient simulate successful `put` with no validate', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}, Item: {a: 1, b: 2}};

  const putResult = {ha: 'Ha'};

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    put: {result: putResult, validateParams: undefined}
  });

  // Test `put` simulation
  dynamoDBDocClient.put(params).promise().then(
    res => {
      t.equal(res, putResult, `put result must be putResult`);

      t.end();
    },
    err => {
      t.end(`put should NOT have failed with error (${err})`);
    }
  );
});

test('mockDynamoDBDocClient simulate successful `put`', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}, Item: {a: 1, b: 2}};

  function validatePutParams(t, putParams) {
    t.equal(putParams, params, `putParams must be params`);
  }

  const putResult = {hee: 'Hee'};

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    put: {result: putResult, validateParams: validatePutParams}
  });

  // Test `put` simulation
  dynamoDBDocClient.put(params).promise().then(
    res => {
      t.equal(res, putResult, `put result must be putResult`);

      t.end();
    },
    err => {
      t.end(`put should NOT have failed with error (${err})`);
    }
  );
});

test('mockDynamoDBDocClient simulate failing `put`', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}, Item: {a: 1, b: 2}};

  function validatePutParams(t, putParams) {
    t.equal(putParams, params, `putParams must be params`);
  }

  const putError = new Error('Boom ba-da boom');

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    put: {error: putError, validateParams: validatePutParams}
  });

  // Test `put` simulation
  dynamoDBDocClient.put(params).promise().then(
    res => {
      t.end(`put should NOT have passed with result (${JSON.stringify(res)})`);
    },
    err => {
      t.equal(err, putError, `put error must be putError`);
      t.end();
    }
  );
});


// =====================================================================================================================
// Simulate `update`
// =====================================================================================================================

test('mockDynamoDBDocClient simulate successful `update` with no validate', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}, Item: {a: 1, b: 2}};

  const updateResult = {ha: 'Ha'};

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    update: {result: updateResult}
  });

  // Test `update` simulation
  dynamoDBDocClient.update(params).promise().then(
    res => {
      t.equal(res, updateResult, `update result must be updateResult`);
      t.end();
    },
    err => {
      t.end(`update should NOT have failed with error (${err})`);
    }
  );
});

test('mockDynamoDBDocClient simulate successful `update`', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}, Item: {a: 1, b: 2}};

  function validateUpdateParams(t, updateParams) {
    t.equal(updateParams, params, `updateParams must be params`);
  }

  const updateResult = {hee: 'Hee'};

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    update: {result: updateResult, validateParams: validateUpdateParams}
  });

  // Test `update` simulation
  dynamoDBDocClient.update(params).promise().then(
    res => {
      t.equal(res, updateResult, `update result must be updateResult`);
      t.end();
    },
    err => {
      t.end(`update should NOT have failed with error (${err})`);
    }
  );
});

test('mockDynamoDBDocClient simulate failing `update`', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}, Item: {a: 1, b: 2}};

  function validateUpdateParams(t, updateParams) {
    t.equal(updateParams, params, `updateParams must be params`);
  }

  const updateError = new Error('Boom ba-da boom');

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    update: {error: updateError, validateParams: validateUpdateParams}
  });

  // Test `update` simulation
  dynamoDBDocClient.update(params).promise().then(
    res => {
      t.end(`update should NOT have passed with result (${JSON.stringify(res)})`);
    },
    err => {
      t.equal(err, updateError, `update error must be updateError`);
      t.end();
    }
  );
});

// =====================================================================================================================
// Simulate `get`
// =====================================================================================================================

test('mockDynamoDBDocClient simulate successful `get` with no validate', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}, Item: {a: 1, b: 2}};

  const getResult = {Item: {ha: 'Ha'}};

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    get: {result: getResult, validateParams: undefined}
  });

  // Test `get` simulation
  dynamoDBDocClient.get(params).promise().then(
    res => {
      t.equal(res, getResult, `get result must be getResult`);

      t.end();
    },
    err => {
      t.end(`get should NOT have failed with error (${err})`);
    }
  );
});
test('mockDynamoDBDocClient simulate successful `get`', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}, Item: {a: 1, b: 2}};

  function validateGetParams(t, getParams) {
    t.equal(getParams, params, `getParams must be params`);
  }

  const getResult = {Item: {hee: 'Hee'}};

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    get: {result: getResult, validateParams: validateGetParams}
  });

  // Test `get` simulation
  dynamoDBDocClient.get(params).promise().then(
    res => {
      t.equal(res, getResult, `get result must be getResult`);

      t.end();
    },
    err => {
      t.end(`get should NOT have failed with error (${err})`);
    }
  );
});

test('mockDynamoDBDocClient simulate failing `get`', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}, Item: {a: 1, b: 2}};

  function validateGetParams(t, getParams) {
    t.equal(getParams, params, `getParams must be params`);
  }

  const getError = new Error('Boom ba-da boom');

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    get: {error: getError, validateParams: validateGetParams}
  });

  // Test `get` simulation
  dynamoDBDocClient.get(params).promise().then(
    res => {
      t.end(`get should NOT have passed with result (${JSON.stringify(res)})`);
    },
    err => {
      t.equal(err, getError, `get error must be getError`);
      t.end();
    }
  );
});

// =====================================================================================================================
// Simulate `query`
// =====================================================================================================================

test('mockDynamoDBDocClient simulate successful `query`', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}, Item: {a: 1, b: 2}};

  const queryResult = {Items: [{bla: 'bla'}, {bleat: 'Bleat'}], Count: 2, ScannedCount: 2};

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    query: {result: queryResult, validateParams: undefined}
  });

  // Test `query` simulation
  dynamoDBDocClient.query(params).promise().then(
    res => {
      t.equal(res, queryResult, `query result must be queryResult`);

      t.end();
    },
    err => {
      t.end(`query should NOT have failed with error (${err})`);
    }
  );
});

test('mockDynamoDBDocClient simulate successful `query`', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}, Item: {a: 1, b: 2}};

  function validateQueryParams(t, queryParams) {
    t.equal(queryParams, params, `queryParams must be params`);
  }

  const queryResult = {Items: [{ha: 'Ha'}, {hee: 'Hee'}], Count: 2, ScannedCount: 2};

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    query: {result: queryResult, validateParams: validateQueryParams}
  });

  // Test `query` simulation
  dynamoDBDocClient.query(params).promise().then(
    res => {
      t.equal(res, queryResult, `query result must be queryResult`);

      t.end();
    },
    err => {
      t.end(`query should NOT have failed with error (${err})`);
    }
  );
});

test('mockDynamoDBDocClient simulate failing `query`', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}, Item: {a: 1, b: 2}};

  function validateQueryParams(t, queryParams) {
    t.equal(queryParams, params, `queryParams must be params`);
  }

  const queryError = new Error('Boom ba-da boom');

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    query: {error: queryError, validateParams: validateQueryParams}
  });

  // Test `query` simulation
  dynamoDBDocClient.query(params).promise().then(
    res => {
      t.end(`query should NOT have passed with result (${JSON.stringify(res)})`);
    },
    err => {
      t.equal(err, queryError, `query error must be queryError`);
      t.end();
    }
  );
});