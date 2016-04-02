'use strict';

var assert = require('assert');
var REGEXPS = require('./').REGEXPS;

assert.deepEqual(match('分享社迅雷会员账号271167358:2密码3399913').slice(1, 3), [
  '271167358:2',
  '3399913',
]);
assert.deepEqual(match('分享社迅雷vip账号271167358:2密码3399913').slice(1, 3), [
  '271167358:2',
  '3399913',
]);
assert.deepEqual(match('迅雷会员账号271167358:2分享社密码3399913').slice(1, 3), [
  '271167358:2',
  '3399913',
]);
assert.deepEqual(match('分享社迅雷会员账号h425_79:1密码5597513').slice(1, 3), [
  'h425_79:1',
  '5597513',
]);
assert.deepEqual(match('分享社迅雷会员账号zbr-czb:4密码5793171').slice(1, 3), [
  'zbr-czb:4',
  '5793171',
]);


assert.deepEqual(match('分享社迅雷共享13993187637密码fenxs.com').slice(1, 3), [
  '13993187637',
  'fenxs.com',
]);
assert.deepEqual(match('分享社迅雷账号xxxapple@163.com密码fenxs.com').slice(1, 3), [
  'xxxapple@163.com',
  'fenxs.com',
]);
assert.deepEqual(match('分享社迅雷vip账号15209295312密码fenxs.com').slice(1, 3), [
  '15209295312',
  'fenxs.com',
]);
assert.deepEqual(match('分享社迅雷会员15209295312密码fenxs.com').slice(1, 3), [
  '15209295312',
  'fenxs.com',
]);
assert.deepEqual(match('迅雷账号15209295312密码19850404x').slice(1, 3), [
  '15209295312',
  '19850404x',
]);
assert.deepEqual(match('分享社迅雷会员账号pangxie19891110密码lll444555').slice(1, 3), [
  'pangxie19891110',
  'lll444555',
]);
function match(text) {
  var result;
  for (var i = 0; i < REGEXPS.length; ++i) {
    result = text.match(REGEXPS[i]);
    if (result) return result;
  }
}