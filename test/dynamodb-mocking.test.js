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
  const params = {TableName: 'TestTable', Key: {id: 123}};

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
  const params = {TableName: 'TestTable', Key: {id: 123}};

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
  const params = {TableName: 'TestTable', Key: {id: 123}};

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
  const params = {TableName: 'TestTable', Key: {id: 123}};

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
  const params = {TableName: 'TestTable', Key: {id: 123}};

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
  const params = {TableName: 'TestTable', Key: {id: 123}};

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

// =====================================================================================================================
// Simulate `query` with an array of mock responses
// =====================================================================================================================

test('mockDynamoDBDocClient with an array of mock responses simulates a sequence of different successful `query` results', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}};

  function validateQueryParams(t, queryParams) {
    t.equal(queryParams, params, `queryParams must be params`);
  }

  const queryResults = [
    {Items: [{a: 1, index: 0}, {x: 24}], Count: 2, ScannedCount: 2},
    {Items: [{b: 2, index: 1}, {y: 25}], Count: 2, ScannedCount: 2},
    {Items: [{c: 3, index: 2}, {z: 26}], Count: 2, ScannedCount: 2}
  ];
  const queryResponses = queryResults.map(queryResult => {
    return {result: queryResult, validateParams: validateQueryParams};
  });

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    query: queryResponses
  });

  // Test 1st `query` gets 1st result
  dynamoDBDocClient.query(params).promise()
    .then(res => {
      t.equal(res, queryResults[0], `query result must be queryResults[0]`);

      // Test 2nd `query` gets 2nd result
      dynamoDBDocClient.query(params).promise()
        .then(res => {
          t.equal(res, queryResults[1], `query result must be queryResults[1]`);

          // Test 3rd `query` gets 3rd result
          dynamoDBDocClient.query(params).promise()
            .then(res => {
              t.equal(res, queryResults[2], `query result must be queryResults[2]`);

              // Test 4th `query` gets an empty items result
              dynamoDBDocClient.query(params).promise()
                .then(res => {
                  t.deepEqual(res, {
                    Items: [],
                    Count: 0,
                    ScannedCount: 0
                  }, `query result must be an empty items result`);

                  t.end();
                });
            });
        });
    })
    .catch(err => {
      t.end(`query should NOT have failed with error (${err})`);
    });
});

// =====================================================================================================================
// Simulate `query` with a generate mock response function
// =====================================================================================================================

test('mockDynamoDBDocClient with a generate mock response function simulates a sequence of different successful `query` results', t => {
  const params = [
    {TableName: 'TestTable1', Key: {id: 123}},
    {TableName: 'TestTable2', Key: {id: 456}},
    {TableName: 'TestTable3', Key: {id: 789}},
    {TableName: 'TestTable4', Key: {id: 999}}
  ];

  function validateQueryParams(t, queryParams) {
    t.ok(params.indexOf(queryParams) !== -1, `params must contain queryParams`);
  }

  function generateMockResponse(params) {
    const item1 = {a: params.Key.id, b: params.Key.id + 1};
    const item2 = {a: params.Key.id * 10, b: params.Key.id * 10 + 1};
    return {result: {Items: [item1, item2], Count: 2, ScannedCount: 2}, validateParams: validateQueryParams};
  }

  const queryResults = [
    {Items: [{a: 123, b: 124}, {a: 1230, b: 1231}], Count: 2, ScannedCount: 2},
    {Items: [{a: 456, b: 457}, {a: 4560, b: 4561}], Count: 2, ScannedCount: 2},
    {Items: [{a: 789, b: 790}, {a: 7890, b: 7891}], Count: 2, ScannedCount: 2},
    {Items: [{a: 999, b: 1000}, {a: 9990, b: 9991}], Count: 2, ScannedCount: 2}
  ];

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    query: generateMockResponse
  });

  // Test 1st `query` gets 1st result
  dynamoDBDocClient.query(params[0]).promise()
    .then(res => {
      t.deepEqual(res, queryResults[0], `query result must be queryResults[0]`);

      // Test 2nd `query` gets 2nd result
      dynamoDBDocClient.query(params[1]).promise()
        .then(res => {
          t.deepEqual(res, queryResults[1], `query result must be queryResults[1]`);

          // Test 3rd `query` gets 3rd result
          dynamoDBDocClient.query(params[2]).promise()
            .then(res => {
              t.deepEqual(res, queryResults[2], `query result must be queryResults[2]`);

              // Test 4th `query` gets an empty items result
              dynamoDBDocClient.query(params[3]).promise()
                .then(res => {
                  t.deepEqual(res, queryResults[3], `query result must be queryResults[3]`);

                  t.end();
                });
            });
        });
    })
    .catch(err => {
      t.end(`query should NOT have failed with error (${err})`);
    });
});

// =====================================================================================================================
// Simulate `get` with an array of mock responses
// =====================================================================================================================

test('mockDynamoDBDocClient with an array of mock responses simulates a sequence of different successful `get` results', t => {
  const params = {TableName: 'TestTable', Key: {id: 123}};

  function validateQueryParams(t, getParams) {
    t.equal(getParams, params, `getParams must be params`);
  }

  const getResults = [
    {Item: {a: 1, index: 0}},
    {Item: {b: 2, index: 1}},
    {Item: {c: 3, index: 2}}
  ];
  const getResponses = getResults.map(getResult => {
    return {result: getResult, validateParams: validateQueryParams};
  });

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    get: getResponses
  });

  // Test 1st `get` gets 1st result
  dynamoDBDocClient.get(params).promise()
    .then(res => {
      t.equal(res, getResults[0], `get result must be getResults[0]`);

      // Test 2nd `get` gets 2nd result
      dynamoDBDocClient.get(params).promise()
        .then(res => {
          t.equal(res, getResults[1], `get result must be getResults[1]`);

          // Test 3rd `get` gets 3rd result
          dynamoDBDocClient.get(params).promise()
            .then(res => {
              t.equal(res, getResults[2], `get result must be getResults[2]`);

              // Test 4th `get` gets an empty items result
              dynamoDBDocClient.get(params).promise()
                .then(res => {
                  t.deepEqual(res, {Item: undefined}, `get result must be an undefined item result`);

                  t.end();
                });
            });
        });
    })
    .catch(err => {
      t.end(`get should NOT have failed with error (${err})`);
    });
});

// =====================================================================================================================
// Simulate `get` with a generate mock response function
// =====================================================================================================================

test('mockDynamoDBDocClient with a generate mock response function simulates a sequence of different successful `get` results', t => {
  const params = [
    {TableName: 'TestTable1', Key: {id: 123}},
    {TableName: 'TestTable2', Key: {id: 456}},
    {TableName: 'TestTable3', Key: {id: 789}},
    {TableName: 'TestTable4', Key: {id: 999}}
  ];

  function validateQueryParams(t, getParams) {
    t.ok(params.indexOf(getParams) !== -1, `params must contain getParams`);
  }

  function generateMockResponse(params) {
    const item = {a: params.Key.id, b: params.Key.id + 1};
    return {result: {Item: item}, validateParams: validateQueryParams};
  }

  const getResults = [
    {Item: {a: 123, b: 124}},
    {Item: {a: 456, b: 457}},
    {Item: {a: 789, b: 790}},
    {Item: {a: 999, b: 1000}}
  ];

  const dynamoDBDocClient = mockDynamoDBDocClient(t, 'test1', 1, {
    get: generateMockResponse
  });

  // Test 1st `get` gets 1st result
  dynamoDBDocClient.get(params[0]).promise()
    .then(res => {
      t.deepEqual(res, getResults[0], `get result must be getResults[0]`);

      // Test 2nd `get` gets 2nd result
      dynamoDBDocClient.get(params[1]).promise()
        .then(res => {
          t.deepEqual(res, getResults[1], `get result must be getResults[1]`);

          // Test 3rd `get` gets 3rd result
          dynamoDBDocClient.get(params[2]).promise()
            .then(res => {
              t.deepEqual(res, getResults[2], `get result must be getResults[2]`);

              // Test 4th `get` gets an empty items result
              dynamoDBDocClient.get(params[3]).promise()
                .then(res => {
                  t.deepEqual(res, getResults[3], `get result must be getResults[3]`);

                  t.end();
                });
            });
        });
    })
    .catch(err => {
      t.end(`get should NOT have failed with error (${err})`);
    });
});