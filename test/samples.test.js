'use strict';

const test = require('tape');

const samples = require('../samples');

test('', t => {
  const shardId1 = 'shardId-111111111111';
  const seqNo1 = '49545115243490985018280067714973144582180062593244200961';
  const eventSourceARN = samples.sampleKinesisEventSourceArn('eu-west-1', 'TestStream');

  const [msg1, record1] = samples.sampleKinesisMessageAndRecord(shardId1, seqNo1, eventSourceARN, 'ID1', '1001', 'ABC',
    10, 1, 100, '10000000000000000000001', '2017-01-17T23:59:59.001Z');

  t.ok(msg1, `msg1 must exist`);
  t.ok(record1, `record1 must exist`);

  t.end();
});