'use strict';

var assert = require('assert');
var REGEXP = require('./').REGEXP;

assert.deepEqual('分享社迅雷会员账号271167358:2密码3399913'.match(REGEXP).slice(1, 3), [
  '271167358:2',
  '3399913',
]);
assert.deepEqual('分享社迅雷vip账号271167358:2密码3399913'.match(REGEXP).slice(1, 3), [
  '271167358:2',
  '3399913',
]);
assert.deepEqual('迅雷会员账号271167358:2分享社密码3399913'.match(REGEXP).slice(1, 3), [
  '271167358:2',
  '3399913',
]);