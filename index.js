'use strict';

var cheerio = require('cheerio');
var request = require('request');

var URL = 'http://www.fenxs.com/';
var REGEXPS = [
  /([0-9a-z_-]+:[1-9]|[1-9]+)[^0-9]+([0-9]+)/,
  /([0-9]{11})[^0-9a-z_-]+(.+)/
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
          accounts = accounts.concat(text.split('\n').map(format));
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
  var match = match(str);
  obj.user = match[1].trim();
  obj.password = match[2].trim();
  return obj;
}