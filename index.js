'use strict';

var cheerio = require('cheerio');
var request = require('request');

var URL = 'http://www.fenxs.com/';
var REGEXPS = [
  /([0-9a-z_-]+:[1-9])[^0-9]+([0-9]+)/,
  /(?:分享社)?迅雷(?:vip)?(?:账号共享|账号|共享|会员账号|会员)(.+)密码(.+)/
];

module.exports = function thunderVip(cb) {
  request(URL, function (err, res, body) {
    if (err) return cb(err);
    var $ = cheerio.load(body);
    var url = $('.content>article.excerpt').first().find('a').first().attr('href');
    request(url, function (err, res, body) {
      if (err) return cb(err);
      $ = cheerio.load(body);
      var accounts = [];
      $('article.article-content p').each(function () {
        var text = $(this).text().trim();
        if (match(text)) {
          accounts = accounts.concat(text.split('\n').map(format).filter(function (item) {
            return !!item;
          }));
        }
      });
      cb(null, accounts);
    });
  });
};

module.exports.REGEXPS = REGEXPS;

function match(text) {
  var result;
  for (var i = 0; i < REGEXPS.length; ++i) {
    result = text.match(REGEXPS[i]);
    if (result) return result;
  }
}

function format(str) {
  var obj = {};
  var _match = match(str);
  if (!_match) {
    return null;
  }

  obj.user = _match[1].trim();
  obj.password = _match[2].trim();
  return obj;
}